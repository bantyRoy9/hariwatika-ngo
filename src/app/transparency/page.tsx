import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getHeader } from "@/lib/content";
import TransparencyContent, { ReportData, ExpenseData, ReportDocData } from "./TransparencyContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transparency & Reports | Hariwatika Shiv Mandir Vivah Sewa Samiti",
  description: "Annual reports, audited financials, and balance sheets of Hariwatika Shiv Mandir Vivah Sewa Samiti.",
};

export default async function TransparencyPage() {
  const [reportRows, expenseRows, docRows, header] = await Promise.all([
    prisma.financialReport.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.expenseCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.reportDocument.findMany({ orderBy: { sortOrder: "asc" } }),
    getHeader("transparency"),
  ]);

  const reports: ReportData[] = reportRows.map((r) => ({
    id: r.id,
    year: r.year,
    totalIncome: r.totalIncome,
    totalExpense: r.totalExpense,
    beneficiaries: r.beneficiaries,
    surplus: r.surplus,
  }));

  const expenseBreakdown: ExpenseData[] = expenseRows.map((e) => ({
    id: e.id,
    labelEn: e.labelEn,
    labelHi: e.labelHi,
    percent: e.percent,
    color: e.color,
  }));

  const documents: ReportDocData[] = docRows.map((d) => ({
    id: d.id,
    titleEn: d.titleEn,
    titleHi: d.titleHi,
    fileType: d.fileType,
    size: d.size,
    fileUrl: d.fileUrl,
  }));

  return <TransparencyContent reports={reports} expenseBreakdown={expenseBreakdown} documents={documents} header={header} />;
}
