import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SubmissionTable from "../../../_components/SubmissionTable";

export const dynamic = "force-dynamic";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "subject", label: "Subject" },
  { key: "message", label: "Message" },
  { key: "createdAt", label: "Submitted" },
];

export default async function ContactSubmissionsPage() {
  const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle title="Contact Submissions" subtitle="Messages from the /contact form." />
      <SubmissionTable
        model="contactSubmission"
        columns={columns}
        rows={rows as unknown as Record<string, unknown>[]}
        exportName="contacts"
        statusOptions={["new", "read", "replied"]}
      />
    </div>
  );
}
