"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import { members } from "@/data/members";
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

const avatarColors = [
  "#855300","#006d3e","#6b3d00","#004d2e","#a06400",
  "#007848","#5c3000","#003d20","#c47a00","#005c38",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          tag="Established 2000"
          title="हमारे बारे में"
          subtitle="A community-driven charitable organization serving underprivileged families in West Champaran, Bihar for over 25 years."
          icon={<Users className="w-8 h-8 text-[#F4A433]" />}
        />

        {/* ── History ── */}
        <section className="py-20 bg-[#fbf9f4] dot-grid relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#855300]/5 blur-3xl hero-blob-1 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <Reveal animation="slide-right">
                <span className="section-tag mb-4 block w-fit">Our History</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19] mb-5 gradient-text-gold" style={{ fontFamily: "'Literata', serif" }}>
                  हमारी यात्रा
                </h2>
                <p className="text-[#524435] leading-relaxed mb-4">
                  Founded in the year 2000 at the sacred Hariwatika Shiv Mandir in Bettiah, West Champaran,
                  our samiti began with a simple vision — to assist poor families in conducting dignified
                  marriages for their daughters and sons.
                </p>
                <p className="text-[#524435] leading-relaxed mb-4">
                  Over the years, the scope expanded to include tree plantation, poverty relief, health
                  camps, and educational support. Today we proudly serve thousands of families.
                </p>
                <p className="text-[#524435] leading-relaxed">
                  Our work is guided by <strong className="text-[#855300]">सेवा ही धर्म है</strong> —
                  Service is the highest duty. Every activity is transparent, inclusive, and respectful.
                </p>
              </Reveal>

              <div className="space-y-3">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={i * 70} animation="slide-left">
                    <div className="flex gap-4 items-start">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shine-sweep"
                          style={{ background: i % 2 === 0 ? "#855300" : "#006d3e" }}
                        >
                          {item.year.slice(2)}
                        </div>
                        {i < timeline.length - 1 && <div className="w-0.5 h-5 bg-[#e4e2dd] mt-1" />}
                      </div>
                      <div className="pb-3">
                        <span className="text-xs font-bold text-[#855300]">{item.year}</span>
                        <p className="text-[#1b1c19] text-sm mt-0.5">{item.event}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-20 bg-white line-grid relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#F4A433]/6 blur-3xl hero-blob-2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>
                हमारा उद्देश्य
              </h2>
              <div className="section-divider" />
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              <Reveal animation="slide-right">
                <Card3D className="bg-[#fbf9f4] rounded-2xl p-8 border border-[#e4e2dd] h-full">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-[#855300]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1b1c19] mb-3" style={{ fontFamily: "'Literata', serif" }}>हमारा मिशन</h3>
                  <p className="text-[#524435] leading-relaxed text-sm">
                    To provide free and subsidized marriage services, create a greener environment through
                    tree plantation, support the poor with essential goods, and promote health and education
                    in rural communities of West Champaran, Bihar.
                  </p>
                </Card3D>
              </Reveal>
              <Reveal animation="slide-left">
                <Card3D className="bg-[#f0fdf4] rounded-2xl p-8 border border-green-100 h-full">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-[#006d3e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1b1c19] mb-3" style={{ fontFamily: "'Literata', serif" }}>हमारा विजन</h3>
                  <p className="text-[#524435] leading-relaxed text-sm">
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
        <section className="py-20 bg-[#fbf9f4] dot-grid relative overflow-hidden">
          <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#855300]/6 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <span className="section-tag mb-3 block w-fit mx-auto">Our Team</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>हमारी टीम</h2>
              <div className="section-divider" />
              <p className="text-[#524435] mt-3">{members.length} dedicated members working for community development</p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedMembers.map((member, idx) => (
                <Reveal key={member.id} delay={idx * 35} animation="scale">
                  <Card3D
                    intensity={8}
                    className="bg-white rounded-2xl border border-[#e4e2dd] p-4 text-center cursor-default"
                  >
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-base ring-pulse relative"
                      style={{ background: avatarColors[idx % avatarColors.length] }}
                    >
                      {member.initials}
                    </div>
                    <h4 className="font-semibold text-[#1b1c19] text-xs leading-tight mb-1">{member.name}</h4>
                    <span className={`inline-block text-[9px] font-semibold rounded-full px-2 py-0.5 ${
                      member.designation === "Member"
                        ? "bg-gray-100 text-[#524435]"
                        : "bg-orange-100 text-[#855300]"
                    }`}>
                      {member.designation}
                    </span>
                  </Card3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Legal Docs ── */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-64 rounded-full bg-[#006d3e]/5 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <span className="section-tag mb-3 block w-fit mx-auto">Transparency</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>कानूनी दस्तावेज़</h2>
              <div className="section-divider" />
              <p className="text-[#524435] mt-3">All legal registrations and certifications</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalDocs.map((doc, i) => (
                <Reveal key={doc.title} delay={i * 80} animation="slide-up">
                  <Card3D className="bg-white rounded-2xl border border-[#e4e2dd] p-6 h-full shine-sweep">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                      <doc.icon className="w-6 h-6 text-[#855300]" />
                    </div>
                    <h3 className="font-semibold text-[#1b1c19] mb-1">{doc.title}</h3>
                    <p className="text-xs font-mono text-[#855300] mb-1">{doc.number}</p>
                    <p className="text-[#524435] text-xs mb-4">{doc.desc}</p>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-[#855300] hover:text-[#653e00] border border-[#855300]/30 rounded-full px-3 py-1.5 hover:bg-orange-50 transition-colors">
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
