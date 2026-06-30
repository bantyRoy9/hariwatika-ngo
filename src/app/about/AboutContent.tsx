"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import { LENITY, SERIF, IMG } from "@/theme/lenity";
import { Target, Eye, FileText, Award, ShieldCheck, Download, Users, type LucideIcon } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import type { Header } from "../blog/BlogContent";

// Icon lookup for legalDocs (keyed by iconName string from DB). Fallback: FileText.
const ICONS: Record<string, LucideIcon> = { FileText, ShieldCheck, Award };
const iconFor = (name: string): LucideIcon => ICONS[name] ?? FileText;

export type TimelineData = { id: number; year: string; eventEn: string; eventHi: string };
export type LegalDocData = { id: number; iconName: string; titleEn: string; titleHi: string; number: string; descEn: string; descHi: string };
export type TeamMemberData = { id: number; name: string; designation: string; initials: string; phone: string | null };

const rankOrder: Record<string, number> = {
  Director: 1, Chairman: 2, "Executive President": 3, Secretary: 4,
  "General Secretary": 5, Coordinator: 6, Treasurer: 7, "Vice Treasurer": 8,
  Auditor: 9, "Legal Advisor": 10, "Media Reporter": 11, Member: 12,
};

/* PAI eyebrow: small yellow dash + uppercase ink label */
function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${center ? "justify-center" : ""}`}
      style={{ color: LENITY.ink }}
    >
      <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
      {children}
    </span>
  );
}

export default function AboutContent({
  timeline,
  legalDocs,
  members,
  header,
}: {
  timeline: TimelineData[];
  legalDocs: LegalDocData[];
  members: TeamMemberData[];
  header: Header & { img: string | null };
}) {
  const { t } = useLang();

  const sortedMembers = [...members].sort(
    (a, b) => (rankOrder[a.designation] ?? 99) - (rankOrder[b.designation] ?? 99)
  );

  return (
    <>
      <Navbar />
      <main>
        <PremiumHero
          title={t(header.title.en, header.title.hi)}
          subtitle={t(header.tag.en, header.tag.hi)}
          description={t(header.subtitle.en, header.subtitle.hi)}
          image={header.img ?? IMG.community}
          stats={[
            { value: "25+", label: t("Years of Service", "वर्षों की सेवा") },
            { value: "5000+", label: t("Families Helped", "परिवारों की मदद") },
            { value: "100+", label: t("Villages Reached", "गांव पहुंचे") },
            { value: "200+", label: t("Volunteers", "स्वयंसेवक") },
          ]}
          breadcrumbs={[
            { label: t("Home", "होम"), href: "/" },
            { label: t("About Us", "हमारे बारे में") },
          ]}
          overlay="pattern"
          height="large"
        />

        {/* ── History ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "6rem", paddingBottom: "6rem", background: LENITY.bg }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal animation="slide-right">
                <div className="mb-4">
                  <Eyebrow>Our History</Eyebrow>
                </div>
                <h2
                  className="font-bold mb-3"
                  style={{ fontFamily: SERIF, color: LENITY.ink, fontSize: "2.25rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}
                >
                  हमारी यात्रा
                </h2>
                <p className="italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem", lineHeight: 1.5 }}>
                  Twenty-five years of seva, one family at a time.
                </p>
                <p className="mb-4" style={{ color: LENITY.muted, fontSize: "1rem", lineHeight: 1.7 }}>
                  Founded in the year 2000 at the sacred Hariwatika Shiv Mandir in Bettiah, West Champaran,
                  our samiti began with a simple vision — to assist poor families in conducting dignified
                  marriages for their daughters and sons.
                </p>
                <p className="mb-4" style={{ color: LENITY.muted, fontSize: "1rem", lineHeight: 1.7 }}>
                  Over the years, the scope expanded to include tree plantation, poverty relief, health
                  camps, and educational support. Today we proudly serve thousands of families.
                </p>
                <p style={{ color: LENITY.muted, fontSize: "1rem", lineHeight: 1.7 }}>
                  Our work is guided by{" "}
                  <strong style={{ fontFamily: SERIF, color: LENITY.ink, fontWeight: 700, background: LENITY.yellowSoft, padding: "0 0.25rem" }}>
                    सेवा ही धर्म है
                  </strong>
                  {" "}— Service is the highest duty. Every activity is transparent, inclusive, and respectful.
                </p>
              </Reveal>

              <div className="space-y-2">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={i * 60} animation="slide-left">
                    <div className="flex gap-4 items-start">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                          style={{ background: LENITY.accent, color: LENITY.ink, fontSize: "0.7rem", fontWeight: 700 }}
                        >
                          {item.year.slice(2)}
                        </div>
                        {i < timeline.length - 1 && (
                          <div className="w-0.5 h-4 mt-1" style={{ background: LENITY.line }} />
                        )}
                      </div>
                      <div className="pb-2">
                        <span
                          className="font-bold block mb-0.5"
                          style={{ color: LENITY.ink, fontSize: "0.7rem", fontWeight: 700 }}
                        >
                          {item.year}
                        </span>
                        <p style={{ color: LENITY.ink, fontSize: "0.875rem", lineHeight: 1.35 }}>
                          {t(item.eventEn, item.eventHi)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "6rem", paddingBottom: "6rem", background: LENITY.soft }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <h2
                className="font-bold"
                style={{ fontFamily: SERIF, fontSize: "2.25rem", color: LENITY.ink, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}
              >
                हमारा उद्देश्य
              </h2>
              <p className="italic mb-3" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem" }}>
                The purpose that guides every step we take.
              </p>
              <div className="mx-auto rounded-full" style={{ width: "3.5rem", height: "0.25rem", background: LENITY.accent }} />
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal animation="slide-right">
                <Card3D
                  className="rounded-3xl p-6 h-full border transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ background: LENITY.bg, borderColor: LENITY.line, borderWidth: "1px" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: LENITY.yellow }}
                  >
                    <Target className="w-5 h-5" style={{ color: LENITY.ink }} />
                  </div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ fontFamily: SERIF, fontSize: "1.25rem", color: LENITY.ink, lineHeight: 1.35 }}
                  >
                    हमारा मिशन
                  </h3>
                  <p style={{ color: LENITY.muted, fontSize: "0.875rem", lineHeight: 1.7 }}>
                    To provide free and subsidized marriage services, create a greener environment through
                    tree plantation, support the poor with essential goods, and promote health and education
                    in rural communities of West Champaran, Bihar.
                  </p>
                </Card3D>
              </Reveal>
              <Reveal animation="slide-left">
                <Card3D
                  className="rounded-3xl p-6 h-full border transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ background: LENITY.bg, borderColor: LENITY.line, borderWidth: "1px" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: LENITY.yellow }}
                  >
                    <Eye className="w-5 h-5" style={{ color: LENITY.ink }} />
                  </div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ fontFamily: SERIF, fontSize: "1.25rem", color: LENITY.ink, lineHeight: 1.35 }}
                  >
                    हमारा विजन
                  </h3>
                  <p style={{ color: LENITY.muted, fontSize: "0.875rem", lineHeight: 1.7 }}>
                    A society where no family is unable to marry off their children due to poverty, every
                    village has green cover, hunger and preventable disease are eliminated, and every child
                    has access to quality education — a truly self-reliant community.
                  </p>
                </Card3D>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "6rem", paddingBottom: "6rem", background: LENITY.bg }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <div className="mb-3 flex justify-center">
                <Eyebrow center>Our Team</Eyebrow>
              </div>
              <h2
                className="font-bold"
                style={{ fontFamily: SERIF, fontSize: "2.25rem", color: LENITY.ink, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}
              >
                हमारी टीम
              </h2>
              <p className="italic mb-3" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem" }}>
                The hands and hearts behind every act of seva.
              </p>
              <div className="mx-auto rounded-full" style={{ width: "3.5rem", height: "0.25rem", background: LENITY.accent }} />
              <p className="mt-3" style={{ color: LENITY.muted, fontSize: "0.875rem" }}>
                {members.length} dedicated members working for community development
              </p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedMembers.map((member, idx) => (
                <Reveal key={member.id} delay={idx * 30} animation="scale">
                  <Card3D
                    intensity={8}
                    className="rounded-3xl border p-4 text-center cursor-default transition-all hover:shadow-xl hover:-translate-y-1"
                    style={{ background: LENITY.bg, borderColor: LENITY.line, borderWidth: "1px" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center font-bold relative"
                      style={{ background: LENITY.accent, color: LENITY.ink, fontSize: "0.875rem", fontWeight: 700 }}
                    >
                      {member.initials}
                    </div>
                    <h4
                      className="font-semibold leading-tight mb-1"
                      style={{ color: LENITY.ink, fontSize: "0.7rem", lineHeight: 1.35 }}
                    >
                      {member.name}
                    </h4>
                    <span
                      className="inline-block font-semibold rounded-full px-2 py-0.5"
                      style={{
                        fontSize: "0.7rem",
                        ...(member.designation === "Member"
                          ? { background: LENITY.soft, color: LENITY.muted }
                          : { background: LENITY.yellowSoft, color: LENITY.ink }),
                      }}
                    >
                      {member.designation}
                    </span>
                  </Card3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Legal Docs ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "6rem", paddingBottom: "6rem", background: LENITY.soft }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <div className="mb-3 flex justify-center">
                <Eyebrow center>Transparency</Eyebrow>
              </div>
              <h2
                className="font-bold"
                style={{ fontFamily: SERIF, fontSize: "2.25rem", color: LENITY.ink, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}
              >
                कानूनी दस्तावेज़
              </h2>
              <p className="italic mb-3" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem" }}>
                Every rupee accounted for, every registration on record.
              </p>
              <div className="mx-auto rounded-full" style={{ width: "3.5rem", height: "0.25rem", background: LENITY.accent }} />
              <p className="mt-3" style={{ color: LENITY.muted, fontSize: "0.875rem" }}>
                All legal registrations and certifications
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalDocs.map((doc, i) => {
                const Icon = iconFor(doc.iconName);
                return (
                  <Reveal key={doc.id} delay={i * 70} animation="slide-up">
                    <Card3D
                      className="rounded-3xl border p-6 h-full transition-all hover:shadow-xl hover:-translate-y-1"
                      style={{ background: LENITY.bg, borderColor: LENITY.line, borderWidth: "1px" }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: LENITY.yellow }}
                      >
                        <Icon className="w-5 h-5" style={{ color: LENITY.ink }} />
                      </div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ fontFamily: SERIF, color: LENITY.ink, fontSize: "0.875rem", fontWeight: 600 }}
                      >
                        {t(doc.titleEn, doc.titleHi)}
                      </h3>
                      <p
                        className="font-mono mb-2"
                        style={{ color: LENITY.ink, fontSize: "0.7rem", fontWeight: 600 }}
                      >
                        {doc.number}
                      </p>
                      <p className="mb-4" style={{ color: LENITY.muted, fontSize: "0.7rem", lineHeight: 1.35 }}>
                        {t(doc.descEn, doc.descHi)}
                      </p>
                      <button
                        className="flex items-center gap-1.5 font-bold rounded-full px-3 py-1.5 transition-all hover:scale-105"
                        style={{ fontSize: "0.7rem", background: LENITY.accent, color: LENITY.ink }}
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </Card3D>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
