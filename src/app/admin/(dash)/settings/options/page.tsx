import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import CrudManager, { FieldDef, Row } from "../../../_components/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  {
    name: "group",
    label: "List",
    type: "select",
    options: [
      { value: "donation_purpose", label: "Donation Purposes" },
      { value: "contact_subject", label: "Contact Subjects" },
      { value: "volunteer_skill", label: "Volunteer Skills" },
      { value: "availability", label: "Availability" },
      { value: "blog_category", label: "Blog Categories" },
      { value: "project_category", label: "Project Categories" },
      { value: "internship_duration", label: "Internship Durations" },
      { value: "gender", label: "Gender" },
      { value: "religion", label: "Religion" },
    ],
  },
  { name: "labelEn", nameHi: "labelHi", label: "Label", type: "bilingual" },
  { name: "value", label: "Stored value", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];

export default async function AdminOptionsPage() {
  const options = await prisma.optionItem.findMany({ orderBy: [{ group: "asc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <PageTitle title="Option Lists" subtitle="Dropdown, filter, and button options used across forms and pages." />
      <CrudManager model="optionItem" singularName="Option" titleField="labelEn" fields={fields} rows={options as unknown as Row[]} media={[]} />
    </div>
  );
}
