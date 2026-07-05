"use client";

import { useState } from "react";
import DonationModal from "@/components/DonationModal";
import PremiumHero from "@/components/PremiumHero";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import { useLang } from "@/context/LanguageContext";
import {
  BookOpen, Users, Stethoscope, TreePine, Droplets, Wheat,
  Heart, UserPlus, Building2, Target, Check, ArrowRight
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";
import Link from "next/link";

const programs = [
  {
    id: "education",
    icon: BookOpen,
    titleEn: "Shiksha Seva (Education Service)",
    titleHi: "शिक्षा सेवा",
    shortDescEn: "Empowering underprivileged children through education",
    shortDescHi: "शिक्षा के माध्यम से वंचित बच्चों को सशक्त बनाना",
    descriptionEn:
      "Education is the foundation of a prosperous society. Through our Shiksha Seva program, we provide scholarships, school supplies, uniforms, and tuition support to children from economically disadvantaged families.",
    descriptionHi:
      "शिक्षा समृद्ध समाज की नींव है। हमारे शिक्षा सेवा कार्यक्रम के माध्यम से, हम आर्थिक रूप से वंचित परिवारों के बच्चों को छात्रवृत्ति, स्कूल सामग्री, वर्दी और ट्यूशन सहायता प्रदान करते हैं।",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    stats: { beneficiaries: "500+", years: "10+", schools: "25+" },
    objectives: [
      { en: "Provide scholarships to meritorious students", hi: "मेधावी छात्रों को छात्रवृत्ति प्रदान करना" },
      { en: "Supply books, uniforms, and learning materials", hi: "पुस्तकें, वर्दी और शिक्षण सामग्री की आपूर्ति" },
      { en: "Organize remedial classes and tutoring", hi: "उपचारात्मक कक्षाएं और ट्यूशन आयोजित करना" },
      { en: "Career guidance and skill development", hi: "करियर मार्गदर्शन और कौशल विकास" },
    ],
  },
  {
    id: "environment",
    icon: TreePine,
    titleEn: "Vrikshaaropan (Tree Plantation)",
    titleHi: "वृक्षारोपण",
    shortDescEn: "Creating green cover across West Champaran",
    shortDescHi: "पश्चिम चम्पारण में हरित आवरण बनाना",
    descriptionEn:
      "Our tree plantation drives aim to combat deforestation and climate change. We organize Van Mahotsav celebrations, distribute saplings, and educate communities about environmental conservation.",
    descriptionHi:
      "हमारे वृक्षारोपण अभियान का उद्देश्य वनों की कटाई और जलवायु परिवर्तन से लड़ना है। हम वन महोत्सव समारोह आयोजित करते हैं, पौधे वितरित करते हैं, और पर्यावरण संरक्षण के बारे में समुदायों को शिक्षित करते हैं।",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
    stats: { beneficiaries: "10,000+", years: "15+", villages: "50+" },
    objectives: [
      { en: "Plant native tree species across villages", hi: "गांवों में देशी पेड़ प्रजातियां लगाना" },
      { en: "Create awareness about climate change", hi: "जलवायु परिवर्तन के बारे में जागरूकता पैदा करना" },
      { en: "Maintain and nurture planted trees", hi: "लगाए गए पेड़ों का रखरखाव और पोषण" },
      { en: "Engage youth in environmental activities", hi: "पर्यावरणीय गतिविधियों में युवाओं को शामिल करना" },
    ],
  },
  {
    id: "poverty",
    icon: Users,
    titleEn: "Garib Sahayata (Poverty Relief)",
    titleHi: "गरीब सहायता",
    shortDescEn: "Supporting families in times of need",
    shortDescHi: "जरूरत के समय परिवारों का समर्थन",
    descriptionEn:
      "We provide essential support to underprivileged families including food grains, clothing, blankets, and household items. Our focus is on ensuring basic dignity and survival needs are met.",
    descriptionHi:
      "हम वंचित परिवारों को खाद्यान्न, कपड़े, कंबल और घरेलू सामान सहित आवश्यक सहायता प्रदान करते हैं। हमारा ध्यान बुनियादी गरिमा और जीवित रहने की जरूरतों को पूरा करने पर है।",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
    stats: { beneficiaries: "3,000+", years: "20+", distribution: "Monthly" },
    objectives: [
      { en: "Monthly food grain distribution", hi: "मासिक खाद्यान्न वितरण" },
      { en: "Winter blanket and clothing drives", hi: "शीतकालीन कंबल और कपड़े वितरण" },
      { en: "Emergency financial assistance", hi: "आपातकालीन वित्तीय सहायता" },
      { en: "Livelihood skill training programs", hi: "आजीविका कौशल प्रशिक्षण कार्यक्रम" },
    ],
  },
  {
    id: "health",
    icon: Stethoscope,
    titleEn: "Swasthya Seva (Healthcare Service)",
    titleHi: "स्वास्थ्य सेवा",
    shortDescEn: "Free medical camps and healthcare support",
    shortDescHi: "निःशुल्क चिकित्सा शिविर और स्वास्थ्य सेवा सहायता",
    descriptionEn:
      "We organize regular health camps providing free medical check-ups, medicines, and health education. Our program focuses on preventive care and treatment of common ailments.",
    descriptionHi:
      "हम नियमित स्वास्थ्य शिविर आयोजित करते हैं जो निःशुल्क चिकित्सा जांच, दवाएं और स्वास्थ्य शिक्षा प्रदान करते हैं। हमारा कार्यक्रम निवारक देखभाल और सामान्य बीमारियों के उपचार पर केंद्रित है।",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    stats: { beneficiaries: "5,000+", years: "12+", camps: "100+" },
    objectives: [
      { en: "Free health check-up camps quarterly", hi: "त्रैमासिक निःशुल्क स्वास्थ्य जांच शिविर" },
      { en: "Distribution of free medicines", hi: "निःशुल्क दवाओं का वितरण" },
      { en: "Awareness on hygiene and sanitation", hi: "स्वच्छता और स्वच्छता पर जागरूकता" },
      { en: "Referral services for serious cases", hi: "गंभीर मामलों के लिए रेफरल सेवाएं" },
    ],
  },
  {
    id: "marriage",
    icon: Heart,
    titleEn: "Vivah Sahayata (Marriage Assistance)",
    titleHi: "विवाह सहायता",
    shortDescEn: "Supporting dignified marriages for poor families",
    shortDescHi: "गरीब परिवारों के लिए सम्मानजनक विवाह का समर्थन",
    descriptionEn:
      "We provide financial assistance and logistical support for marriages in underprivileged families, ensuring ceremonies are conducted with dignity and social acceptance.",
    descriptionHi:
      "हम वंचित परिवारों में विवाह के लिए वित्तीय सहायता और लॉजिस्टिक सहायता प्रदान करते हैं, यह सुनिश्चित करते हुए कि समारोह गरिमा और सामाजिक स्वीकृति के साथ आयोजित किए जाएं।",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    stats: { beneficiaries: "200+", years: "8+", support: "Complete" },
    objectives: [
      { en: "Financial assistance for marriage expenses", hi: "विवाह खर्च के लिए वित्तीय सहायता" },
      { en: "Support for widows remarriage", hi: "विधवाओं के पुनर्विवाह के लिए सहायता" },
      { en: "Prevent child marriages through awareness", hi: "जागरूकता के माध्यम से बाल विवाह को रोकना" },
      { en: "Coordination with local communities", hi: "स्थानीय समुदायों के साथ समन्वय" },
    ],
  },
  {
    id: "disaster",
    icon: Droplets,
    titleEn: "Aapada Prabandhan (Disaster Management)",
    titleHi: "आपदा प्रबंधन",
    shortDescEn: "Emergency relief during floods and disasters",
    shortDescHi: "बाढ़ और आपदाओं के दौरान आपातकालीन राहत",
    descriptionEn:
      "Our disaster response team provides immediate relief during floods, earthquakes, and other calamities with food, shelter, medical aid, and rehabilitation support.",
    descriptionHi:
      "हमारी आपदा प्रतिक्रिया टीम बाढ़, भूकंप और अन्य आपदाओं के दौरान भोजन, आश्रय, चिकित्सा सहायता और पुनर्वास सहायता के साथ तत्काल राहत प्रदान करती है।",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    stats: { beneficiaries: "2,000+", years: "15+", operations: "50+" },
    objectives: [
      { en: "Immediate relief materials distribution", hi: "तत्काल राहत सामग्री वितरण" },
      { en: "Temporary shelter arrangements", hi: "अस्थायी आश्रय व्यवस्था" },
      { en: "Medical emergency response teams", hi: "चिकित्सा आपातकालीन प्रतिक्रिया टीम" },
      { en: "Long-term rehabilitation programs", hi: "दीर्घकालिक पुनर्वास कार्यक्रम" },
    ],
  },
  {
    id: "women-child",
    icon: UserPlus,
    titleEn: "Mahila Bal Kalyan (Women & Child Welfare)",
    titleHi: "महिला बाल कल्याण",
    shortDescEn: "Empowering women and protecting children",
    shortDescHi: "महिलाओं को सशक्त बनाना और बच्चों की रक्षा करना",
    descriptionEn:
      "Dedicated programs for women empowerment through skill training, self-help groups, and child protection initiatives including nutrition, education, and safety.",
    descriptionHi:
      "कौशल प्रशिक्षण, स्वयं सहायता समूहों और पोषण, शिक्षा और सुरक्षा सहित बाल संरक्षण पहलों के माध्यम से महिला सशक्तिकरण के लिए समर्पित कार्यक्रम।",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
    stats: { beneficiaries: "1,500+", years: "10+", groups: "40+" },
    objectives: [
      { en: "Vocational training for women", hi: "महिलाओं के लिए व्यावसायिक प्रशिक्षण" },
      { en: "Self-help group formation", hi: "स्वयं सहायता समूह गठन" },
      { en: "Nutrition programs for children", hi: "बच्चों के लिए पोषण कार्यक्रम" },
      { en: "Awareness on women's rights", hi: "महिलाओं के अधिकारों पर जागरूकता" },
    ],
  },
  {
    id: "employment",
    icon: Building2,
    titleEn: "Rojgar Sahayata (Employment Assistance)",
    titleHi: "रोजगार सहायता",
    shortDescEn: "Career guidance and job placement support",
    shortDescHi: "करियर मार्गदर्शन और नौकरी प्लेसमेंट सहायता",
    descriptionEn:
      "We provide free career counseling, skill development workshops, and job placement assistance to help youth and adults secure dignified employment opportunities.",
    descriptionHi:
      "हम युवाओं और वयस्कों को सम्मानजनक रोजगार के अवसर सुरक्षित करने में मदद करने के लिए निःशुल्क करियर परामर्श, कौशल विकास कार्यशालाएं और नौकरी प्लेसमेंट सहायता प्रदान करते हैं।",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    stats: { beneficiaries: "800+", years: "6+", placements: "400+" },
    objectives: [
      { en: "Free career counseling sessions", hi: "निःशुल्क करियर परामर्श सत्र" },
      { en: "Skill development workshops", hi: "कौशल विकास कार्यशालाएं" },
      { en: "Job fairs and recruitment drives", hi: "जॉब फेयर और भर्ती अभियान" },
      { en: "Entrepreneurship training", hi: "उद्यमिता प्रशिक्षण" },
    ],
  },
];

export default function ProgramsContent({ settings = {} }: { settings?: Record<string, { en: string; hi: string }> }) {
  const { t } = useLang();
  const [donateOpen, setDonateOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <AdminEditProvider initialValues={settings}>
    <>
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
                            {Object.values(program.stats)[2]}
                          </div>
                          <div className="text-xs" style={{ color: LENITY.muted }}>
                            {Object.keys(program.stats)[2]
                              .split(/(?=[A-Z])/)
                              .join(" ")}
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
                            {program.objectives.map((obj, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <Check
                                  className="w-5 h-5 flex-shrink-0 mt-0.5"
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
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: SERIF, color: LENITY.ink }}
            >
              <EditableText as="span" settingKey="programs.approach.h2" label="Approach Heading"
                en="Our Approach" hi="हमारा दृष्टिकोण" />
            </h2>
            <p
              className="text-lg italic max-w-2xl mx-auto"
              style={{ fontFamily: SERIF, color: LENITY.muted }}
            >
              <EditableText as="span" settingKey="programs.approach.lead" label="Approach Lead" multiline
                en="How we ensure sustainable impact in every program"
                hi="हम हर कार्यक्रम में स्थायी प्रभाव कैसे सुनिश्चित करते हैं" />
            </p>
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
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: SERIF, color: LENITY.ink }}
          >
            <EditableText as="span" settingKey="programs.cta.h2" label="CTA Heading"
              en="Join Us in Making a Difference" hi="बदलाव लाने में हमसे जुड़ें" />
          </h2>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: LENITY.ink, opacity: 0.9 }}
          >
            <EditableText as="span" settingKey="programs.cta.p" label="CTA Text" multiline
              en="Your support can transform lives. Choose to donate, volunteer, or partner with us."
              hi="आपका समर्थन जीवन बदल सकता है। दान करें, स्वयंसेवक बनें, या हमारे साथ साझेदार बनें।" />
          </p>

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

    </>
    </AdminEditProvider>
  );
}
