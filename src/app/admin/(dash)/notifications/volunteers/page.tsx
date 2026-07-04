import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import { getCampaignHistory, getEnabledTemplates } from "@/features/notifications/service";
import { parseJsonArray, parseJsonRecord } from "@/features/notifications/utils";
import NotificationsClient from "./NotificationsClient";

export const dynamic = "force-dynamic";

export default async function VolunteerNotificationsPage() {
  const [volunteers, templates, campaigns] = await Promise.all([
    prisma.volunteerSubmission.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        volunteerId: true,
        name: true,
        mobile: true,
        skills: true,
        availability: true,
        createdAt: true,
      },
    }),
    getEnabledTemplates(),
    getCampaignHistory(),
  ]);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Volunteer Notifications"
        subtitle="Select volunteers, send WhatsApp templates, and retry failed deliveries."
      />

      <NotificationsClient
        volunteers={volunteers.map((volunteer) => ({
          ...volunteer,
          skills: parseJsonArray(volunteer.skills),
          createdAtLabel: volunteer.createdAt.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }))}
        templates={templates.map((template) => ({
          id: template.id,
          key: template.key,
          displayName: template.displayName,
          language: template.language,
          variables: parseJsonArray(template.variables),
        }))}
        campaigns={campaigns.map((campaign) => ({
          id: campaign.id,
          status: campaign.status,
          language: campaign.language,
          totalSelected: campaign.totalSelected,
          sentCount: campaign.sentCount,
          failedCount: campaign.failedCount,
          pendingCount: campaign.pendingCount,
          createdAtLabel: campaign.createdAt.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          templateDisplayName: campaign.template.displayName,
          variableValues: parseJsonRecord(campaign.variableValues),
          deliveries: campaign.deliveries.map((delivery) => ({
            id: delivery.id,
            recipientName: delivery.recipientName,
            recipientMobile: delivery.recipientMobile,
            normalizedMobile: delivery.normalizedMobile,
            status: delivery.status,
            providerMessageSid: delivery.providerMessageSid,
            errorCode: delivery.errorCode,
            errorMessage: delivery.errorMessage,
            retryCount: delivery.retryCount,
          })),
        }))}
      />
    </div>
  );
}
