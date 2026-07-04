"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { assertAdmin } from "@/lib/auth";
import { createVolunteerCampaign, retryFailedCampaignDeliveries } from "@/features/notifications/service";

const sendCampaignSchema = z.object({
  templateId: z.number().int().positive(),
  language: z.enum(["hi", "en"]),
  selectedVolunteerIds: z.array(z.number().int().positive()).min(1, "Select at least one volunteer"),
  values: z.record(z.string(), z.string()),
});

export async function sendVolunteerNotification(input: unknown) {
  await assertAdmin();
  const parsed = sendCampaignSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message ?? "Invalid notification input",
    };
  }

  try {
    const campaign = await createVolunteerCampaign({
      templateId: parsed.data.templateId,
      language: parsed.data.language,
      selectedVolunteerIds: parsed.data.selectedVolunteerIds,
      rawValues: parsed.data.values,
    });
    revalidatePath("/admin/notifications/volunteers");
    return {
      success: true as const,
      campaignId: campaign.id,
      sentCount: campaign.sentCount,
      failedCount: campaign.failedCount,
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to send campaign",
    };
  }
}

export async function retryVolunteerNotification(campaignId: number) {
  await assertAdmin();
  try {
    const campaign = await retryFailedCampaignDeliveries(campaignId);
    revalidatePath("/admin/notifications/volunteers");
    return {
      success: true as const,
      campaignId: campaign.id,
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to retry campaign",
    };
  }
}
