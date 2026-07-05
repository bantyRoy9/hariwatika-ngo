import { getSettings } from "@/lib/content";
import VolunteerContent from "./VolunteerContent";

export const dynamic = "force-dynamic";

export default async function VolunteerPage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  try {
    settings = await getSettings(["volunteer"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <VolunteerContent settings={settings} />;
}
