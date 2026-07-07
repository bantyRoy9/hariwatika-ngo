import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/content";
import HomePageClient from "@/app/HomePageClient";
import type { HomeSettings, HomeServiceData, HomeCampaignData, HomeBlogPostData, HomeFuturePlanData } from "@/app/HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let settings: HomeSettings = {};
  let services: HomeServiceData[] = [];
  let campaigns: HomeCampaignData[] = [];
  let blogPosts: HomeBlogPostData[] = [];
  let futurePlans: HomeFuturePlanData[] = [];

  try {
    const [settingsResult, serviceRows, campaignRows, blogRows, planRows] = await Promise.all([
      getSettings(["home", "image", "contact"]),
      prisma.homeService.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.homeCampaign.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.futurePlan.findMany({ orderBy: { sortOrder: "asc" }, take: 3 }),
    ]);
    settings = settingsResult;
    services = serviceRows;
    campaigns = campaignRows;
    blogPosts = blogRows;
    futurePlans = planRows;
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return (
    <HomePageClient
      settings={settings}
      services={services}
      campaigns={campaigns}
      blogPosts={blogPosts}
      futurePlans={futurePlans}
    />
  );
}
