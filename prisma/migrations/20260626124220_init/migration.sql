-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL DEFAULT 'admin',
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DonationSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ref" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VolunteerSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "volunteerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "motivation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "InternshipSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "motivation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MarriageRegistration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "regId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "gotra" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "religion" TEXT NOT NULL DEFAULT 'Hindu',
    "education" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "income" TEXT,
    "height" TEXT,
    "complexion" TEXT,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "siblings" TEXT,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL DEFAULT 'West Champaran',
    "state" TEXT NOT NULL DEFAULT 'Bihar',
    "contactName" TEXT NOT NULL,
    "contactMobile" TEXT NOT NULL,
    "contactRelation" TEXT,
    "photo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptHi" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "img" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "iconName" TEXT NOT NULL DEFAULT 'Heart',
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "raised" INTEGER NOT NULL DEFAULT 0,
    "goal" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "beneficiaries" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "FuturePlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "phone" TEXT,
    "photo" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TimelineItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "eventEn" TEXT NOT NULL,
    "eventHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "LegalDoc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iconName" TEXT NOT NULL DEFAULT 'FileText',
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "FinancialReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "totalIncome" INTEGER NOT NULL,
    "totalExpense" INTEGER NOT NULL,
    "beneficiaries" INTEGER NOT NULL,
    "surplus" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelEn" TEXT NOT NULL,
    "labelHi" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ReportDocument" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT 'PDF',
    "size" TEXT NOT NULL DEFAULT '',
    "fileUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "InternshipListing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "stipend" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "skills" TEXT NOT NULL DEFAULT '[]',
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HomeService" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iconName" TEXT NOT NULL DEFAULT 'Heart',
    "img" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HomeStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HomeCampaign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "raised" INTEGER NOT NULL DEFAULT 0,
    "goal" INTEGER NOT NULL DEFAULT 0,
    "backers" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HomePillar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iconName" TEXT NOT NULL DEFAULT 'BookOpen',
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "NavLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelEn" TEXT NOT NULL,
    "labelHi" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "VolunteerBenefit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iconName" TEXT NOT NULL DEFAULT 'Award',
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descHi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "OptionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelHi" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "en" TEXT NOT NULL DEFAULT '',
    "hi" TEXT NOT NULL DEFAULT '',
    "img" TEXT,
    "group" TEXT NOT NULL DEFAULT 'general'
);

-- CreateTable
CREATE TABLE "Translation" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "en" TEXT NOT NULL DEFAULT '',
    "hi" TEXT NOT NULL DEFAULT '',
    "group" TEXT NOT NULL DEFAULT 'general'
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'general',
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "DonationSubmission_ref_key" ON "DonationSubmission"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerSubmission_volunteerId_key" ON "VolunteerSubmission"("volunteerId");

-- CreateIndex
CREATE UNIQUE INDEX "MarriageRegistration_regId_key" ON "MarriageRegistration"("regId");
