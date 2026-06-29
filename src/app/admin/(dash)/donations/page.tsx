import { prisma } from "@/lib/db";
import { PageTitle } from "../../_components/ui";
import KpiCard from "../../_components/KpiCard";
import SortableTable from "../../_components/SortableTable";
import DonationTrendChart from "../../_components/DonationTrendChart";
import type { MonthlyDonation } from "../../_components/DonationTrendChart";
import { IndianRupee } from "lucide-react";
import { LENITY } from "@/theme/lenity";

export const dynamic = "force-dynamic";

const COLS = [
  { key: "ref",       label: "Ref" },
  { key: "name",      label: "Name" },
  { key: "mobile",    label: "Mobile" },
  { key: "amount",    label: "Amount (₹)" },
  { key: "purpose",   label: "Purpose" },
  { key: "address",   label: "Address" },
  { key: "createdAt", label: "Date" },
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const statusFilter  = sp.status  ?? null;
  const purposeFilter = sp.purpose ?? null;

  const where: Record<string, unknown> = {};
  if (statusFilter)  where.status  = statusFilter;
  if (purposeFilter) where.purpose = purposeFilter;

  const [donations, allDonations] = await Promise.all([
    prisma.donationSubmission.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.donationSubmission.findMany({ select: { amount: true, status: true, createdAt: true } }),
  ]);

  /* KPI aggregates (full dataset) */
  const totalAmount  = allDonations.reduce((s, d) => s + d.amount, 0);
  const confirmedCount = allDonations.filter(d => d.status === "confirmed").length;
  const pendingCount   = allDonations.filter(d => d.status === "pending").length;

  /* 6-month trend data */
  const now = new Date();
  const monthMap: Record<string, MonthlyDonation> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
    monthMap[key] = { month: key, total: 0, confirmed: 0 };
  }
  allDonations.forEach(d => {
    const dt = new Date(d.createdAt);
    const key = `${MONTH_NAMES[dt.getMonth()]} ${dt.getFullYear().toString().slice(2)}`;
    if (monthMap[key]) {
      monthMap[key].total     += d.amount;
      if (d.status === "confirmed") monthMap[key].confirmed += d.amount;
    }
  });
  const trendData = Object.values(monthMap);

  /* Rows for table */
  const rows = donations.map(d => ({
    ...d,
    amount: `₹${d.amount.toLocaleString("en-IN")}`,
    createdAt: new Date(d.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
  }));

  const activeFilters = [statusFilter && `Status: ${statusFilter}`, purposeFilter && `Purpose: ${purposeFilter}`].filter(Boolean);

  return (
    <div style={{ color: LENITY.adminInk }}>
      <PageTitle
        title="Donations Report"
        subtitle={activeFilters.length ? `Filtered by: ${activeFilters.join(", ")}` : "All donation submissions"}
      />

      {/* KPI mini-cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <KpiCard label="Total Raised" value={`₹${totalAmount.toLocaleString("en-IN")}`} href="/admin/donations" color="green" icon={<IndianRupee className="w-4 h-4" />} />
        <KpiCard label="Confirmed" value={confirmedCount} href="/admin/donations?status=confirmed" color="blue" icon={<IndianRupee className="w-4 h-4" />} />
        <KpiCard label="Pending" value={pendingCount} href="/admin/donations?status=pending" color="amber" icon={<IndianRupee className="w-4 h-4" />} />
      </div>

      {/* Trend chart */}
      <div className="mb-6">
        <DonationTrendChart data={trendData} />
      </div>

      {/* Table */}
      <SortableTable
        model="donationSubmission"
        columns={COLS}
        rows={rows}
        exportName="Donations"
        statusOptions={["pending", "confirmed"]}
        defaultSearch={purposeFilter ?? statusFilter ?? ""}
      />
    </div>
  );
}
