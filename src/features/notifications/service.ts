import "server-only";

import { prisma } from "@/lib/db";
import { normalizeIndianMobile, parseJsonArray, parseJsonRecord, validateTemplateVariables } from "./utils";
import { sendTemplateMessage } from "./twilio";

export type VolunteerRecipient = {
  id: number;
  name: string;
  mobile: string;
};

export async function getEnabledTemplates(language?: string) {
  return prisma.notificationTemplate.findMany({
    where: {
      enabled: true,
      ...(language ? { language } : {}),
    },
    orderBy: [{ language: "asc" }, { displayName: "asc" }],
  });
}

export async function createVolunteerCampaign(input: {
  templateId: number;
  language: string;
  selectedVolunteerIds: number[];
  rawValues: Record<string, unknown>;
}) {
  const template = await prisma.notificationTemplate.findUnique({ where: { id: input.templateId } });
  if (!template || !template.enabled) throw new Error("Template not found");
  if (template.language !== input.language) throw new Error("Template language mismatch");

  const selectedVolunteerIds = Array.from(new Set(input.selectedVolunteerIds)).sort((a, b) => a - b);
  if (selectedVolunteerIds.length === 0) throw new Error("Select at least one volunteer");

  const variableKeys = parseJsonArray(template.variables);
  const validated = validateTemplateVariables(variableKeys, input.rawValues);
  if (!validated.ok) throw new Error(validated.error);

  const volunteers = await prisma.volunteerSubmission.findMany({
    where: { id: { in: selectedVolunteerIds } },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, mobile: true },
  });

  if (volunteers.length !== selectedVolunteerIds.length) {
    throw new Error("Some selected volunteers could not be found");
  }

  const campaign = await prisma.notificationCampaign.create({
    data: {
      language: input.language,
      templateId: template.id,
      status: "queued",
      variableValues: JSON.stringify(validated.data.values),
      selectedVolunteerIds: JSON.stringify(selectedVolunteerIds),
      totalSelected: selectedVolunteerIds.length,
      pendingCount: selectedVolunteerIds.length,
      deliveries: {
        create: volunteers.map((volunteer) => ({
          volunteerSubmissionId: volunteer.id,
          recipientName: volunteer.name,
          recipientMobile: volunteer.mobile,
          status: "queued",
        })),
      },
    },
  });

  return processCampaign(campaign.id);
}

export async function processCampaign(campaignId: number) {
  const campaign = await prisma.notificationCampaign.findUnique({
    where: { id: campaignId },
    include: { template: true, deliveries: true },
  });
  if (!campaign) throw new Error("Campaign not found");

  const variableKeys = parseJsonArray(campaign.template.variables);
  const variableValues = parseJsonRecord(campaign.variableValues);
  const validated = validateTemplateVariables(variableKeys, variableValues);
  if (!validated.ok) throw new Error(validated.error);

  await prisma.notificationCampaign.update({
    where: { id: campaign.id },
    data: { status: "sending" },
  });

  const queuedDeliveries = campaign.deliveries.filter((delivery) => delivery.status === "queued");

  for (const delivery of queuedDeliveries) {
    const normalized = normalizeIndianMobile(delivery.recipientMobile);
    if (!normalized) {
      await prisma.notificationDelivery.update({
        where: { id: delivery.id },
        data: {
          normalizedMobile: null,
          status: "failed",
          errorCode: "INVALID_MOBILE",
          errorMessage: "Volunteer mobile number is invalid",
        },
      });
      continue;
    }

    try {
      const result = await sendTemplateMessage({
        to: normalized,
        contentSid: campaign.template.providerContentSid,
        contentVariables: validated.data.orderedValues,
      });

      if (!result.ok) {
        await prisma.notificationDelivery.update({
          where: { id: delivery.id },
          data: {
            normalizedMobile: normalized,
            status: "failed",
            errorCode: result.code,
            errorMessage: result.message,
          },
        });
        continue;
      }

      await prisma.notificationDelivery.update({
        where: { id: delivery.id },
        data: {
          normalizedMobile: normalized,
          status: "sent",
          providerMessageSid: result.messageSid,
          errorCode: null,
          errorMessage: null,
        },
      });
    } catch (error) {
      await prisma.notificationDelivery.update({
        where: { id: delivery.id },
        data: {
          normalizedMobile: normalized,
          status: "failed",
          errorCode: "SEND_ERROR",
          errorMessage: error instanceof Error ? error.message : "Unknown send error",
        },
      });
    }
  }

  const deliveries = await prisma.notificationDelivery.findMany({
    where: { campaignId: campaign.id },
  });
  const sentCount = deliveries.filter((delivery) => delivery.status === "sent").length;
  const failedCount = deliveries.filter((delivery) => delivery.status === "failed").length;
  const pendingCount = deliveries.filter((delivery) => delivery.status === "queued").length;
  const status = failedCount === 0 ? "sent" : sentCount === 0 ? "failed" : "partial";

  return prisma.notificationCampaign.update({
    where: { id: campaign.id },
    data: {
      sentCount,
      failedCount,
      pendingCount,
      status,
    },
    include: {
      template: true,
      deliveries: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function retryFailedCampaignDeliveries(campaignId: number) {
  const campaign = await prisma.notificationCampaign.findUnique({
    where: { id: campaignId },
    include: { deliveries: true },
  });
  if (!campaign) throw new Error("Campaign not found");

  const failedDeliveries = campaign.deliveries.filter((delivery) => delivery.status === "failed");
  if (failedDeliveries.length === 0) return campaign;

  await prisma.$transaction(
    failedDeliveries.map((delivery) =>
      prisma.notificationDelivery.update({
        where: { id: delivery.id },
        data: {
          status: "queued",
          errorCode: null,
          errorMessage: null,
          providerMessageSid: null,
          retryCount: delivery.retryCount + 1,
        },
      }),
    ),
  );

  await prisma.notificationCampaign.update({
    where: { id: campaignId },
    data: {
      status: "queued",
      pendingCount: failedDeliveries.length,
    },
  });

  return processCampaign(campaignId);
}

export async function getCampaignHistory() {
  return prisma.notificationCampaign.findMany({
    include: {
      template: true,
      deliveries: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
