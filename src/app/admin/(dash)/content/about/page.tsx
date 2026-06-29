import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const teamFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "designation", label: "Designation", type: "text" },
  { name: "initials", label: "Initials", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "photo", label: "Photo", type: "image" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

const timelineFields: FieldDef[] = [
  { name: "year", label: "Year", type: "text" },
  { name: "eventEn", nameHi: "eventHi", label: "Event", type: "bilingual-area" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

const legalDocFields: FieldDef[] = [
  { name: "iconName", label: "Icon name (Lucide)", type: "text" },
  { name: "titleEn", nameHi: "titleHi", label: "Title", type: "bilingual" },
  { name: "number", label: "Number", type: "text" },
  { name: "descEn", nameHi: "descHi", label: "Description", type: "bilingual-area" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminAboutPage() {
  const [teamMembers, timelineItems, legalDocs, media] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.timelineItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.legalDoc.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }),
  ]);

  const mediaList = media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));

  return (
    <div>
      <div className="mb-10">
        <PageTitle title="Team Members" subtitle="Manage the team shown on the /about page." />
        <CrudManager
          model="teamMember"
          singularName="Member"
          titleField="name"
          fields={teamFields}
          rows={teamMembers as unknown as Row[]}
          media={mediaList}
        />
      </div>
      <div className="mb-10">
        <PageTitle title="Timeline" subtitle="Milestones shown on the /about page. Event text is bilingual (EN + HI)." />
        <CrudManager
          model="timelineItem"
          singularName="Milestone"
          titleField="year"
          fields={timelineFields}
          rows={timelineItems as unknown as Row[]}
          media={mediaList}
        />
      </div>
      <div className="mb-10">
        <PageTitle title="Legal Documents" subtitle="Registrations and legal docs shown on the /about page." />
        <CrudManager
          model="legalDoc"
          singularName="Document"
          titleField="titleEn"
          fields={legalDocFields}
          rows={legalDocs as unknown as Row[]}
          media={mediaList}
        />
      </div>
    </div>
  );
}
