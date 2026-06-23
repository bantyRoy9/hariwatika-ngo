import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, FileText, BarChart3, TrendingUp, IndianRupee, Users } from "lucide-react";

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
  { label: "Vivah Seva", percent: 45, color: "#855300" },
  { label: "Garib Sahayata", percent: 25, color: "#F4A433" },
  { label: "Vrikshaaropan", percent: 15, color: "#006d3e" },
  { label: "Swasthya Seva", percent: 10, color: "#524435" },
  { label: "Admin / Misc", percent: 5, color: "#857463" },
];

export default function TransparencyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="pt-28 pb-16 relative"
          style={{ background: "linear-gradient(135deg, #1b0d00 0%, #3d1f00 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-white/10 text-[#F4A433] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
              Transparency
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Literata', serif" }}
            >
              वार्षिक रिपोर्ट
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              We believe in full financial transparency. Here are our audited annual reports and financial statements.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 60" className="w-full" style={{ display: "block" }}>
              <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        {/* Annual Reports */}
        <section className="py-20 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                Annual Reports
              </span>
              <h2
                className="text-3xl font-bold text-[#1b1c19]"
                style={{ fontFamily: "'Literata', serif" }}
              >
                Financial Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <div
                  key={report.year}
                  className="bg-white rounded-2xl border border-[#e4e2dd] p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="inline-block bg-[#855300] text-white rounded-full px-3 py-1 text-xs font-bold mb-2">
                        {report.year}
                      </span>
                      <h3
                        className="font-semibold text-[#1b1c19]"
                        style={{ fontFamily: "'Literata', serif" }}
                      >
                        Annual Report {report.year}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold text-[#006d3e]">
                          <TrendingUp className="w-4 h-4" />
                          ₹{report.totalIncome.toLocaleString("en-IN")}
                        </div>
                        <p className="text-[10px] text-[#524435]">Total Income</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold text-[#855300]">
                          <IndianRupee className="w-4 h-4" />
                          ₹{report.totalExpense.toLocaleString("en-IN")}
                        </div>
                        <p className="text-[10px] text-[#524435]">Total Expense</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold text-[#006d3e]">
                          <BarChart3 className="w-4 h-4" />
                          ₹{report.surplus.toLocaleString("en-IN")}
                        </div>
                        <p className="text-[10px] text-[#524435]">Surplus</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm font-bold text-[#524435]">
                          <Users className="w-4 h-4" />
                          {report.beneficiaries}+
                        </div>
                        <p className="text-[10px] text-[#524435]">Beneficiaries</p>
                      </div>
                    </div>

                    <button className="flex items-center gap-1.5 bg-[#855300] text-white rounded-full px-4 py-2 text-xs font-semibold hover:bg-[#653e00] transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                  </div>

                  {/* Income vs Expense bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-[#524435] mb-1">
                      <span>Expense utilisation</span>
                      <span>{Math.round((report.totalExpense / report.totalIncome) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#855300] rounded-full"
                        style={{ width: `${(report.totalExpense / report.totalIncome) * 100}%` }}
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
                <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
                  Fund Utilisation
                </span>
                <h2
                  className="text-3xl font-bold text-[#1b1c19] mb-4"
                  style={{ fontFamily: "'Literata', serif" }}
                >
                  How We Spend Your Donations
                </h2>
                <p className="text-[#524435] leading-relaxed mb-6">
                  We ensure maximum utilization of every rupee donated. Over 95% of funds go directly
                  to community programs, with less than 5% spent on administrative costs.
                </p>
                <div className="space-y-4">
                  {expenseBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-[#1b1c19]">{item.label}</span>
                        <span className="font-bold" style={{ color: item.color }}>
                          {item.percent}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
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
                  className="font-semibold text-[#1b1c19] text-lg mb-4"
                  style={{ fontFamily: "'Literata', serif" }}
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
                      className="flex items-center justify-between p-4 bg-[#fbf9f4] rounded-xl border border-[#e4e2dd] hover:border-[#855300] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-[#855300] bg-orange-100 rounded-lg p-1.5" />
                        <div>
                          <p className="text-sm font-medium text-[#1b1c19]">{doc.title}</p>
                          <p className="text-xs text-[#524435]">{doc.type} · {doc.size}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#855300] hover:text-[#653e00] transition-colors">
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
