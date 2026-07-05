import { getSettings } from "@/lib/content";
import HomePageClient from "./HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch all home group settings from DB.
  // Falls back gracefully — if a key is missing the client uses hardcoded defaults.
  const raw = await getSettings(["home", "image"]);

  // Convert to the simple {en, hi} map the client expects
  const settings: Record<string, { en: string; hi: string }> = {};
  for (const [key, val] of Object.entries(raw)) {
    settings[key] = { en: val.en, hi: val.hi };
  }

  return <HomePageClient settings={settings} />;
}
