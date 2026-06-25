import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, FileText, BarChart3, TrendingUp, IndianRupee, Users } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

export const metadata: Metadata = {
  title: "Transparency & Reports | Hariwatika Shiv Mandir Vivah Sewa Samiti",
  description: "Annual reports, audited financials, and balance sheets of Hariwatika Shiv Mandir Vivah Sewa Samiti.",
};

const reports = [
  { year: "2023–24", totalIncome: 850000, totalExpense: 720000, beneficiaries: 480, surplus: 130000 },
  { year: "2022–23", totalIncome: 640000, totalExpense: 580000, beneficiaries: 350, surplus: 60000 },
  { year: "2021–22", totalIncome: 520000, totalExpense: 490000, beneficiaries: 290, surplus: 30000 },
  { year: "2020–21", totalIncome: 380000, totalExpense: 360000, beneficiaries: 210, surplus: 20000 },
  { year: "2019–20", totalIncome: 310000, totalExpense: 295000, beneficiaries: 180, surplus: 15000 },
];

const expenseBreakdown = [
  { label: "Vivah Seva", percent: 45, color: LENITY.accent },
  { label: "Garib Sahayata", percent: 25, color: LENITY.accentHover },
  { label: "Vrikshaaropan", percent: 15, color: "#fb923c" },
  { label: "Swasthya Seva", percent: 10, color: "#fdba74" },
  { label: "Admin / Misc", percent: 5, color: "#fed7aa" },
];

export default function TransparencyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 relative bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] mb-4"
              style={{ color: LENITY.accent, background: LENITY.accentSoft }}
            >
              Transparency
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: SERIF, color: LENITY.ink }}
            >
              वार्षिक रिपोर्ट
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: LENITY.muted }}>
              We believe in full financial transparency. Here are our audited annual reports and financial statements.
            </p>
          </div>
        </section>

        {/* Annual Reports */}
        <section className="py-20" style={{ background: LENITY.soft }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span
                className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: LENITY.accent, background: LENITY.accentSoft }}
              >
                Annual Reports
              </span>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: SERIF, color: LENITY.ink }}
              >
                Financial Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <div
                  key={report.year}
                  className="bg-white rounded-3xl border p-6 transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ borderColor: LENITY.line }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span
                        className="inline-block text-white rounded-full px-3 py-1 text-xs font-bold mb-2"
                        style={{ background: LENITY.accent }}
                      >
                        {report.year}
                      </span>
                      <h3
                        className="font-semibold"
                        style={{ fontFamily: SERIF, color: LENITY.ink }}
                      >
                        Annual Report {report.year}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
                          <TrendingUp className="w-4 h-4" style={{ color: LENITY.accent }} />
                          ₹{report.totalIncome.toLocaleString("en-IN")}
                        </div>
                        <p className="text-[10px]" style={{ color: LENITY.muted }}>Total Income</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
                          <IndianRupee className="w-4 h-4" style={{ color: LENITY.accent }} />
                          ₹{report.totalExpense.toLocaleString("en-IN")}
                        </div>
                        <p className="text-[10px]" style={{ color: LENITY.muted }}>Total Expense</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
                          <BarChart3 className="w-4 h-4" style={{ color: LENITY.accent }} />
                          ₹{report.surplus.toLocaleString("en-IN")}
                        </div>
                        <p className="text-[10px]" style={{ color: LENITY.muted }}>Surplus</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
                          <Users className="w-4 h-4" style={{ color: LENITY.accent }} />
                          {report.beneficiaries}+
                        </div>
                        <p className="text-[10px]" style={{ color: LENITY.muted }}>Beneficiaries</p>
                      </div>
                    </div>

                    <button
                      className="flex items-center gap-1.5 text-white rounded-full px-4 py-2 text-xs font-bold transition-all hover:scale-105"
                      style={{ background: LENITY.accent }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                  </div>

                  {/* Income vs Expense bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1" style={{ color: LENITY.muted }}>
                      <span>Expense utilisation</span>
                      <span>{Math.round((report.totalExpense / report.totalIncome) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: LENITY.line }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(report.totalExpense / report.totalIncome) * 100}%`, background: LENITY.accent }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expense Breakdown */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span
                  className="inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] mb-4"
                  style={{ color: LENITY.accent, background: LENITY.accentSoft }}
                >
                  Fund Utilisation
                </span>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: SERIF, color: LENITY.ink }}
                >
                  How We Spend Your Donations
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: LENITY.muted }}>
                  We ensure maximum utilization of every rupee donated. Over 95% of funds go directly
                  to community programs, with less than 5% spent on administrative costs.
                </p>
                <div className="space-y-4">
                  {expenseBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium" style={{ color: LENITY.ink }}>{item.label}</span>
                        <span className="font-bold" style={{ color: item.color }}>
                          {item.percent}%
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: LENITY.line }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${item.percent}%`, background: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3
                  className="font-semibold text-lg mb-4"
                  style={{ fontFamily: SERIF, color: LENITY.ink }}
                >
                  Official Documents
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Balance Sheet 2023-24", type: "PDF", size: "245 KB" },
                    { title: "Income & Expenditure Statement 2023-24", type: "PDF", size: "180 KB" },
                    { title: "Audit Report 2023-24", type: "PDF", size: "320 KB" },
                    { title: "Utilisation Certificate 2023-24", type: "PDF", size: "95 KB" },
                    { title: "Annual Report 2022-23", type: "PDF", size: "1.2 MB" },
                    { title: "Annual Report 2021-22", type: "PDF", size: "980 KB" },
                  ].map((doc) => (
                    <div
                      key={doc.title}
                      className="flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                      style={{ background: LENITY.soft, borderColor: LENITY.line }}
                    >
                      <div className="flex items-center gap-3">
                        <FileText
                          className="w-8 h-8 rounded-lg p-1.5"
                          style={{ color: LENITY.accent, background: LENITY.accentSoft }}
                        />
                        <div>
                          <p className="text-sm font-medium" style={{ color: LENITY.ink }}>{doc.title}</p>
                          <p className="text-xs" style={{ color: LENITY.muted }}>{doc.type} · {doc.size}</p>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1 text-xs font-bold transition-colors"
                        style={{ color: LENITY.accent }}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
