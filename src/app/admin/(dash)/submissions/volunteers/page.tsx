import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SubmissionTable from "../../../_components/SubmissionTable";

export const dynamic = "force-dynamic";

const columns = [
  { key: "id", label: "ID" },
  { key: "volunteerId", label: "Volunteer ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "skills", label: "Skills" },
  { key: "availability", label: "Availability" },
  { key: "motivation", label: "Motivation" },
  { key: "createdAt", label: "Submitted" },
];

export default async function VolunteerSubmissionsPage() {
  const rows = await prisma.volunteerSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle title="Volunteer Submissions" subtitle="Applications from the /volunteer form." />
      <SubmissionTable
        model="volunteerSubmission"
        columns={columns}
        rows={rows as unknown as Record<string, unknown>[]}
        exportName="volunteers"
      />
    </div>
  );
}
