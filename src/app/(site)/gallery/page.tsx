import { getSettings } from "@/lib/content";
import GalleryContent from "./GalleryContent";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  try {
    settings = await getSettings(["gallery"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <GalleryContent settings={settings} />;
}
