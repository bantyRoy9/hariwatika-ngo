import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "department", label: "Department", type: "text" },
  { name: "duration", label: "Duration", type: "text" },
  { name: "stipend", label: "Stipend", type: "text" },
  { name: "seats", label: "Seats", type: "text" },
  { name: "skills", label: "Skills", type: "tags" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminInternshipsPage() {
  const [rows, media] = await Promise.all([
    prisma.internshipListing.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  return (
    <div>
      <PageTitle title="Internship Listings" subtitle="Manage the /internship page. All text is bilingual (EN + HI)." />
      <CrudManager
        model="internshipListing"
        singularName="Listing"
        titleField="titleEn"
        fields={fields}
        rows={rows as unknown as Row[]}
        media={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }))}
      />
    </div>
  );
}
