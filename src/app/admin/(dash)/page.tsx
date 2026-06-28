import { prisma } from "@/lib/db";
import { LENITY, SERIF } from "@/theme/lenity";
import { PageTitle } from "../_components/ui";
import KpiCard from "../_components/KpiCard";
import MiniPieChart, { PieSlice } from "../_components/MiniPieChart";
import RecentSubmissionsTable, { RecentRow } from "../_components/RecentSubmissionsTable";
import { IndianRupee, Users, FolderOpen, MailQuestion, Inbox, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

/* Semantic palette for pie slices */
const SLICE_COLORS = ["#E84523", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#64748b"];

export default async function DashboardPage() {
  const [
    allDonations,
    allVolunteers,
    allProjects,
    contactsNew,
    internships,
    marriages,
    recentContacts,
    recentDonations,
    recentVolunteers,
    recentInternships,
    recentMarriages,
    expenseCategories,
  ] = await Promise.all([
    prisma.donationSubmission.findMany({ select: { id: true, amount: true, purpose: true, status: true, createdAt: true } }),
    prisma.volunteerSubmission.count(),
    prisma.project.findMany({ select: { id: true, status: true } }),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.internshipSubmission.count(),
    prisma.marriageRegistration.count(),
    prisma.contactSubmission.findMany({ take: 4, orderBy: { createdAt: "desc" }, select: { id: true, name: true, mobile: true, status: true, createdAt: true } }),
    prisma.donationSubmission.findMany({ take: 4, orderBy: { createdAt: "desc" }, select: { id: true, name: true, mobile: true, status: true, createdAt: true } }),
    prisma.volunteerSubmission.findMany({ take: 4, orderBy: { createdAt: "desc" }, select: { id: true, name: true, mobile: true, createdAt: true } }),
    prisma.internshipSubmission.findMany({ take: 4, orderBy: { createdAt: "desc" }, select: { id: true, name: true, mobile: true, createdAt: true } }),
    prisma.marriageRegistration.findMany({ take: 4, orderBy: { createdAt: "desc" }, select: { id: true, fullName: true, contactMobile: true, createdAt: true } }),
    prisma.expenseCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  /* KPI aggregates */
  const totalDonationAmount = allDonations.reduce((sum, d) => sum + d.amount, 0);
  const pendingDonations = allDonations.filter(d => d.status === "pending").length;
  const ongoingProjects = allProjects.filter(p => p.status === "ongoing").length;

  /* 30-day trend */
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const donationsLast30 = allDonations.filter(d => new Date(d.createdAt) >= cutoff);
  const amountLast30 = donationsLast30.reduce((s, d) => s + d.amount, 0);
  const amountPrev30 = totalDonationAmount - amountLast30;
  const trend = amountPrev30 === 0 ? "neutral" : amountLast30 >= amountPrev30 ? "up" : "down";
  const trendLabel = amountPrev30 > 0
    ? `${Math.abs(Math.round((amountLast30 - amountPrev30) / amountPrev30 * 100))}% vs prev 30d`
    : "last 30d";

  /* Donation by purpose pie */
  const purposeMap: Record<string, number> = {};
  allDonations.forEach(d => { purposeMap[d.purpose] = (purposeMap[d.purpose] ?? 0) + 1; });
  const donationPieData: PieSlice[] = Object.entries(purposeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value], i) => ({ name, value, color: SLICE_COLORS[i % SLICE_COLORS.length], href: `/admin/donations?purpose=${encodeURIComponent(name)}` }));

  /* Expense category pie */
  const expensePieData: PieSlice[] = expenseCategories.slice(0, 6).map((e, i) => ({
    name: e.labelEn,
    value: e.percent,
    color: e.color || SLICE_COLORS[i % SLICE_COLORS.length],
    href: "/admin/transparency",
  }));

  /* Recent submissions — merged & sorted */
  const recent: RecentRow[] = [
    ...recentContacts.map(r => ({ id: r.id, type: "contact" as const, name: r.name, mobile: r.mobile, date: r.createdAt.toISOString(), status: r.status, href: "/admin/submissions/contacts" })),
    ...recentDonations.map(r => ({ id: r.id, type: "donation" as const, name: r.name, mobile: r.mobile, date: r.createdAt.toISOString(), status: r.status, href: "/admin/submissions/donations" })),
    ...recentVolunteers.map(r => ({ id: r.id, type: "volunteer" as const, name: r.name, mobile: r.mobile, date: r.createdAt.toISOString(), href: "/admin/submissions/volunteers" })),
    ...recentInternships.map(r => ({ id: r.id, type: "internship" as const, name: r.name, mobile: r.mobile, date: r.createdAt.toISOString(), href: "/admin/submissions/internships" })),
    ...recentMarriages.map(r => ({ id: r.id, type: "marriage" as const, name: r.fullName, mobile: r.contactMobile, date: r.createdAt.toISOString(), href: "/admin/submissions/marriages" })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return (
    <div style={{ color: LENITY.adminInk }}>
      <PageTitle title="Dashboard" subtitle="Overview of submissions, donations, and projects." />

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <KpiCard
          label="Total Donations"
          value={`₹${totalDonationAmount.toLocaleString("en-IN")}`}
          trend={trend}
          trendLabel={trendLabel}
          href="/admin/donations"
          color="green"
          icon={<IndianRupee className="w-5 h-5" />}
        />
        <KpiCard
          label="Pending Donations"
          value={pendingDonations}
          href="/admin/donations?status=pending"
          color="amber"
          icon={<IndianRupee className="w-5 h-5" />}
        />
        <KpiCard
          label="Volunteers"
          value={allVolunteers}
          href="/admin/volunteers"
          color="blue"
          icon={<Users className="w-5 h-5" />}
        />
        <KpiCard
          label="Ongoing Projects"
          value={ongoingProjects}
          href="/admin/projects"
          color="cyan"
          icon={<FolderOpen className="w-5 h-5" />}
        />
        <KpiCard
          label="New Messages"
          value={contactsNew}
          href="/admin/submissions/contacts"
          color="red"
          icon={<MailQuestion className="w-5 h-5" />}
        />
        <KpiCard
          label="Marriage Regs"
          value={marriages}
          href="/admin/submissions/marriages"
          color="orange"
          icon={<Heart className="w-5 h-5" />}
        />
      </div>

      {/* ── Pie Charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <MiniPieChart data={donationPieData} title="Donations by Purpose" />
        <MiniPieChart data={expensePieData} title="Expense Breakdown" />
      </div>

      {/* ── Recent Submissions ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold" style={{ fontFamily: SERIF, color: LENITY.adminInk }}>
            Recent Submissions
          </h2>
          <a href="/admin/submissions/all" className="text-xs font-medium hover:underline" style={{ color: "#3b82f6" }}>
            View all →
          </a>
        </div>
        <RecentSubmissionsTable rows={recent} />
      </section>
    </div>
  );
}
