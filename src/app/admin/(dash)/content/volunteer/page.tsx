import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "iconName", label: "Icon name (Lucide)", type: "text" },
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminVolunteerPage() {
  const [rows, media] = await Promise.all([
    prisma.volunteerBenefit.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  return (
    <div>
      <PageTitle title="Volunteer Benefits" subtitle="Manage the /volunteer page. All text is bilingual (EN + HI)." />
      <CrudManager
        model="volunteerBenefit"
        singularName="Benefit"
        titleField="titleEn"
        fields={fields}
        rows={rows as unknown as Row[]}
        media={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }))}
      />
    </div>
  );
}
