import Link from "next/link";
import { prisma } from "@/lib/db";
import { LENITY, SERIF } from "@/theme/lenity";
import { PageTitle } from "../_components/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [contacts, donations, volunteers, internships, marriages, posts, projects, team] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.donationSubmission.count(),
    prisma.volunteerSubmission.count(),
    prisma.internshipSubmission.count(),
    prisma.marriageRegistration.count(),
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.teamMember.count(),
  ]);

  const cards = [
    { label: "Contact Messages", value: contacts, href: "/admin/submissions/contacts" },
    { label: "Donations", value: donations, href: "/admin/submissions/donations" },
    { label: "Volunteers", value: volunteers, href: "/admin/submissions/volunteers" },
    { label: "Internship Apps", value: internships, href: "/admin/submissions/internships" },
    { label: "Marriage Regs", value: marriages, href: "/admin/submissions/marriages" },
    { label: "Blog Posts", value: posts, href: "/admin/content/blog" },
    { label: "Projects", value: projects, href: "/admin/content/projects" },
    { label: "Team Members", value: team, href: "/admin/content/about" },
  ];

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Overview of submissions and content." />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border bg-[#0d1229] p-5 transition-all hover:scale-[1.02]"
            style={{ borderColor: LENITY.line }}
          >
            <p className="text-3xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{c.value}</p>
            <p className="text-sm mt-1" style={{ color: LENITY.muted }}>{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
