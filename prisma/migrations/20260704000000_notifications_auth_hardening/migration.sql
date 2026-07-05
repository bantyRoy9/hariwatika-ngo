-- CreateTable
CREATE TABLE "NotificationTemplate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'twilio_whatsapp',
    "providerContentSid" TEXT NOT NULL,
    "variables" TEXT NOT NULL DEFAULT '[]',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NotificationCampaign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "audienceType" TEXT NOT NULL DEFAULT 'volunteer_submission',
    "language" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "variableValues" TEXT NOT NULL DEFAULT '{}',
    "selectedVolunteerIds" TEXT NOT NULL DEFAULT '[]',
    "totalSelected" INTEGER NOT NULL DEFAULT 0,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "pendingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NotificationCampaign_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "NotificationTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NotificationDelivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "campaignId" INTEGER NOT NULL,
    "volunteerSubmissionId" INTEGER,
    "recipientName" TEXT NOT NULL,
    "recipientMobile" TEXT NOT NULL,
    "normalizedMobile" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'twilio_whatsapp',
    "providerMessageSid" TEXT,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NotificationDelivery_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "NotificationCampaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NotificationDelivery_volunteerSubmissionId_fkey" FOREIGN KEY ("volunteerSubmissionId") REFERENCES "VolunteerSubmission" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationTemplate_key_key" ON "NotificationTemplate"("key");

-- CreateIndex
CREATE INDEX "NotificationDelivery_campaignId_idx" ON "NotificationDelivery"("campaignId");

-- CreateIndex
CREATE INDEX "NotificationDelivery_volunteerSubmissionId_idx" ON "NotificationDelivery"("volunteerSubmissionId");

-- CreateIndex
CREATE INDEX "NotificationDelivery_status_idx" ON "NotificationDelivery"("status");

-- Seed default volunteer templates
INSERT INTO "NotificationTemplate" ("key", "displayName", "language", "provider", "providerContentSid", "variables", "enabled", "createdAt", "updatedAt")
VALUES
    ('volunteer_hi_event_invite', 'Volunteer Event Invite (Hindi)', 'hi', 'twilio_whatsapp', 'HX_HARIWATIKA_VOLUNTEER_HI', '["programName","eventDate","contactName"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('volunteer_en_event_invite', 'Volunteer Event Invite (English)', 'en', 'twilio_whatsapp', 'HX_HARIWATIKA_VOLUNTEER_EN', '["programName","eventDate","contactName"]', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
