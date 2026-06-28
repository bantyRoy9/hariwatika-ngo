import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SettingsEditor, { SettingRow } from "../../../_components/SettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminLabelsPage() {
  const translations = await prisma.translation.findMany({ orderBy: { key: "asc" } });
  const rows: SettingRow[] = translations.map((t) => ({ key: t.key, en: t.en, hi: t.hi, group: t.group }));

  return (
    <div>
      <PageTitle title="Labels & Text" subtitle="Every form label, placeholder, button, and message — editable in EN + HI." />
      <SettingsEditor rows={rows} kind="translation" />
    </div>
  );
}
