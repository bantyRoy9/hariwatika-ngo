import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SubmissionTable from "../../../_components/SubmissionTable";

export const dynamic = "force-dynamic";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "qualification", label: "Qualification" },
  { key: "institute", label: "Institute" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "startDate", label: "Start Date" },
  { key: "duration", label: "Duration" },
  { key: "motivation", label: "Motivation" },
  { key: "createdAt", label: "Submitted" },
];

export default async function InternshipSubmissionsPage() {
  const rows = await prisma.internshipSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle title="Internship Submissions" subtitle="Applications from the /internship form." />
      <SubmissionTable
        model="internshipSubmission"
        columns={columns}
        rows={rows as unknown as Record<string, unknown>[]}
        exportName="internships"
      />
    </div>
  );
}
