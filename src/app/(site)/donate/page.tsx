import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/content";
import DonateContent, { ServiceTierData } from "./DonateContent";

export const dynamic = "force-dynamic";

export default async function DonatePage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  let tiers: ServiceTierData[] = [];
  try {
    const [donateSettings, bankSettings, contactSettings, tierRows] = await Promise.all([
      getSettings(["donate"]),
      getSettings(["bank"]),
      getSettings(["contact"]),
      prisma.serviceTier.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);
    settings = { ...donateSettings, ...bankSettings, ...contactSettings };
    tiers = tierRows;
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <DonateContent settings={settings} tiers={tiers} />;
}
