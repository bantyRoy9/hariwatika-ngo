import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/content";
import HomePageClient from "@/app/HomePageClient";
import type { HomeSettings, HomeServiceData, HomeCampaignData } from "@/app/HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let settings: HomeSettings = {};
  let services: HomeServiceData[] = [];
  let campaigns: HomeCampaignData[] = [];

  try {
    const [settingsResult, serviceRows, campaignRows] = await Promise.all([
      getSettings(["home", "image"]),
      prisma.homeService.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.homeCampaign.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);
    settings = settingsResult;
    services = serviceRows;
    campaigns = campaignRows;
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <HomePageClient settings={settings} services={services} campaigns={campaigns} />;
}
