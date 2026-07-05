import { getSettings } from "@/lib/content";
import DonateContent from "./DonateContent";

export const dynamic = "force-dynamic";

export default async function DonatePage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  try {
    settings = await getSettings(["donate"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <DonateContent settings={settings} />;
}
