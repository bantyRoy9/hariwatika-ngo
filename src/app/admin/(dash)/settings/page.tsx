import { prisma } from "@/lib/db";
import { PageTitle } from "../../_components/ui";
import SettingsEditor, { SettingRow } from "../../_components/SettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, media] = await Promise.all([
    prisma.siteSetting.findMany({ where: { group: { in: ["contact", "bank", "donate", "brand", "footer"] } } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);
  const rows: SettingRow[] = settings.map((s) => ({ key: s.key, en: s.en, hi: s.hi, img: s.img, group: s.group }));

  return (
    <div>
      <PageTitle title="Site Settings" subtitle="Contact info, footer copy, logo, bank & UPI details, tax-benefit text." />
      <SettingsEditor rows={rows} kind="setting" media={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }))} />
    </div>
  );
}
