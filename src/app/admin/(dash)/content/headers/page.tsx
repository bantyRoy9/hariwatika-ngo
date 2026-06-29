import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SettingsEditor, { SettingRow } from "../../../_components/SettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminHeadersPage() {
  const [settings, media] = await Promise.all([
    prisma.siteSetting.findMany({ where: { group: "header" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);
  const rows: SettingRow[] = settings.map((s) => ({ key: s.key, en: s.en, hi: s.hi, img: s.img, group: s.key.split(".")[1] ?? "header" }));

  return (
    <div>
      <PageTitle title="Page Headers" subtitle="Hero tag / title / subtitle for each inner page (bilingual)." />
      <SettingsEditor rows={rows} kind="setting" media={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }))} />
    </div>
  );
}
