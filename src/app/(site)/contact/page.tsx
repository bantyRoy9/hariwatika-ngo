import { getSettings } from "@/lib/content";
import ContactContent from "./ContactContent";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  try {
    settings = await getSettings(["contact"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <ContactContent settings={settings} />;
}
