import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SubmissionTable from "../../../_components/SubmissionTable";

export const dynamic = "force-dynamic";

const columns = [
  { key: "id", label: "ID" },
  { key: "ref", label: "Reference" },
  { key: "name", label: "Name" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "amount", label: "Amount" },
  { key: "purpose", label: "Purpose" },
  { key: "createdAt", label: "Submitted" },
];

export default async function DonationSubmissionsPage() {
  const rows = await prisma.donationSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle title="Donation Submissions" subtitle="Pledges from the /donate form." />
      <SubmissionTable
        model="donationSubmission"
        columns={columns}
        rows={rows as unknown as Record<string, unknown>[]}
        exportName="donations"
        statusOptions={["pending", "confirmed"]}
      />
    </div>
  );
}
