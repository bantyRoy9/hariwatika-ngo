import { prisma } from "@/lib/db";
import { PageTitle } from "../../_components/ui";
import SortableTable from "../../_components/SortableTable";
import { LENITY } from "@/theme/lenity";

export const dynamic = "force-dynamic";

const COLS = [
  { key: "volunteerId",  label: "ID" },
  { key: "name",         label: "Name" },
  { key: "age",          label: "Age" },
  { key: "gender",       label: "Gender" },
  { key: "mobile",       label: "Mobile" },
  { key: "skills",       label: "Skills" },
  { key: "availability", label: "Availability" },
  { key: "createdAt",    label: "Registered" },
];

export default async function VolunteersPage() {
  const volunteers = await prisma.volunteerSubmission.findMany({ orderBy: { createdAt: "desc" } });

  const rows = volunteers.map(v => ({
    ...v,
    createdAt: new Date(v.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
  }));

  return (
    <div style={{ color: LENITY.adminInk }}>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: LENITY.adminInk }}>Volunteers</h1>
        <span className="rounded-full px-3 py-0.5 text-sm font-semibold"
          style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>
          {volunteers.length} registered
        </span>
      </div>

      <SortableTable
        model="volunteerSubmission"
        columns={COLS}
        rows={rows}
        exportName="Volunteers"
      />
    </div>
  );
}
