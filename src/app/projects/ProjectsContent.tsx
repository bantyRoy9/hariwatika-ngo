"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import ProjectMap from "@/components/ProjectMap";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { LENITY, SERIF, IMG } from "@/theme/lenity";
import { Heart, TreePine, Users, Stethoscope, BookOpen, CalendarDays, MapPin, type LucideIcon } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import type { Header } from "../blog/BlogContent";

// Icon lookup for project cards (keyed by iconName string from DB). Fallback: Heart.
const ICONS: Record<string, LucideIcon> = { Heart, TreePine, Users, Stethoscope, BookOpen };
const iconFor = (name: string): LucideIcon => ICONS[name] ?? Heart;

export type ProjectData = {
  id: number;
  category: string;
  iconName: string;
  status: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  raised: number;
  goal: number;
  location: string;
  date: string;
  beneficiaries: string;
};

export type FuturePlanData = { id: number; titleEn: string; titleHi: string; year: string; descEn: string; descHi: string };

export default function ProjectsContent({
  projects,
  futurePlans,
  categories,
  header,
}: {
  projects: ProjectData[];
  futurePlans: FuturePlanData[];
  categories: string[];
  header: Header & { img: string | null };
}) {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");

  const allCats = ["All", ...categories];
  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <AdminEditProvider>
      <Navbar />
      <main>
        <PremiumHero
          title={t(header.title.en, header.title.hi)}
          subtitle={t(header.tag.en, header.tag.hi)}
          description={t(header.subtitle.en, header.subtitle.hi)}
          image={header.img ?? IMG.community}
          stats={[
            { value: `${projects.length}+`, label: t("Projects", "परियोजनाएं") },
            { value: "₹50L+", label: t("Funds Raised", "धन एकत्रित") },
            { value: "20+", label: t("Locations", "स्थान") },
            { value: "5000+", label: t("Beneficiaries", "लाभार्थी") },
          ]}
          breadcrumbs={[
            { label: t("Home", "होम"), href: "/" },
            { label: t("Projects", "परियोजनाएं") },
          ]}
          overlay="gradient"
          height="large"
        />

        {/* Project Map */}
        <ProjectMap projects={projects} lang={lang === "hi" ? "hi" : "en"} />

        {/* Filter Tabs */}
        <section className="py-8" style={{ background: LENITY.soft, borderBottom: `1px solid ${LENITY.line}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {allCats.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={
                      active
                        ? { background: LENITY.accent, color: LENITY.ink }
                        : { background: "#fff8f5", color: LENITY.ink, border: `1px solid ${LENITY.line}` }
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16" style={{ background: LENITY.soft }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => {
                const pct = Math.round((project.raised / project.goal) * 100);
                const done = project.status === "completed";
                const Icon = iconFor(project.iconName);
                return (
                  <Reveal key={project.id} delay={i * 70} animation="slide-up">
                    <Card3D
                      className="bg-white rounded-3xl border overflow-hidden flex flex-col h-full transition-all hover:shadow-xl hover:-translate-y-1"
                      style={{ borderColor: LENITY.line }}
                    >
                      <div className="h-24 flex items-center justify-center relative" style={{ background: LENITY.accentSoft }}>
                        <Icon className="w-12 h-12" style={{ color: LENITY.accent, opacity: 0.5 }} />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span
                            className="text-[10px] font-bold rounded-full px-2.5 py-0.5"
                            style={
                              done
                                ? { background: "#22c55e", color: "#ffffff" }
                                : { background: LENITY.accent, color: LENITY.bg }
                            }
                          >
                            {done ? "✓ Completed" : "● Ongoing"}
                          </span>
                        </div>
                        <span
                          className="absolute bottom-3 left-3 text-[10px] font-semibold rounded-full px-2.5 py-0.5 backdrop-blur-sm"
                          style={{ background: "rgba(13,18,41,0.8)", color: LENITY.ink, border: `1px solid ${LENITY.line}` }}
                        >
                          {project.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-base leading-snug mb-2" style={{ color: LENITY.ink, fontFamily: SERIF }}>
                          {t(project.titleEn, project.titleHi)}
                        </h3>
                        <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: LENITY.muted }}>{t(project.descEn, project.descHi)}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs" style={{ color: LENITY.muted }}>
                          <div className="flex items-center gap-1"><MapPin className="w-3 h-3" style={{ color: LENITY.accent }} /><span className="truncate">{project.location}</span></div>
                          <div className="flex items-center gap-1"><CalendarDays className="w-3 h-3" style={{ color: LENITY.accent }} /><span>{project.date}</span></div>
                          <div className="flex items-center gap-1"><Users className="w-3 h-3" style={{ color: LENITY.accent }} /><span>{project.beneficiaries}</span></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span style={{ color: LENITY.muted }}>₹{project.raised.toLocaleString("en-IN")} raised</span>
                            <span className="font-bold" style={{ color: LENITY.ink }}>{pct}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: LENITY.line }}>
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: LENITY.accent, transition: "width 1.2s ease" }} />
                          </div>
                          <div className="text-xs" style={{ color: LENITY.muted }}>Goal: ₹{project.goal.toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                    </Card3D>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Future Plans */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <span className="inline-flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: LENITY.ink }}>
                <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
                <EditableText settingKey="projects.future.eyebrow" label="Future Plans Eyebrow" en="Future Plans" hi="भविष्य की योजनाएं" />
              </span>
              <EditableText as="h2" settingKey="projects.future.h2" label="Future Plans Heading"
                en="What We Are Building Next" hi="भविष्य की योजनाएं"
                className="text-3xl sm:text-4xl font-bold" style={{ color: LENITY.ink, fontFamily: SERIF }}
              />
              <EditableText as="p" settingKey="projects.future.sub" label="Future Plans Subtext"
                en="What we are building next for West Champaran."
                hi="पश्चिम चम्पारण के लिए हम आगे क्या बना रहे हैं।"
                className="text-lg italic mt-2" style={{ fontFamily: SERIF, color: LENITY.muted }}
              />
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {futurePlans.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 80} animation="slide-up">
                  <Card3D
                    className="rounded-3xl border p-6 h-full transition-all hover:shadow-xl hover:-translate-y-1"
                    style={{ background: LENITY.soft, borderColor: LENITY.line }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold rounded-full px-3 py-1" style={{ background: LENITY.accent, color: LENITY.ink }}>
                        {plan.year}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: LENITY.ink, fontFamily: SERIF }}>{t(plan.titleEn, plan.titleHi)}</h3>
                    <p className="text-sm" style={{ color: LENITY.muted }}>{t(plan.descEn, plan.descHi)}</p>
                  </Card3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AdminEditProvider>
  );
}