import { prisma } from "@/lib/db";
import { PageTitle } from "../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../_components/CrudManager";

export const dynamic = "force-dynamic";

const navFields: FieldDef[] = [
  { name: "labelEn", nameHi: "labelHi", label: "Label", type: "bilingual" },
  { name: "href", label: "Link (href)", type: "text" },
  {
    name: "location",
    label: "Location",
    type: "select",
    options: [
      { value: "navbar", label: "Navbar" },
      { value: "footer-quick", label: "Footer — Quick Links" },
      { value: "footer-legal", label: "Footer — Legal & Docs" },
    ],
  },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

const socialFields: FieldDef[] = [
  { name: "platform", label: "Platform (Facebook/Instagram/YouTube/WhatsApp)", type: "text" },
  { name: "url", label: "URL", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminNavPage() {
  const [nav, social] = await Promise.all([
    prisma.navLink.findMany({ orderBy: [{ location: "asc" }, { sortOrder: "asc" }] }),
    prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-10">
        <PageTitle title="Navigation & Footer Links" subtitle="Navbar and footer link columns. Set Location per link." />
        <CrudManager model="navLink" singularName="Link" titleField="labelEn" fields={navFields} rows={nav as unknown as Row[]} media={[]} />
      </div>
      <div className="mb-10">
        <PageTitle title="Social Links" />
        <CrudManager model="socialLink" singularName="Social Link" titleField="platform" fields={socialFields} rows={social as unknown as Row[]} media={[]} />
      </div>
    </div>
  );
}
