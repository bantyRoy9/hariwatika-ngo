import { getSettings } from "@/lib/content";
import HomePageClient from "./HomePageClient";
import { prisma } from "@/lib/db";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch all home group settings from DB.
  // Falls back gracefully — if a key is missing the client uses hardcoded defaults.
  // const raw = await getSettings(["home", "image"]);

  // Convert to the simple {en, hi} map the client expects
  // const settings: Record<string, { en: string; hi: string }> = {};
  // for (const [key, val] of Object.entries(raw)) {
  //   settings[key] = { en: val.en, hi: val.hi };
  // }

  const [services, stats, campaigns, pillars, settings] = await Promise.all([
    prisma.homeService.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeCampaign.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homePillar.findMany({ orderBy: { sortOrder: "asc" } }),
    getSettings(["home", "image"]),
  ]);

  return (
    <HomeContent
      services={services}
      stats={stats}
      campaigns={campaigns}
      pillars={pillars}
      settings={settings}
    />
  );
}
