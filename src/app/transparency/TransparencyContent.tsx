"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { Download, FileText, BarChart3, TrendingUp, IndianRupee, Users } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";
import { useLang } from "@/context/LanguageContext";
import type { Header } from "../blog/BlogContent";

export type ReportData = { id: number; year: string; totalIncome: number; totalExpense: number; beneficiaries: number; surplus: number };
export type ExpenseData = { id: number; labelEn: string; labelHi: string; percent: number; color: string };
export type ReportDocData = { id: number; titleEn: string; titleHi: string; fileType: string; size: string; fileUrl: string | null };

export default function TransparencyContent({
  reports,
  expenseBreakdown,
  documents,
  header,
}: {
  reports: ReportData[];
  expenseBreakdown: ExpenseData[];
  documents: ReportDocData[];
  header: Header & { img: string | null };
}) {
  const { t } = useLang();

  return (
    <AdminEditProvider>
      <Navbar />
      <main>
        {/* Hero */}
        <PremiumHero
          title={t(header.title.en, header.title.hi)}
          subtitle={t(header.tag.en, header.tag.hi)}
          description={t(header.subtitle.en, header.subtitle.hi)}
          image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
          stats={[
            { value: "100%", label: t("Transparent", "पारदर्शी") },
            { value: "25+", label: t("Years", "वर्ष") },
            { value: "₹50L+", label: t("Managed", "प्रबंधित") },
            { value: "Audited", label: t("Reports", "रिपोर्ट") },
          ]}
          breadcrumbs={[
            { label: t("Home", "होम"), href: "/" },
            { label: t("Transparency", "पारदर्शिता") },
          ]}
          overlay="pattern"
          height="medium"
        />

        {/* Annual Reports */}
        <section className="py-20" style={{ background: LENITY.soft }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: LENITY.ink }}>
                <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
                <EditableText settingKey="transparency.reports.eyebrow" label="Reports Eyebrow" en="Annual Reports" hi="वार्षिक रिपोर्ट" />
              </span>
              <EditableText as="h2" settingKey="transparency.reports.h2" label="Reports Heading"
                en="Financial Summary" hi="वित्तीय सारांश"
                className="text-3xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}
              />
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
                        className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-2"
                        style={{ background: LENITY.accent, color: LENITY.ink }}
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
                      className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all hover:scale-105"
                      style={{ background: LENITY.accent, color: LENITY.ink }}
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
                <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: LENITY.ink }}>
                  <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
                  <EditableText settingKey="transparency.utilisation.eyebrow" label="Utilisation Eyebrow" en="Fund Utilisation" hi="फंड उपयोग" />
                </span>
                <EditableText as="h2" settingKey="transparency.utilisation.h2" label="Utilisation Heading"
                  en="How We Spend Your Donations" hi="हम आपका दान कैसे खर्च करते हैं"
                  className="text-3xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
                />
                <EditableText as="p" settingKey="transparency.utilisation.desc" label="Utilisation Description" multiline
                  en="We ensure maximum utilization of every rupee donated. Over 95% of funds go directly to community programs, with less than 5% spent on administrative costs."
                  hi="हम हर दान किए गए रुपये का अधिकतम उपयोग सुनिश्चित करते हैं। 95% से अधिक धन सीधे सामुदायिक कार्यक्रमों में जाता है।"
                  className="leading-relaxed mb-6" style={{ color: LENITY.muted }}
                />
                <div className="space-y-4">
                  {expenseBreakdown.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium" style={{ color: LENITY.ink }}>{t(item.labelEn, item.labelHi)}</span>
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
                <EditableText as="h3" settingKey="transparency.docs.h3" label="Documents Heading"
                  en="Official Documents" hi="आधिकारिक दस्तावेज़"
                  className="font-semibold text-lg mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
                />
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                      style={{ background: LENITY.soft, borderColor: LENITY.line }}
                    >
                      <div className="flex items-center gap-3">
                        <FileText
                          className="w-8 h-8 rounded-lg p-1.5"
                          style={{ color: LENITY.accent, background: LENITY.accentSoft }}
                        />
                        <div>
                          <p className="text-sm font-medium" style={{ color: LENITY.ink }}>{t(doc.titleEn, doc.titleHi)}</p>
                          <p className="text-xs" style={{ color: LENITY.muted }}>{doc.fileType} · {doc.size}</p>
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
    </AdminEditProvider>
  );
}
