import { getSettings } from "@/lib/content";
import ProgramsContent from "./ProgramsContent";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  let settings: Record<string, { en: string; hi: string }> = {};
  try {
    settings = await getSettings(["programs"]);
  } catch {
    // DB not ready — fall through to hardcoded defaults in the client
  }

  return <ProgramsContent settings={settings} />;
}
