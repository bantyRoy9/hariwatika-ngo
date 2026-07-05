"use client";

import { useState } from "react";
import PremiumHero from "@/components/PremiumHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import PremiumStorySection from "@/components/PremiumStorySection";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import EditableCard, { AddButton } from "@/components/EditableCard";
import EditableHeroStats from "@/components/EditableHeroStats";
import EditableJourneyCards from "@/components/EditableJourneyCards";
import { TimelineForm, TeamMemberForm, LegalDocForm, JourneyCardForm, HeroStatForm } from "@/components/AboutForms";
import { HeroContentForm } from "@/components/HeroContentForm";
import { deleteTimelineItem, deleteTeamMember, deleteLegalDoc, deleteJourneyCard, deleteHeroStat } from "@/app/actions/aboutContent";
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
export type JourneyCardData = { id: number; number: string; titleEn: string; titleHi: string; descEn: string; descHi: string; image: string; stat: string; statLabelEn: string; statLabelHi: string };
export type HeroStatData = { id: number; value: string; labelEn: string; labelHi: string };

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
  journeyCards,
  heroStats,
  header,
  settings = {},
}: {
  timeline: TimelineData[];
  legalDocs: LegalDocData[];
  members: TeamMemberData[];
  journeyCards: JourneyCardData[];
  heroStats: HeroStatData[];
  header: Header & { img: string | null };
  settings?: Record<string, { en: string; hi: string }>;
}) {
  const { t } = useLang();

  // Timeline modals
  const [timelineModal, setTimelineModal] = useState<{ open: boolean; data?: TimelineData }>({ open: false });
  // Team member modals
  const [teamModal, setTeamModal] = useState<{ open: boolean; data?: TeamMemberData }>({ open: false });
  // Legal doc modals
  const [legalModal, setLegalModal] = useState<{ open: boolean; data?: LegalDocData }>({ open: false });
  // Journey card modals
  const [journeyModal, setJourneyModal] = useState<{ open: boolean; data?: JourneyCardData }>({ open: false });
  // Hero stat modals
  const [heroStatModal, setHeroStatModal] = useState<{ open: boolean; data?: HeroStatData }>({ open: false });
  // Hero content modal
  const [heroContentModal, setHeroContentModal] = useState(false);

  const handleDeleteTimeline = async (id: number) => {
    const result = await deleteTimelineItem(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  const handleDeleteTeamMember = async (id: number) => {
    const result = await deleteTeamMember(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  const handleDeleteLegalDoc = async (id: number) => {
    const result = await deleteLegalDoc(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  const handleDeleteJourneyCard = async (id: number) => {
    const result = await deleteJourneyCard(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  const handleDeleteHeroStat = async (id: number) => {
    const result = await deleteHeroStat(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  return (
    <AdminEditProvider initialValues={settings}>
      <main>
        {/* Hero Section - Original Design with Editable Stats */}
        <EditableHeroStats
          stats={heroStats}
          heroContent={{
            tagEn: header.tag.en,
            tagHi: header.tag.hi,
            titleEn: header.title.en,
            titleHi: header.title.hi,
            subtitleEn: header.subtitle.en,
            subtitleHi: header.subtitle.hi,
            image: header.img || "",
          }}
          onAdd={() => setHeroStatModal({ open: true })}
          onEdit={(stat) => setHeroStatModal({ open: true, data: stat })}
          onDelete={handleDeleteHeroStat}
          onEditHeroContent={() => setHeroContentModal(true)}
        >
          <PremiumHero
            title={t(header.title.en, header.title.hi)}
            subtitle={t(header.tag.en, header.tag.hi)}
            description={t(header.subtitle.en, header.subtitle.hi)}
            image={header.img ?? IMG.community}
            stats={heroStats.map((stat) => ({
              value: stat.value,
              label: t(stat.labelEn, stat.labelHi)
            }))}
            breadcrumbs={[
              { label: t("Home", "होम"), href: "/" },
              { label: t("About Us", "हमारे बारे में") },
            ]}
            overlay="pattern"
            height="large"
          />
        </EditableHeroStats>

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
                  <EditableText settingKey="about.history.h2" label="History Heading" en="Our Journey" hi="हमारी यात्रा" />
                </h2>
                <p className="italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem", lineHeight: 1.5 }}>
                  <EditableText settingKey="about.history.lead" label="History Lead" en="Twenty-five years of seva, one family at a time." hi="पच्चीस वर्षों की सेवा, एक परिवार एक बार।" />
                </p>
                <p className="mb-4" style={{ color: LENITY.muted, fontSize: "1rem", lineHeight: 1.7 }}>
                  <EditableText settingKey="about.history.p1" label="History Paragraph 1" multiline
                    en="Founded in the year 2000 at the sacred Hariwatika Shiv Mandir in Bettiah, West Champaran, our samiti began with a simple vision — to assist poor families in conducting dignified marriages for their daughters and sons."
                    hi="2000 में बेतिया, पश्चिम चम्पारण में पवित्र हरिवाटिका शिव मंदिर में स्थापित, हमारी समिति एक सरल दृष्टि के साथ शुरू हुई।" />
                </p>
                <p className="mb-4" style={{ color: LENITY.muted, fontSize: "1rem", lineHeight: 1.7 }}>
                  <EditableText settingKey="about.history.p2" label="History Paragraph 2" multiline
                    en="Over the years, the scope expanded to include tree plantation, poverty relief, health camps, and educational support. Today we proudly serve thousands of families."
                    hi="वर्षों में, दायरा वृक्षारोपण, गरीबी राहत, स्वास्थ्य शिविर और शैक्षिक सहायता तक बढ़ा। आज हम गर्व से हजारों परिवारों की सेवा करते हैं।" />
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
                {/* Add Timeline Button */}
                <div className="mb-4">
                  <AddButton
                    onClick={() => setTimelineModal({ open: true })}
                    label="Add Timeline Event"
                  />
                </div>

                {timeline.map((item, i) => (
                  <Reveal key={item.id} delay={i * 60} animation="slide-left">
                    <EditableCard
                      onEdit={() => setTimelineModal({ open: true, data: item })}
                      onDelete={() => handleDeleteTimeline(item.id)}
                    >
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
                    </EditableCard>
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
                <EditableText as="span" settingKey="about.mv.h2" label="Mission & Vision Heading" en="Our Purpose" hi="हमारा उद्देश्य" />
              </h2>
              <p className="italic mb-3" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem" }}>
                <EditableText as="span" settingKey="about.mv.lead" label="Mission & Vision Subtitle" en="The purpose that guides every step we take." hi="हर कदम का मार्गदर्शन करने वाला उद्देश्य।" />
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
                  <EditableText as="h3" settingKey="about.mission.h3" label="Mission Card Title"
                    en="Our Mission" hi="हमारा मिशन"
                    className="font-semibold mb-3"
                    style={{ fontFamily: SERIF, fontSize: "1.25rem", color: LENITY.ink, lineHeight: 1.35 }}
                  />
                  <EditableText as="p" settingKey="about.mission.text" label="Mission Text" multiline
                    en="To provide free and subsidized marriage services, create a greener environment through tree plantation, support the poor with essential goods, and promote health and education in rural communities of West Champaran, Bihar."
                    hi="पश्चिम चम्पारण, बिहार के ग्रामीण समुदायों में मुफ्त और सब्सिडी वाली विवाह सेवाएं प्रदान करना, वृक्षारोपण के माध्यम से हरियाली बढ़ाना, गरीबों को आवश्यक सामान और स्वास्थ्य-शिक्षा को बढ़ावा देना।"
                    style={{ color: LENITY.muted, fontSize: "0.875rem", lineHeight: 1.7 }}
                  />
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
                  <EditableText as="h3" settingKey="about.vision.h3" label="Vision Card Title"
                    en="Our Vision" hi="हमारा विजन"
                    className="font-semibold mb-3"
                    style={{ fontFamily: SERIF, fontSize: "1.25rem", color: LENITY.ink, lineHeight: 1.35 }}
                  />
                  <EditableText as="p" settingKey="about.vision.text" label="Vision Text" multiline
                    en="A society where no family is unable to marry off their children due to poverty, every village has green cover, hunger and preventable disease are eliminated, and every child has access to quality education."
                    hi="एक समाज जहाँ कोई परिवार गरीबी के कारण अपने बच्चों की शादी न कर पाने में असमर्थ न हो, हर गाँव में हरियाली हो, भूख और रोकथाम योग्य बीमारियाँ समाप्त हों।"
                    style={{ color: LENITY.muted, fontSize: "0.875rem", lineHeight: 1.7 }}
                  />
                </Card3D>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Our Journey Stories - Original Design with Editable Cards ── */}
        <EditableJourneyCards
          cards={journeyCards}
          onAdd={() => setJourneyModal({ open: true })}
          onEdit={(card) => setJourneyModal({ open: true, data: card })}
          onDelete={handleDeleteJourneyCard}
        >
          <PremiumStorySection
            eyebrow={t("Our Journey", "हमारी यात्रा")}
            heading={t("25 Years of Unwavering Commitment", "25 वर्षों की अटूट प्रतिबद्धता")}
            description={t(
              "From humble beginnings at Hariwatika Shiv Mandir to serving thousands across West Champaran, our journey is defined by compassion, transparency, and measurable impact.",
              "हरिवाटिका शिव मंदिर से शुरू होकर पश्चिम चम्पारण में हजारों की सेवा तक, हमारी यात्रा करुणा, पारदर्शिता और मापने योग्य प्रभाव से परिभाषित है।"
            )}
            cards={journeyCards.map((card, idx) => ({
              id: `journey-${card.id || idx}`,
              number: card.number,
              title: t(card.titleEn, card.titleHi),
              description: t(card.descEn, card.descHi),
              image: card.image,
              stat: card.stat,
              statLabel: t(card.statLabelEn, card.statLabelHi),
            }))}
            ctaText={t("View Our Programs", "हमारे कार्यक्रम देखें")}
            ctaLink="/programs"
            theme="light"
          />
        </EditableJourneyCards>

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
                <EditableText as="span" settingKey="about.team.h2" label="Team Heading" en="Our Team" hi="हमारी टीम" />
              </h2>
              <p className="italic mb-3" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem" }}>
                <EditableText as="span" settingKey="about.team.lead" label="Team Subtitle" en="The hands and hearts behind every act of seva." hi="हर सेवा के पीछे के हाथ और दिल।" />
              </p>
              <div className="mx-auto rounded-full" style={{ width: "3.5rem", height: "0.25rem", background: LENITY.accent }} />
              <p className="mt-3" style={{ color: LENITY.muted, fontSize: "0.875rem" }}>
                {members.length} dedicated members working for community development
              </p>
            </Reveal>

            {/* Add Team Member Button */}
            <div className="mb-6 text-center">
              <AddButton
                onClick={() => setTeamModal({ open: true })}
                label="Add Team Member"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {members.map((member, idx) => (
                <Reveal key={member.id} delay={idx * 30} animation="scale">
                  <EditableCard
                    onEdit={() => setTeamModal({ open: true, data: member })}
                    onDelete={() => handleDeleteTeamMember(member.id)}
                  >
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
                  </EditableCard>
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
                <EditableText as="span" settingKey="about.legal.h2" label="Legal Docs Heading" en="Legal Documents" hi="कानूनी दस्तावेज़" />
              </h2>
              <p className="italic mb-3" style={{ fontFamily: SERIF, color: LENITY.muted, fontSize: "1.125rem" }}>
                <EditableText as="span" settingKey="about.legal.lead" label="Legal Docs Subtitle" en="Every rupee accounted for, every registration on record." hi="हर रुपया लिखा, हर पंजीकरण दर्ज।" />
              </p>
              <div className="mx-auto rounded-full" style={{ width: "3.5rem", height: "0.25rem", background: LENITY.accent }} />
              <p className="mt-3" style={{ color: LENITY.muted, fontSize: "0.875rem" }}>
                All legal registrations and certifications
              </p>
            </Reveal>

            {/* Add Legal Document Button */}
            <div className="mb-6 text-center">
              <AddButton
                onClick={() => setLegalModal({ open: true })}
                label="Add Legal Document"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalDocs.map((doc, i) => {
                const Icon = iconFor(doc.iconName);
                return (
                  <Reveal key={doc.id} delay={i * 70} animation="slide-up">
                    <EditableCard
                      onEdit={() => setLegalModal({ open: true, data: doc })}
                      onDelete={() => handleDeleteLegalDoc(doc.id)}
                    >
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
                    </EditableCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Form Modals */}
      <TimelineForm 
        isOpen={timelineModal.open} 
        onClose={() => setTimelineModal({ open: false })}
        initialData={timelineModal.data}
        itemId={timelineModal.data?.id}
      />
      <TeamMemberForm 
        isOpen={teamModal.open}
        onClose={() => setTeamModal({ open: false })}
        initialData={teamModal.data ? {
          name: teamModal.data.name,
          designation: teamModal.data.designation,
          phone: teamModal.data.phone || ""
        } : undefined}
        itemId={teamModal.data?.id}
      />
      <LegalDocForm
        isOpen={legalModal.open}
        onClose={() => setLegalModal({ open: false })}
        initialData={legalModal.data}
        itemId={legalModal.data?.id}
      />
      <JourneyCardForm
        isOpen={journeyModal.open}
        onClose={() => setJourneyModal({ open: false })}
        initialData={journeyModal.data}
        itemId={journeyModal.data?.id}
      />
      <HeroStatForm
        isOpen={heroStatModal.open}
        onClose={() => setHeroStatModal({ open: false })}
        initialData={heroStatModal.data}
        itemId={heroStatModal.data?.id}
      />
      <HeroContentForm
        isOpen={heroContentModal}
        onClose={() => setHeroContentModal(false)}
        initialData={{
          tagEn: header.tag.en,
          tagHi: header.tag.hi,
          titleEn: header.title.en,
          titleHi: header.title.hi,
          subtitleEn: header.subtitle.en,
          subtitleHi: header.subtitle.hi,
          image: header.img || "",
        }}
        page="about"
      />
    </AdminEditProvider>
  );
}
