-- AlterTable
ALTER TABLE "Project" ADD COLUMN "img" TEXT;

-- CreateTable
CREATE TABLE "ServiceTier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iconName" TEXT NOT NULL DEFAULT 'Heart',
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "eligibilityEn" TEXT NOT NULL DEFAULT '',
    "eligibilityHi" TEXT NOT NULL DEFAULT '',
    "amount" TEXT NOT NULL DEFAULT '',
    "descEn" TEXT NOT NULL DEFAULT '',
    "descHi" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);
