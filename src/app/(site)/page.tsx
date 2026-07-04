import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/content";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
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
