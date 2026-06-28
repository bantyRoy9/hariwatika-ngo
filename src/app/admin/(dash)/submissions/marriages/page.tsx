import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import SubmissionTable from "../../../_components/SubmissionTable";

export const dynamic = "force-dynamic";

const columns = [
  { key: "id", label: "ID" },
  { key: "regId", label: "Reg ID" },
  { key: "side", label: "Side" },
  { key: "fullName", label: "Full Name" },
  { key: "dob", label: "DOB" },
  { key: "gotra", label: "Gotra" },
  { key: "caste", label: "Caste" },
  { key: "religion", label: "Religion" },
  { key: "education", label: "Education" },
  { key: "occupation", label: "Occupation" },
  { key: "fatherName", label: "Father's Name" },
  { key: "motherName", label: "Mother's Name" },
  { key: "address", label: "Address" },
  { key: "district", label: "District" },
  { key: "state", label: "State" },
  { key: "contactName", label: "Contact Name" },
  { key: "contactMobile", label: "Contact Mobile" },
  { key: "createdAt", label: "Submitted" },
];

export default async function MarriageRegistrationsPage() {
  const rows = await prisma.marriageRegistration.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle title="Marriage Registrations" subtitle="Profiles from the /registration form." />
      <SubmissionTable
        model="marriageRegistration"
        columns={columns}
        rows={rows as unknown as Record<string, unknown>[]}
        exportName="marriages"
      />
    </div>
  );
}
