"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import { members } from "@/data/members";
import { LENITY, SERIF, IMG } from "@/theme/lenity";
import { Target, Eye, FileText, Award, ShieldCheck, Download, Users } from "lucide-react";

const legalDocs = [
  { icon: FileText,   title: "Trust Registration", number: "Reg. No. XXXXX/2000", desc: "Registered under the Bihar Trust Act" },
  { icon: ShieldCheck,title: "PAN Card",            number: "AAATH1234X",          desc: "Permanent Account Number — Income Tax Dept." },
  { icon: Award,      title: "80G Certificate",     number: "80G/2024-25",         desc: "Donations eligible for 50% tax deduction" },
  { icon: Award,      title: "12A Certificate",     number: "12A/2001",            desc: "Exemption under Income Tax Act, 1961" },
];

const timeline = [
  { year: "2000", event: "Foundation established at Hariwatika Chowk, Bettiah" },
  { year: "2002", event: "First mass marriage ceremony — 5 couples blessed" },
  { year: "2005", event: "Vrikshaaropan program launched — 1000 trees planted" },
  { year: "2010", event: "Garib Sahayata expanded to 5 blocks of West Champaran" },
  { year: "2015", event: "Health camps introduced — free medical checkups for 1000+ families" },
  { year: "2020", event: "Digital outreach and e-invitation services started" },
  { year: "2024", event: "25+ years milestone — 5000+ families served" },
];

const rankOrder: Record<string, number> = {
  Director: 1, Chairman: 2, "Executive President": 3, Secretary: 4,
  "General Secretary": 5, Coordinator: 6, Treasurer: 7, "Vice Treasurer": 8,
  Auditor: 9, "Legal Advisor": 10, "Media Reporter": 11, Member: 12,
};

const sortedMembers = [...members].sort(
  (a, b) => (rankOrder[a.designation] ?? 99) - (rankOrder[b.designation] ?? 99)
);

/* eyebrow tag — orange uppercase tracking-wide */
function eyebrowStyle() {
  return {
    background: LENITY.accentSoft,
    color: LENITY.accent,
    fontSize: "0.7rem",
    fontWeight: 700,
    padding: "0.375rem 1rem",
    borderRadius: "9999px",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
  };
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          tag="Established 2000"
          title="हमारे बारे में"
          subtitle="A community-driven charitable organization serving underprivileged families in West Champaran, Bihar for over 25 years."
          icon={<Users className="w-7 h-7" style={{ color: LENITY.accent }} />}
          image={IMG.community}
        />

        {/* ── History ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "6rem", paddingBottom: "6rem", background: LENITY.bg }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal animation="slide-right">
                <span className="mb-4 inline-block w-fit" style={eyebrowStyle()}>
                  Our History
                </span>
                <h2
                  className="font-semibold mb-4"
                  style={{ fontFamily: SERIF, color: LENITY.ink, fontSize: "2rem", lineHeight: 1.15, letterSpacing: "-0.01em" }}
                >
                  हमारी यात्रा
                </h2>
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
                  <strong style={{ fontFamily: SERIF, color: LENITY.accent, fontWeight: 600 }}>
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
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ background: LENITY.accent, fontSize: "0.7rem", fontWeight: 700 }}
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
                          style={{ color: LENITY.accent, fontSize: "0.7rem", fontWeight: 700 }}
                        >
                          {item.year}
                        </span>
                        <p style={{ color: LENITY.ink, fontSize: "0.875rem", lineHeight: 1.35 }}>
                          {item.event}
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
                className="font-semibold"
                style={{ fontFamily: SERIF, fontSize: "2rem", color: LENITY.ink, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}
              >
                हमारा उद्देश्य
              </h2>
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
                    style={{ background: LENITY.accentSoft }}
                  >
                    <Target className="w-5 h-5" style={{ color: LENITY.accent }} />
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
                    style={{ background: LENITY.accentSoft }}
                  >
                    <Eye className="w-5 h-5" style={{ color: LENITY.accent }} />
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
              <span className="mb-3 inline-block w-fit mx-auto" style={eyebrowStyle()}>
                Our Team
              </span>
              <h2
                className="font-semibold"
                style={{ fontFamily: SERIF, fontSize: "2rem", color: LENITY.ink, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}
              >
                हमारी टीम
              </h2>
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
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold relative"
                      style={{ background: LENITY.accent, fontSize: "0.875rem", fontWeight: 700 }}
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
                          : { background: LENITY.accentSoft, color: LENITY.accent }),
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
              <span className="mb-3 inline-block w-fit mx-auto" style={eyebrowStyle()}>
                Transparency
              </span>
              <h2
                className="font-semibold"
                style={{ fontFamily: SERIF, fontSize: "2rem", color: LENITY.ink, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}
              >
                कानूनी दस्तावेज़
              </h2>
              <div className="mx-auto rounded-full" style={{ width: "3.5rem", height: "0.25rem", background: LENITY.accent }} />
              <p className="mt-3" style={{ color: LENITY.muted, fontSize: "0.875rem" }}>
                All legal registrations and certifications
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalDocs.map((doc, i) => (
                <Reveal key={doc.title} delay={i * 70} animation="slide-up">
                  <Card3D
                    className="rounded-3xl border p-6 h-full transition-all hover:shadow-xl hover:-translate-y-1"
                    style={{ background: LENITY.bg, borderColor: LENITY.line, borderWidth: "1px" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: LENITY.accentSoft }}
                    >
                      <doc.icon className="w-5 h-5" style={{ color: LENITY.accent }} />
                    </div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ fontFamily: SERIF, color: LENITY.ink, fontSize: "0.875rem", fontWeight: 600 }}
                    >
                      {doc.title}
                    </h3>
                    <p
                      className="font-mono mb-2"
                      style={{ color: LENITY.accent, fontSize: "0.7rem", fontWeight: 500 }}
                    >
                      {doc.number}
                    </p>
                    <p className="mb-4" style={{ color: LENITY.muted, fontSize: "0.7rem", lineHeight: 1.35 }}>
                      {doc.desc}
                    </p>
                    <button
                      className="flex items-center gap-1.5 font-semibold rounded-full px-3 py-1.5 text-white transition-all hover:scale-105"
                      style={{ fontSize: "0.7rem", background: LENITY.accent }}
                    >
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </Card3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
