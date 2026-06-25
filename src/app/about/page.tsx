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
  "var(--color-primary)","var(--color-accent-green)","var(--color-primary-dark)","var(--color-accent-green-light)",
  "var(--color-accent)","var(--color-primary-light)","#6B3D00","#003D20","#C47A00","#005C38",
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
          icon={<Users className="w-7 h-7" style={{ color: 'var(--color-accent)' }} />}
        />

        {/* ── History ── */}
        <section 
          className="dot-grid relative overflow-hidden" 
          style={{ 
            paddingTop: 'var(--section-padding-md)', 
            paddingBottom: 'var(--section-padding-md)',
            background: 'var(--color-surface)'
          }}
        >
          <div 
            className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl hero-blob-1 pointer-events-none" 
            style={{ background: 'var(--color-primary)', opacity: 0.05 }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal animation="slide-right">
                <span 
                  className="mb-4 block w-fit"
                  style={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-surface)',
                    opacity: 0.9,
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    padding: '0.375rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: 'var(--letter-spacing-widest)',
                    textTransform: 'uppercase'
                  }}
                >
                  Our History
                </span>
                <h2 
                  className="gradient-text-premium font-display font-semibold mb-4" 
                  style={{ 
                    fontSize: 'var(--font-size-3xl)',
                    lineHeight: 'var(--line-height-tight)',
                    letterSpacing: 'var(--letter-spacing-tight)'
                  }}
                >
                  हमारी यात्रा
                </h2>
                <p 
                  className="mb-4" 
                  style={{ 
                    color: 'var(--color-secondary-text)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}
                >
                  Founded in the year 2000 at the sacred Hariwatika Shiv Mandir in Bettiah, West Champaran,
                  our samiti began with a simple vision — to assist poor families in conducting dignified
                  marriages for their daughters and sons.
                </p>
                <p 
                  className="mb-4" 
                  style={{ 
                    color: 'var(--color-secondary-text)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}
                >
                  Over the years, the scope expanded to include tree plantation, poverty relief, health
                  camps, and educational support. Today we proudly serve thousands of families.
                </p>
                <p 
                  style={{ 
                    color: 'var(--color-secondary-text)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}
                >
                  Our work is guided by{' '}
                  <strong 
                    className="font-display" 
                    style={{ 
                      color: 'var(--color-primary)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    सेवा ही धर्म है
                  </strong>
                  {' '}— Service is the highest duty. Every activity is transparent, inclusive, and respectful.
                </p>
              </Reveal>

              <div className="space-y-2">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={i * 60} animation="slide-left">
                    <div className="flex gap-4 items-start">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shine-sweep"
                          style={{ 
                            background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent-green)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-bold)'
                          }}
                        >
                          {item.year.slice(2)}
                        </div>
                        {i < timeline.length - 1 && (
                          <div 
                            className="w-0.5 h-4 mt-1" 
                            style={{ background: 'var(--color-outline-variant)' }}
                          />
                        )}
                      </div>
                      <div className="pb-2">
                        <span 
                          className="font-bold block mb-0.5" 
                          style={{ 
                            color: 'var(--color-primary)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-bold)'
                          }}
                        >
                          {item.year}
                        </span>
                        <p 
                          style={{ 
                            color: 'var(--color-on-surface)',
                            fontSize: 'var(--font-size-sm)',
                            lineHeight: 'var(--line-height-snug)'
                          }}
                        >
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
          className="line-grid relative overflow-hidden" 
          style={{ 
            paddingTop: 'var(--section-padding-md)', 
            paddingBottom: 'var(--section-padding-md)',
            background: 'var(--color-surface-elevated)'
          }}
        >
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl hero-blob-2 pointer-events-none" 
            style={{ background: 'var(--color-accent)', opacity: 0.06 }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <h2 
                className="font-display font-semibold" 
                style={{ 
                  fontSize: 'var(--font-size-3xl)',
                  color: 'var(--color-on-surface)',
                  letterSpacing: 'var(--letter-spacing-tight)',
                  marginBottom: '0.75rem'
                }}
              >
                हमारा उद्देश्य
              </h2>
              <div className="section-divider" />
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal animation="slide-right">
                <Card3D 
                  className="rounded-2xl p-6 h-full border" 
                  style={{ 
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-outline-variant)',
                    borderWidth: '1px'
                  }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" 
                    style={{ background: 'var(--color-primary)', opacity: 0.1 }}
                  >
                    <Target className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3 
                    className="font-display font-semibold mb-3" 
                    style={{ 
                      fontSize: 'var(--font-size-xl)',
                      color: 'var(--color-on-surface)',
                      lineHeight: 'var(--line-height-snug)'
                    }}
                  >
                    हमारा मिशन
                  </h3>
                  <p 
                    style={{ 
                      color: 'var(--color-secondary-text)',
                      fontSize: 'var(--font-size-sm)',
                      lineHeight: 'var(--line-height-relaxed)'
                    }}
                  >
                    To provide free and subsidized marriage services, create a greener environment through
                    tree plantation, support the poor with essential goods, and promote health and education
                    in rural communities of West Champaran, Bihar.
                  </p>
                </Card3D>
              </Reveal>
              <Reveal animation="slide-left">
                <Card3D 
                  className="rounded-2xl p-6 h-full border" 
                  style={{ 
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-outline-variant)',
                    borderWidth: '1px'
                  }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" 
                    style={{ background: 'var(--color-accent-green)', opacity: 0.12 }}
                  >
                    <Eye className="w-5 h-5" style={{ color: 'var(--color-accent-green)' }} />
                  </div>
                  <h3 
                    className="font-display font-semibold mb-3" 
                    style={{ 
                      fontSize: 'var(--font-size-xl)',
                      color: 'var(--color-on-surface)',
                      lineHeight: 'var(--line-height-snug)'
                    }}
                  >
                    हमारा विजन
                  </h3>
                  <p 
                    style={{ 
                      color: 'var(--color-secondary-text)',
                      fontSize: 'var(--font-size-sm)',
                      lineHeight: 'var(--line-height-relaxed)'
                    }}
                  >
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
          className="dot-grid relative overflow-hidden" 
          style={{ 
            paddingTop: 'var(--section-padding-md)', 
            paddingBottom: 'var(--section-padding-md)',
            background: 'var(--color-surface)'
          }}
        >
          <div 
            className="absolute top-1/3 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" 
            style={{ background: 'var(--color-primary)', opacity: 0.06 }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <span 
                className="mb-3 block w-fit mx-auto"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-surface)',
                  opacity: 0.9,
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  padding: '0.375rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: 'var(--letter-spacing-widest)',
                  textTransform: 'uppercase'
                }}
              >
                Our Team
              </span>
              <h2 
                className="font-display font-semibold" 
                style={{ 
                  fontSize: 'var(--font-size-3xl)',
                  color: 'var(--color-on-surface)',
                  letterSpacing: 'var(--letter-spacing-tight)',
                  marginBottom: '0.75rem'
                }}
              >
                हमारी टीम
              </h2>
              <div className="section-divider" />
              <p 
                className="mt-3" 
                style={{ 
                  color: 'var(--color-secondary-text)',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                {members.length} dedicated members working for community development
              </p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedMembers.map((member, idx) => (
                <Reveal key={member.id} delay={idx * 30} animation="scale">
                  <Card3D
                    intensity={8}
                    className="rounded-2xl border p-4 text-center cursor-default"
                    style={{ 
                      background: 'var(--color-surface-elevated)',
                      borderColor: 'var(--color-outline-variant)',
                      borderWidth: '1px'
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ring-pulse relative"
                      style={{ 
                        background: avatarColors[idx % avatarColors.length],
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      {member.initials}
                    </div>
                    <h4 
                      className="font-semibold leading-tight mb-1" 
                      style={{ 
                        color: 'var(--color-on-surface)',
                        fontSize: 'var(--font-size-xs)',
                        lineHeight: 'var(--line-height-snug)'
                      }}
                    >
                      {member.name}
                    </h4>
                    <span 
                      className="inline-block font-semibold rounded-full px-2 py-0.5"
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        ...(member.designation === "Member"
                          ? { 
                              background: 'var(--color-surface-muted)', 
                              color: 'var(--color-secondary-text)' 
                            }
                          : { 
                              background: 'var(--color-primary)', 
                              color: 'var(--color-surface)',
                              opacity: 0.9
                            })
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
          style={{ 
            paddingTop: 'var(--section-padding-md)', 
            paddingBottom: 'var(--section-padding-md)',
            background: 'var(--color-surface-elevated)'
          }}
        >
          <div 
            className="absolute bottom-0 right-0 w-96 h-64 rounded-full blur-3xl pointer-events-none" 
            style={{ background: 'var(--color-accent-green)', opacity: 0.05 }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <span 
                className="mb-3 block w-fit mx-auto"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-surface)',
                  opacity: 0.9,
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  padding: '0.375rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: 'var(--letter-spacing-widest)',
                  textTransform: 'uppercase'
                }}
              >
                Transparency
              </span>
              <h2 
                className="font-display font-semibold" 
                style={{ 
                  fontSize: 'var(--font-size-3xl)',
                  color: 'var(--color-on-surface)',
                  letterSpacing: 'var(--letter-spacing-tight)',
                  marginBottom: '0.75rem'
                }}
              >
                कानूनी दस्तावेज़
              </h2>
              <div className="section-divider" />
              <p 
                className="mt-3" 
                style={{ 
                  color: 'var(--color-secondary-text)',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                All legal registrations and certifications
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalDocs.map((doc, i) => (
                <Reveal key={doc.title} delay={i * 70} animation="slide-up">
                  <Card3D 
                    className="rounded-2xl border p-6 h-full shine-sweep" 
                    style={{ 
                      background: 'var(--color-surface-elevated)',
                      borderColor: 'var(--color-outline-variant)',
                      borderWidth: '1px'
                    }}
                  >
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" 
                      style={{ background: 'var(--color-primary)', opacity: 0.08 }}
                    >
                      <doc.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h3 
                      className="font-semibold mb-1" 
                      style={{ 
                        color: 'var(--color-on-surface)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      {doc.title}
                    </h3>
                    <p 
                      className="font-mono mb-2" 
                      style={{ 
                        color: 'var(--color-primary)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      {doc.number}
                    </p>
                    <p 
                      className="mb-4" 
                      style={{ 
                        color: 'var(--color-secondary-text)',
                        fontSize: 'var(--font-size-xs)',
                        lineHeight: 'var(--line-height-snug)'
                      }}
                    >
                      {doc.desc}
                    </p>
                    <button 
                      className="flex items-center gap-1.5 font-semibold border rounded-full px-3 py-1.5 hover:opacity-80 transition-opacity"
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-primary)',
                        borderColor: 'var(--color-primary)',
                        borderWidth: '1px'
                      }}
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
