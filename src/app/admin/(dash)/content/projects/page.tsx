import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const projectFields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "category", label: "Category", type: "text" },
  { name: "iconName", label: "Icon name (Lucide)", type: "text" },
  { name: "img", label: "Photo", type: "image" },
  { name: "status", label: "Status", type: "text" },
  { name: "raised", label: "Raised", type: "number" },
  { name: "goal", label: "Goal", type: "number" },
  { name: "location", label: "Location", type: "text" },
  { name: "date", label: "Date", type: "text" },
  { name: "beneficiaries", label: "Beneficiaries", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

const futurePlanFields: FieldDef[] = [
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "year", label: "Year", type: "text" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminProjectsPage() {
  const [projects, futurePlans, media] = await Promise.all([
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.futurePlan.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  const mediaList = media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));

  return (
    <div>
      <div className="mb-10">
        <PageTitle title="Projects" subtitle="Manage the /projects page. All text is bilingual (EN + HI)." />
        <CrudManager
          model="project"
          singularName="Project"
          titleField="titleEn"
          fields={projectFields}
          rows={projects as unknown as Row[]}
          media={mediaList}
        />
      </div>
      <div className="mb-10">
        <PageTitle title="Future Plans" subtitle="Upcoming plans shown on the /projects page." />
        <CrudManager
          model="futurePlan"
          singularName="Plan"
          titleField="titleEn"
          fields={futurePlanFields}
          rows={futurePlans as unknown as Row[]}
          media={mediaList}
        />
      </div>
    </div>
  );
}
