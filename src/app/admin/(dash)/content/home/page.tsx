import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SettingsEditor, { SettingRow } from "../../../_components/SettingsEditor";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const serviceFields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "iconName", label: "Icon name (Lucide)", type: "text" },
  { name: "img", label: "Image", type: "image" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];
const statFields: FieldDef[] = [
  { name: "value", label: "Value (e.g. 25+)", type: "text" },
  { name: "labelEn", nameHi: "labelHi", label: "Label", type: "bilingual" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];
const campaignFields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "raised", label: "Raised", type: "number" },
  { name: "goal", label: "Goal", type: "number" },
  { name: "backers", label: "Backers", type: "number" },
  { name: "img", label: "Image", type: "image" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];
const pillarFields: FieldDef[] = [
  { name: "iconName", label: "Icon name (Lucide)", type: "text" },
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminHomePage() {
  const [settings, services, stats, campaigns, pillars, media] = await Promise.all([
    prisma.siteSetting.findMany({ where: { group: { in: ["home", "image"] } } }),
    prisma.homeService.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeCampaign.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homePillar.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  const mediaList = media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));
  const rows: SettingRow[] = settings.map((s) => ({ key: s.key, en: s.en, hi: s.hi, img: s.img, group: s.group }));

  return (
    <div>
      <PageTitle title="Home Page" subtitle="Edit hero, section text, images, and the repeatable home blocks. All bilingual." />

      <SettingsEditor rows={rows} kind="setting" media={mediaList} />

      <div className="mb-10 mt-8">
        <PageTitle title="Services (What We Do)" />
        <CrudManager model="homeService" singularName="Service" titleField="titleEn" fields={serviceFields} rows={services as unknown as Row[]} media={mediaList} />
      </div>
      <div className="mb-10">
        <PageTitle title="Stats" />
        <CrudManager model="homeStat" singularName="Stat" titleField="value" fields={statFields} rows={stats as unknown as Row[]} media={mediaList} />
      </div>
      <div className="mb-10">
        <PageTitle title="Campaigns" />
        <CrudManager model="homeCampaign" singularName="Campaign" titleField="titleEn" fields={campaignFields} rows={campaigns as unknown as Row[]} media={mediaList} />
      </div>
      <div className="mb-10">
        <PageTitle title="Pillars" />
        <CrudManager model="homePillar" singularName="Pillar" titleField="titleEn" fields={pillarFields} rows={pillars as unknown as Row[]} media={mediaList} />
      </div>
    </div>
  );
}
