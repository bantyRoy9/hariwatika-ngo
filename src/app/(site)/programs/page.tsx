"use client";

import { useState } from "react";
import DonationModal from "@/components/DonationModal";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import {
  BookOpen, Users, Heart, UserPlus, Building2, Target, Check, ArrowRight
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";
import Link from "next/link";

// Temporary programs data - TODO: Replace with database data
interface ProgramStats {
  beneficiaries: string;
  years: string;
  villages?: string;
  schools?: string;
}

interface ProgramData {
  id: string;
  icon: any;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  shortDescEn: string;
  shortDescHi: string;
  descriptionEn: string;
  descriptionHi: string;
  beneficiaries: string;
  features: string[];
  image: string;
  stats: ProgramStats;
  objectives: Array<{ en: string; hi: string }>;
}

const programs: ProgramData[] = [
  { 
    id: "marriage", 
    icon: Heart, 
    titleEn: "Marriage Assistance", 
    titleHi: "विवाह सहायता", 
    descEn: "Free and subsidized marriage services", 
    descHi: "मुफ्त और सब्सिडी वाली विवाह सेवाएं", 
    shortDescEn: "Supporting families", 
    shortDescHi: "परिवारों का समर्थन", 
    descriptionEn: "We provide complete marriage assistance including venue, food, and documentation support.", 
    descriptionHi: "हम स्थल, भोजन और दस्तावेज़ सहायता सहित पूर्ण विवाह सहायता प्रदान करते हैं।", 
    beneficiaries: "5000+", 
    features: ["Free venue", "Food arrangements", "Documentation help"], 
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    stats: {
      beneficiaries: "5000+",
      years: "25+",
      villages: "50+"
    },
    objectives: [
      { en: "Provide free marriage venues for underprivileged families", hi: "वंचित परिवारों के लिए मुफ्त विवाह स्थल प्रदान करें" },
      { en: "Arrange complete food and catering services", hi: "पूर्ण भोजन और खानपान सेवाओं की व्यवस्था करें" },
      { en: "Assist with marriage documentation and legal formalities", hi: "विवाह दस्तावेज़ीकरण और कानूनी औपचारिकताओं में सहायता करें" },
      { en: "Ensure dignified ceremonies for all communities", hi: "सभी समुदायों के लिए गरिमापूर्ण समारोह सुनिश्चित करें" }
    ]
  },
  { 
    id: "education", 
    icon: BookOpen, 
    titleEn: "Education Support", 
    titleHi: "शिक्षा सहायता", 
    descEn: "Educational support for rural children", 
    descHi: "ग्रामीण बच्चों के लिए शैक्षिक सहायता", 
    shortDescEn: "Empowering children", 
    shortDescHi: "बच्चों को सशक्त बनाना", 
    descriptionEn: "Providing educational support including school supplies, tuition assistance, and scholarships.", 
    descriptionHi: "स्कूल आपूर्ति, ट्यूशन सहायता और छात्रवृत्ति सहित शैक्षिक सहायता प्रदान करना।", 
    beneficiaries: "2000+", 
    features: ["School supplies", "Tuition support", "Scholarships"], 
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    stats: {
      beneficiaries: "2000+",
      years: "20+",
      schools: "30+"
    },
    objectives: [
      { en: "Provide school supplies and stationery to needy students", hi: "जरूरतमंद छात्रों को स्कूल की आपूर्ति और स्टेशनरी प्रदान करें" },
      { en: "Offer tuition fee assistance for deserving children", hi: "योग्य बच्चों के लिए ट्यूशन शुल्क सहायता प्रदान करें" },
      { en: "Award scholarships for higher education", hi: "उच्च शिक्षा के लिए छात्रवृत्ति प्रदान करें" },
      { en: "Support infrastructure development in rural schools", hi: "ग्रामीण स्कूलों में बुनियादी ढांचे के विकास का समर्थन करें" }
    ]
  },
];

export default function ProgramsPage() {
  const { t } = useLang();
  const [donateOpen, setDonateOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <AdminEditProvider>
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

      {/* Hero Section */}
      <PremiumHero
        title={t("Our Programs", "हमारे कार्यक्रम")}
        subtitle={t("Making a Difference", "फर्क बनाना")}
        description={t(
          "Comprehensive initiatives addressing education, health, environment, and social welfare across West Champaran",
          "पश्चिम चम्पारण में शिक्षा, स्वास्थ्य, पर्यावरण और सामाजिक कल्याण को संबोधित करने वाली व्यापक पहल"
        )}
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
        stats={[
          { value: "8", label: t("Active Programs", "सक्रिय कार्यक्रम") },
          { value: "15K+", label: t("Beneficiaries", "लाभार्थी") },
          { value: "25+", label: t("Years Service", "वर्षों की सेवा") },
          { value: "100+", label: t("Villages Covered", "गांव शामिल") },
        ]}
        breadcrumbs={[
          { label: t("Home", "होम"), href: "/" },
          { label: t("Programs", "कार्यक्रम") },
        ]}
        overlay="gradient"
        height="large"
      />

      {/* Programs List */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const isExpanded = selectedProgram === program.id;

              return (
                <div
                  key={program.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ border: `2px solid ${LENITY.line}` }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div
                      className="relative h-64 md:h-auto bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${program.image})`,
                        order: index % 2 === 0 ? 1 : 2,
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, rgba(232,69,35,0.8) 0%, rgba(26,26,26,0.8) 100%)`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-24 h-24 text-white opacity-80" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div
                      className="p-8 md:p-10"
                      style={{ order: index % 2 === 0 ? 2 : 1 }}
                    >
                      <span
                        className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                        style={{
                          background: LENITY.yellowSoft,
                          color: LENITY.accent,
                        }}
                      >
                        {t("Program", "कार्यक्रम")} {String(index + 1).padStart(2, "0")}
                      </span>

                      <h2
                        className="text-2xl md:text-3xl font-bold mb-3"
                        style={{ fontFamily: SERIF, color: LENITY.ink }}
                      >
                        {t(program.titleEn, program.titleHi)}
                      </h2>

                      <p
                        className="text-base md:text-lg italic mb-4"
                        style={{ fontFamily: SERIF, color: LENITY.muted }}
                      >
                        {t(program.shortDescEn, program.shortDescHi)}
                      </p>

                      <p className="text-sm leading-relaxed mb-6" style={{ color: LENITY.muted }}>
                        {t(program.descriptionEn, program.descriptionHi)}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <div
                            className="text-2xl font-bold"
                            style={{ fontFamily: SERIF, color: LENITY.accent }}
                          >
                            {program.stats.beneficiaries}
                          </div>
                          <div className="text-xs" style={{ color: LENITY.muted }}>
                            {t("Beneficiaries", "लाभार्थी")}
                          </div>
                        </div>
                        <div>
                          <div
                            className="text-2xl font-bold"
                            style={{ fontFamily: SERIF, color: LENITY.accent }}
                          >
                            {program.stats.years}
                          </div>
                          <div className="text-xs" style={{ color: LENITY.muted }}>
                            {t("Years Active", "वर्ष सक्रिय")}
                          </div>
                        </div>
                        <div>
                          <div
                            className="text-2xl font-bold"
                            style={{ fontFamily: SERIF, color: LENITY.accent }}
                          >
                            {(program.stats as any).villages || (program.stats as any).schools || "N/A"}
                          </div>
                          <div className="text-xs" style={{ color: LENITY.muted }}>
                            {program.id === "marriage" ? t("Villages", "गांव") : t("Schools", "स्कूल")}
                          </div>
                        </div>
                      </div>

                      {/* Objectives (Collapsible) */}
                      <div>
                        <button
                          onClick={() =>
                            setSelectedProgram(isExpanded ? null : program.id)
                          }
                          className="flex items-center justify-between w-full text-left mb-4"
                        >
                          <span
                            className="font-bold text-sm uppercase tracking-wider"
                            style={{ color: LENITY.ink }}
                          >
                            {t("Key Objectives", "मुख्य उद्देश्य")}
                          </span>
                          <ArrowRight
                            className="w-5 h-5 transition-transform duration-300"
                            style={{
                              color: LENITY.accent,
                              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                            }}
                          />
                        </button>

                        <div
                          className="overflow-hidden transition-all duration-500"
                          style={{
                            maxHeight: isExpanded ? "500px" : "0px",
                            opacity: isExpanded ? 1 : 0,
                          }}
                        >
                          <ul className="space-y-3">
                            {program.objectives.map((obj: { en: string; hi: string }, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <Check
                                  className="w-5 h-5 shrink-0 mt-0.5"
                                  style={{ color: LENITY.accent }}
                                />
                                <span className="text-sm" style={{ color: LENITY.muted }}>
                                  {t(obj.en, obj.hi)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-6">
                        <button
                          onClick={() => setDonateOpen(true)}
                          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm text-white transition-all hover:scale-105"
                          style={{ background: LENITY.accent }}
                        >
                          {t("Support This Program", "इस कार्यक्रम का समर्थन करें")}
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-20" style={{ background: LENITY.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText as="h2" settingKey="programs.approach.h2" label="Approach Heading"
              en="Our Approach" hi="हमारा दृष्टिकोण"
              className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
            />
            <EditableText as="p" settingKey="programs.approach.sub" label="Approach Subtext" multiline
              en="How we ensure sustainable impact in every program"
              hi="हम हर कार्यक्रम में स्थायी प्रभाव कैसे सुनिश्चित करते हैं"
              className="text-lg italic max-w-2xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                titleEn: "Community-Led",
                titleHi: "समुदाय के नेतृत्व में",
                descEn: "Programs designed with community participation",
                descHi: "समुदाय की भागीदारी से तैयार कार्यक्रम",
              },
              {
                icon: Heart,
                titleEn: "Dignity First",
                titleHi: "गरिमा पहले",
                descEn: "Ensuring respect and self-worth in all initiatives",
                descHi: "सभी पहलों में सम्मान और आत्म-मूल्य सुनिश्चित करना",
              },
              {
                icon: Users,
                titleEn: "Inclusive",
                titleHi: "समावेशी",
                descEn: "Equal access to all regardless of caste or creed",
                descHi: "जाति या पंथ के बावजूद सभी के लिए समान पहुंच",
              },
              {
                icon: Check,
                titleEn: "Sustainable",
                titleHi: "टिकाऊ",
                descEn: "Long-term solutions, not temporary relief",
                descHi: "अस्थायी राहत नहीं, दीर्घकालिक समाधान",
              },
            ].map((approach, idx) => {
              const Icon = approach.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-2"
                  style={{ border: `1px solid ${LENITY.line}` }}
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: LENITY.yellowSoft }}
                  >
                    <Icon className="w-8 h-8" style={{ color: LENITY.accent }} />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ fontFamily: SERIF, color: LENITY.ink }}
                  >
                    {t(approach.titleEn, approach.titleHi)}
                  </h3>
                  <p className="text-sm" style={{ color: LENITY.muted }}>
                    {t(approach.descEn, approach.descHi)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: LENITY.yellow }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ background: LENITY.accent, filter: "blur(80px)" }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <EditableText as="h2" settingKey="programs.cta.h2" label="CTA Heading"
            en="Join Us in Making a Difference" hi="बदलाव लाने में हमसे जुड़ें"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}
          />
          <EditableText as="p" settingKey="programs.cta.desc" label="CTA Description" multiline
            en="Your support can transform lives. Choose to donate, volunteer, or partner with us."
            hi="आपका समर्थन जीवन बदल सकता है। दान करें, स्वयंसेवक बनें, या हमारे साथ साझेदार बनें।"
            className="text-lg md:text-xl mb-8" style={{ color: LENITY.ink, opacity: 0.9 }}
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-base text-white transition-all hover:scale-105"
              style={{ background: LENITY.accent }}
            >
              {t("Donate Now", "अभी दान करें")}
              <Heart className="w-5 h-5" />
            </button>

            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 border-2"
              style={{ borderColor: LENITY.accent, color: LENITY.accent, background: "white" }}
            >
              {t("Become a Volunteer", "स्वयंसेवक बनें")}
              <UserPlus className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-base transition-all hover:scale-105 border-2"
              style={{ borderColor: LENITY.ink, color: LENITY.ink, background: "white" }}
            >
              {t("Partner With Us", "हमारे साथ साझेदारी करें")}
              <Building2 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </AdminEditProvider>
  );
}
