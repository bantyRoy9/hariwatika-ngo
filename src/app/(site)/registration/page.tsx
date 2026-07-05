import { getSettings, getHeader } from "@/lib/content";
import RegistrationContent from "./RegistrationContent";

export const dynamic = "force-dynamic";

export default async function RegistrationPage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  let header: { tag: { en: string; hi: string }; title: { en: string; hi: string }; subtitle: { en: string; hi: string }; img: string | null } | undefined;
  try {
    [settings, header] = await Promise.all([
      getSettings(["registration"]),
      getHeader("registration"),
    ]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <RegistrationContent settings={settings} header={header} />;
}
