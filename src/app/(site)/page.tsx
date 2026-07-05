import { getSettings } from "@/lib/content";
import HomePageClient from "@/app/HomePageClient";
import type { HomeSettings } from "@/app/HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let settings: HomeSettings = {};

  try {
    settings = await getSettings(["home", "image"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <HomePageClient settings={settings} />;
}
