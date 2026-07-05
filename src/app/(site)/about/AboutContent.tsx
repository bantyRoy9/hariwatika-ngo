"use client";

import PremiumHero from "@/components/PremiumHero";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import PremiumStorySection from "@/components/PremiumStorySection";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
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
  settings = {},
}: {
  timeline: TimelineData[];
  legalDocs: LegalDocData[];
  members: TeamMemberData[];
  header: Header & { img: string | null };
  settings?: Record<string, { en: string; hi: string }>;
}) {
  const { t } = useLang();

  return (
    <AdminEditProvider initialValues={settings}>
      <main>
        <PremiumHero
          title={<EditableText settingKey="header.about.title" label="Hero Title" en={header.title.en} hi={header.title.hi} />}
          subtitle={<EditableText settingKey="header.about.tag" label="Hero Eyebrow" en={header.tag.en} hi={header.tag.hi} />}
          description={<EditableText settingKey="header.about.subtitle" label="Hero Description" multiline en={header.subtitle.en} hi={header.subtitle.hi} />}
          image={header.img ?? IMG.community}
          stats={[
            { value: "25+", label: <EditableText settingKey="about.stat.0" label="Stat 0 Label" en="Years of Service" hi="वर्षों की सेवा" /> },
            { value: "5000+", label: <EditableText settingKey="about.stat.1" label="Stat 1 Label" en="Families Helped" hi="परिवारों की मदद" /> },
            { value: "100+", label: <EditableText settingKey="about.stat.2" label="Stat 2 Label" en="Villages Reached" hi="गांव पहुंचे" /> },
            { value: "200+", label: <EditableText settingKey="about.stat.3" label="Stat 3 Label" en="Volunteers" hi="स्वयंसेवक" /> },
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

        {/* ── Our Journey Stories ── */}
        <PremiumStorySection
          eyebrow={<EditableText settingKey="about.story.eyebrow" label="Story Eyebrow" en="Our Journey" hi="हमारी यात्रा" />}
          heading={<EditableText settingKey="about.story.h2" label="Story Heading" en="25 Years of Unwavering Commitment" hi="25 वर्षों की अटूट प्रतिबद्धता" />}
          description={<EditableText settingKey="about.story.lead" label="Story Lead" multiline
            en="From humble beginnings at Hariwatika Shiv Mandir to serving thousands across West Champaran, our journey is defined by compassion, transparency, and measurable impact."
            hi="हरिवाटिका शिव मंदिर से शुरू होकर पश्चिम चम्पारण में हजारों की सेवा तक, हमारी यात्रा करुणा, पारदर्शिता और मापने योग्य प्रभाव से परिभाषित है।" />}
          cards={[
            {
              id: "milestone-1",
              number: "01",
              title: <EditableText settingKey="about.story.card.0.title" label="Card 1 Title" en="Foundation & Early Years" hi="स्थापना और प्रारंभिक वर्ष" />,
              description: <EditableText settingKey="about.story.card.0.desc" label="Card 1 Text" multiline
                en="Established in 2000 at the sacred Hariwatika Shiv Mandir with a vision to help families conduct dignified marriages. What started as a small community initiative has grown into a comprehensive welfare organization serving the entire region."
                hi="2000 में पवित्र हरिवाटिका शिव मंदिर में स्थापित, परिवारों को सम्मानजनक विवाह कराने में मदद करने के दृष्टिकोण के साथ। एक छोटी सामुदायिक पहल से शुरू होकर पूरे क्षेत्र की सेवा करने वाले व्यापक कल्याण संगठन में विकसित हुआ।" />,
              image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop",
              stat: "2000",
              statLabel: <EditableText settingKey="about.story.card.0.statLabel" label="Card 1 Stat Label" en="Year Founded" hi="स्थापना वर्ष" />,
            },
            {
              id: "milestone-2",
              number: "02",
              title: <EditableText settingKey="about.story.card.1.title" label="Card 2 Title" en="Growth & Expansion" hi="विकास और विस्तार" />,
              description: <EditableText settingKey="about.story.card.1.desc" label="Card 2 Text" multiline
                en="Expanded services to include tree plantation, poverty relief, healthcare camps, and educational support. Registered as a recognized welfare organization with transparent operations."
                hi="सेवाओं का विस्तार वृक्षारोपण, गरीबी राहत, स्वास्थ्य शिविर और शैक्षिक सहायता शामिल करने के लिए किया गया। पारदर्शी संचालन के साथ मान्यता प्राप्त कल्याण संगठन के रूप में पंजीकृत।" />,
              image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format&fit=crop",
              stat: "100+",
              statLabel: <EditableText settingKey="about.story.card.1.statLabel" label="Card 2 Stat Label" en="Villages Reached" hi="गांव पहुंचे" />,
            },
            {
              id: "milestone-3",
              number: "03",
              title: <EditableText settingKey="about.story.card.2.title" label="Card 3 Title" en="Today & Tomorrow" hi="आज और कल" />,
              description: <EditableText settingKey="about.story.card.2.desc" label="Card 3 Text" multiline
                en="Serving thousands of families annually with 200+ trained volunteers and a network of dedicated partners. Our commitment to seva continues to grow stronger with each passing year."
                hi="200+ प्रशिक्षित स्वयंसेवकों और समर्पित साझेदारों के नेटवर्क के साथ सालाना हजारों परिवारों की सेवा। सेवा के प्रति हमारी प्रतिबद्धता हर गुजरते साल के साथ मजबूत होती जा रही है।" />,
              image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80&auto=format&fit=crop",
              stat: "5K+",
              statLabel: <EditableText settingKey="about.story.card.2.statLabel" label="Card 3 Stat Label" en="Annual Beneficiaries" hi="वार्षिक लाभार्थी" />,
            },
          ]}
          ctaText={<EditableText settingKey="about.story.cta" label="Story CTA" en="View Our Programs" hi="हमारे कार्यक्रम देखें" />}
          ctaLink="/programs"
          theme="light"
        />

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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {members.map((member, idx) => (
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
    </AdminEditProvider>
  );
}
