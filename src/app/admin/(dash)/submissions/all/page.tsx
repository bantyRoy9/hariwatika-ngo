import { prisma } from "@/lib/db";
import { PageTitle } from "../../../_components/ui";
import AllSubmissionsTabs from "./AllSubmissionsTabs";
import { LENITY } from "@/theme/lenity";

export const dynamic = "force-dynamic";

export default async function AllSubmissionsPage() {
  const [contacts, donations, volunteers, internships, marriages] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.donationSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.volunteerSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.internshipSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.marriageRegistration.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const serialize = (rows: object[]) =>
    rows.map(r => {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(r as Record<string, unknown>)) {
        out[k] = v instanceof Date ? v.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : v;
      }
      return out;
    });

  return (
    <div style={{ color: LENITY.adminInk }}>
      <PageTitle title="All Submissions" subtitle="Unified view of every form submission." />
      <AllSubmissionsTabs
        contacts={serialize(contacts)}
        donations={serialize(donations)}
        volunteers={serialize(volunteers)}
        internships={serialize(internships)}
        marriages={serialize(marriages)}
      />
    </div>
  );
}
