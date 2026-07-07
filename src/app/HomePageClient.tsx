"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DonationModal from "@/components/DonationModal";
import HeroSlider from "@/components/HeroSlider";
import type { SlideOverride } from "@/components/HeroSlider";
import StickyQRDonate from "@/components/StickyQRDonate";
import HorizontalCardSlider from "@/components/HorizontalCardSlider";
import MarqueeText from "@/components/MarqueeText";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ProgramsGrid from "@/components/ProgramsGrid";
import LogoCarousel from "@/components/LogoCarousel";
import PremiumStorySection from "@/components/PremiumStorySection";
import AdminEditProvider from "@/components/AdminEditProvider";
import EditableText from "@/components/EditableText";
import EditableImage from "@/components/EditableImage";
import { useLang } from "@/context/LanguageContext";
import {
  TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight, Quote, Heart, type LucideIcon,
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

export type HomeSettings = Record<string, { en: string; hi: string }>;
export type HomeServiceData = { id: number; iconName: string; titleEn: string; titleHi: string; descEn: string; descHi: string };
export type HomeCampaignData = { id: number; titleEn: string; titleHi: string; raised: number; goal: number; backers: number };
export type HomeBlogPostData = { id: number; category: string; date: string; titleEn: string; titleHi: string; excerptEn: string; excerptHi: string; img: string | null };
export type HomeFuturePlanData = { id: number; titleEn: string; titleHi: string; year: string; descEn: string; descHi: string };

const ICONS: Record<string, LucideIcon> = { Heart, TreePine, Users, Stethoscope, BookOpen, Droplets, Wheat };
const iconFor = (name: string): LucideIcon => ICONS[name] ?? Heart;

const IMG = {
  hero:     "/images/marriage/marriage1.jpeg",
  slide2:   "/images/marriage/marriage2.jpeg",
  slide3:   "/images/marriage/marriage3.jpeg",
  slide4:   "/images/marriage/marriage4.jpeg",
  portrait1:"/images/marriage/marriage5.jpeg",
  quote:    "/images/marriage/marriage7.jpeg",
  avatar:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
  svc: [
    "/images/marriage/marriage2.jpeg",
    "/images/marriage/marriage4.jpeg",
    "/images/marriage/marriage7.jpeg",
  ],
};

/** Resolve a setting key from DB, falling back to a hardcoded default. */
function s(settings: HomeSettings, key: string, fallbackEn: string, fallbackHi: string) {
  const row = settings[key];
  return { en: row?.en || fallbackEn, hi: row?.hi || fallbackHi };
}

/** Used only if the DB has no HomeService rows yet (e.g. DB not ready). */
const DEFAULT_SERVICES: HomeServiceData[] = [
  { id: -1, iconName: "BookOpen",    titleEn: "Shiksha Seva",      titleHi: "शिक्षा सेवा",      descEn: "Supporting education for underprivileged children through scholarships and learning materials.", descHi: "जरूरतमंद बच्चों की शिक्षा में सहयोग।" },
  { id: -2, iconName: "TreePine",    titleEn: "Vrikshaaropan",     titleHi: "वृक्षारोपण",       descEn: "Large-scale tree plantation drives to green the region across West Champaran.", descHi: "क्षेत्र को हरा-भरा बनाने हेतु वृक्षारोपण अभियान।" },
  { id: -3, iconName: "Users",       titleEn: "Garib Sahayata",    titleHi: "गरीब सहायता",     descEn: "Food, clothing, and essentials to underprivileged and disaster-affected families.", descHi: "जरूरतमंद परिवारों को भोजन, वस्त्र और आवश्यक सामान।" },
  { id: -4, iconName: "Stethoscope", titleEn: "Swasthya Seva",     titleHi: "स्वास्थ्य सेवा",   descEn: "Free health camps and medical assistance for rural low-income communities.", descHi: "ग्रामीण समुदायों हेतु नि:शुल्क स्वास्थ्य शिविर।" },
  { id: -5, iconName: "Users",       titleEn: "Vivah Sahayata",    titleHi: "विवाह सहायता",     descEn: "Marriage assistance for underprivileged families and widow support programs.", descHi: "जरूरतमंद परिवारों के लिए विवाह सहायता कार्यक्रम।" },
  { id: -6, iconName: "Droplets",    titleEn: "Aapada Prabandhan", titleHi: "आपदा प्रबंधन",      descEn: "Emergency relief during floods, disasters, and crisis situations.", descHi: "बाढ़, आपदा और संकट की स्थितियों में आपातकालीन राहत।" },
  { id: -7, iconName: "Users",       titleEn: "Mahila Bal Kalyan", titleHi: "महिला बाल कल्याण",  descEn: "Women empowerment and child welfare programs for vulnerable communities.", descHi: "महिला सशक्तिकरण और बाल कल्याण कार्यक्रम।" },
  { id: -8, iconName: "BookOpen",    titleEn: "Rojgar Sahayata",   titleHi: "रोजगार सहायता",    descEn: "Free career guidance, skill training, and employment support programs.", descHi: "नि:शुल्क करियर मार्गदर्शन और रोजगार सहायता।" },
];

/** Used only if the DB has no HomeCampaign rows yet (e.g. DB not ready). */
const DEFAULT_CAMPAIGNS: HomeCampaignData[] = [
  { id: -1, titleEn: "Clean Water for 50 Villages", titleHi: "50 गांवों में स्वच्छ जल", raised: 85000, goal: 100000, backers: 42 },
  { id: -2, titleEn: "10,000 Trees This Monsoon",   titleHi: "इस मानसून 10,000 पेड़",  raised: 32000, goal: 50000,  backers: 118 },
  { id: -3, titleEn: "Winter Relief Drive",          titleHi: "शीतकालीन राहत अभियान",  raised: 18500, goal: 30000,  backers: 67 },
];

const pillars = [
  { icon: BookOpen,    en: "Education",  hi: "शिक्षा",   descEn: "Supporting children's education", descHi: "बच्चों की शिक्षा में सहयोग" },
  { icon: Droplets,    en: "Water",      hi: "जल",       descEn: "Clean water access for all",      descHi: "सभी के लिए स्वच्छ जल" },
  { icon: Wheat,       en: "Food",       hi: "अन्न",      descEn: "No one sleeps hungry",           descHi: "कोई भूखा न सोए" },
  { icon: Stethoscope, en: "Healthcare", hi: "स्वास्थ्य", descEn: "Free medical assistance",        descHi: "नि:शुल्क चिकित्सा सहायता" },
];

/* ── Scroll fade ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

/* ── Animated counter ── */
function Counter({ target }: { target: string }) {
  const [val, setVal] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const sfx = target.replace(/[0-9]/g, "");
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      let tick = 0; const total = 70;
      const id = setInterval(() => {
        tick++;
        setVal(Math.round((tick / total) * num) + sfx);
        if (tick >= total) { setVal(target); clearInterval(id); }
      }, 20);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: LENITY.ink }}>
      <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
      {children}
    </span>
  );
}

function NumberedSection({ num, label, children, alt = false }:
  { num: string; label: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section className="py-20 lg:py-28" style={{ background: alt ? LENITY.soft : LENITY.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 lg:gap-12">
          <div className="flex flex-col items-center shrink-0 pt-2">
            <span className="pai-number">{num}</span>
            <span className="pai-vlabel mt-4 hidden lg:block">{label}</span>
          </div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE CLIENT COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function HomePageClient({
  settings,
  services: dbServices,
  campaigns: dbCampaigns,
  blogPosts: dbBlogPosts = [],
  futurePlans = [],
}: {
  settings: HomeSettings;
  services: HomeServiceData[];
  campaigns: HomeCampaignData[];
  blogPosts?: HomeBlogPostData[];
  futurePlans?: HomeFuturePlanData[];
}) {
  const [donateOpen, setDonateOpen] = useState(false);
  const { t } = useLang();
  const openDonate = () => setDonateOpen(true);

  const services = dbServices.length ? dbServices : DEFAULT_SERVICES;
  const whatsappGroupLink = settings["whatsapp.groupLink"]?.en;

  // Resolve all content from DB settings with hardcoded fallbacks
  const c = {
    hero: {
      eyebrow: s(settings, "home.hero.eyebrow", "Hariwatika Sewa Samiti", "हरिवाटिका सेवा समिति"),
      line1:   s(settings, "home.hero.line1",   "A Relentless", "अटूट"),
      line2:   s(settings, "home.hero.line2",   "Pursuit.", "सेवा।"),
      tagline: s(settings, "home.hero.tagline", "Bringing dignity, healthcare, and lasting change to families across Bihar.", "बिहार के परिवारों को सम्मान, स्वास्थ्य और स्थायी बदलाव देने का संकल्प।"),
      sub:     s(settings, "home.hero.sub",     "For over 25 years Hariwatika has planted forests, provided healthcare, and stood with the poor across West Champaran.", "25 वर्षों से हरिवाटिका ने पश्चिम चम्पारण में वृक्षारोपण, स्वास्थ्य सेवा और गरीब सहायता की है।"),
    },
    about: {
      h2:   s(settings, "home.about.h2",   "Consistent Service", "निरंतर सेवा"),
      lead: s(settings, "home.about.lead", "A quarter-century of compassion. What does it mean to you?", "एक चौथाई सदी की करुणा। आपके लिए इसका क्या अर्थ है?"),
      p1:   s(settings, "home.about.p1",   "For more than 25 years, Hariwatika has been resolute in our goal to expand dignity and opportunity to families who need it most.", "25 वर्षों से हरिवाटिका उन परिवारों तक सम्मान और अवसर पहुँचाने में दृढ़ रहा है।"),
      p2:   s(settings, "home.about.p2",   "That means more families than ever have access to healthcare, education, and relief.", "इसका अर्थ है कि पहले से कहीं अधिक परिवारों को स्वास्थ्य, शिक्षा और राहत तक पहुँच है।"),
      more: s(settings, "home.about.more", "Read More", "और पढ़ें"),
    },
    quote: {
      text:   s(settings, "home.quote.text",   "Together with our partners, we are working toward a community where every child gets an education, every family has clean water, and high-quality, effective and affordable care reaches everyone.", "अपने सहयोगियों के साथ, हम ऐसे समाज की ओर काम कर रहे हैं।"),
      who:    s(settings, "home.quote.who",    "— Samiti Patron, Hariwatika Shiv Mandir", "— संरक्षक, हरिवाटिका शिव मंदिर समिति"),
      donate: s(settings, "home.quote.donate", "Donate Today", "आज दान करें"),
    },
    challenges: {
      h2:   s(settings, "home.challenges.h2",   "Challenges & Solutions", "चुनौतियाँ और समाधान"),
      lead: s(settings, "home.challenges.lead", "A relentless drive to expand dignity and care across West Champaran.", "पश्चिम चम्पारण में सम्मान और सेवा बढ़ाने का अटूट प्रयास।"),
    },
    services: {
      h2:   s(settings, "home.services.h2",   "What We Do", "हम क्या करते हैं"),
      lead: s(settings, "home.services.lead", "Four pillars of seva that have changed thousands of lives.", "सेवा के चार स्तम्भ जिन्होंने हज़ारों जीवन बदले।"),
    },
    campaigns: {
      h2:   s(settings, "home.campaigns.h2",   "Active Campaigns", "सक्रिय अभियान"),
      lead: s(settings, "home.campaigns.lead", "Support ongoing campaigns and help us reach our goals.", "चल रहे अभियानों का समर्थन करें।"),
      btn:  s(settings, "home.campaigns.btn",  "Support This Campaign", "इस अभियान का साथ दें"),
    },
    blog: {
      h2:   s(settings, "home.blog.h2",   "News & Updates", "समाचार और अपडेट"),
      lead: s(settings, "home.blog.lead", "Stories of impact and hope from the field.", "क्षेत्र से प्रभाव और आशा की कहानियाँ।"),
      all:  s(settings, "home.blog.all",  "View All", "सब देखें"),
      more: s(settings, "home.blog.more", "Read More", "और पढ़ें"),
    },
  };

  const stats = [
    { value: "25+",    ...s(settings, "home.stat.0", "Years of Service", "सेवा के वर्ष") },
    { value: "5000+",  ...s(settings, "home.stat.1", "Families Helped",  "परिवारों की मदद") },
    { value: "10000+", ...s(settings, "home.stat.2", "Trees Planted",    "वृक्ष लगाए") },
    { value: "200+",   ...s(settings, "home.stat.3", "Volunteers Trained","स्वयंसेवक प्रशिक्षित") },
  ];

  const campaigns = dbCampaigns.length ? dbCampaigns : DEFAULT_CAMPAIGNS;

  // Fallback used only if the DB has no published blog posts yet.
  const DEFAULT_BLOG: HomeBlogPostData[] = [
    { id: -1, date: "15 Dec 2024", category: "Education",   img: IMG.svc[0], titleEn: "150 Children Receive School Scholarships This Year", titleHi: "इस वर्ष 150 बच्चों को स्कूल छात्रवृत्ति मिली", excerptEn: "Hariwatika's education drive reached 150 underprivileged children with scholarships.", excerptHi: "हरिवाटिका के शिक्षा अभियान ने 150 जरूरतमंद बच्चों को छात्रवृत्ति दी।" },
    { id: -2, date: "05 Nov 2024", category: "Environment", img: IMG.svc[1], titleEn: "Van Mahotsav: 2000 Saplings Planted in West Champaran", titleHi: "वन महोत्सव: पश्चिम चम्पारण में 2000 पौधे लगाए", excerptEn: "Volunteers planted 2000 saplings across Bettiah and surrounding villages.", excerptHi: "स्वयंसेवकों ने बेतिया और आसपास के गांवों में 2000 पौधे लगाए।" },
    { id: -3, date: "20 Oct 2024", category: "Relief",      img: IMG.svc[2], titleEn: "Winter Blanket Distribution Reaches 500 Families", titleHi: "शीतकालीन कंबल वितरण 500 परिवारों तक पहुँचा", excerptEn: "Our team distributed warm blankets to 500 underprivileged families.", excerptHi: "ठंड में हमारी टीम ने 500 जरूरतमंद परिवारों को गर्म कंबल बाँटे।" },
  ];
  const blogPosts = dbBlogPosts.length ? dbBlogPosts : DEFAULT_BLOG;

  // ── Hero slide overrides — each field is an EditableText/EditableImage node ──
  const heroOverrides: Record<number, SlideOverride> = {
    0: {
      image:       <EditableImage settingKey="home.hero.img.0" src={settings["home.hero.img.0"]?.en || IMG.hero}    alt="Hero slide 1" aspectRatio="4/3" className="w-full h-full object-cover" />,
      eyebrow:     <EditableText settingKey="home.hero.eyebrow.0"  label="Slide 1 — Eyebrow"      en={s(settings,"home.hero.eyebrow.0","Hariwatika Sewa Samiti","हरिवाटिका सेवा समिति").en}  hi={s(settings,"home.hero.eyebrow.0","Hariwatika Sewa Samiti","हरिवाटिका सेवा समिति").hi} />,
      line1:       <EditableText settingKey="home.hero.line1.0"    label="Slide 1 — Headline 1"   en={s(settings,"home.hero.line1.0","A Relentless","अटूट").en}       hi={s(settings,"home.hero.line1.0","A Relentless","अटूट").hi} />,
      line2:       <EditableText settingKey="home.hero.line2.0"    label="Slide 1 — Headline 2"   en={s(settings,"home.hero.line2.0","Pursuit.","सेवा।").en}           hi={s(settings,"home.hero.line2.0","Pursuit.","सेवा।").hi} />,
      tagline:     <EditableText settingKey="home.hero.tagline.0"  label="Slide 1 — Tagline"      multiline en={s(settings,"home.hero.tagline.0","Bringing dignity, healthcare, and lasting change to families across Bihar.","बिहार के परिवारों को सम्मान, स्वास्थ्य और स्थायी बदलाव देने का संकल्प।").en} hi={s(settings,"home.hero.tagline.0","Bringing dignity, healthcare, and lasting change to families across Bihar.","बिहार के परिवारों को सम्मान, स्वास्थ्य और स्थायी बदलाव देने का संकल्प।").hi} />,
      description: <EditableText settingKey="home.hero.desc.0"     label="Slide 1 — Description"  multiline en={s(settings,"home.hero.desc.0","For over 25 years Hariwatika has planted forests, provided healthcare, and stood with the poor across West Champaran.","25 वर्षों से हरिवाटिका ने पश्चिम चम्पारण में वृक्षारोपण, स्वास्थ्य सेवा और गरीब सहायता की है।").en} hi={s(settings,"home.hero.desc.0","For over 25 years Hariwatika has planted forests, provided healthcare, and stood with the poor across West Champaran.","25 वर्षों से हरिवाटिका ने पश्चिम चम्पारण में वृक्षारोपण, स्वास्थ्य सेवा और गरीब सहायता की है।").hi} />,
      cta1:        <EditableText settingKey="home.hero.cta1.0"     label="Slide 1 — CTA Primary"   en={s(settings,"home.hero.cta1.0","Donate Now","दान करें").en}    hi={s(settings,"home.hero.cta1.0","Donate Now","दान करें").hi} />,
      cta2:        <EditableText settingKey="home.hero.cta2.0"     label="Slide 1 — CTA Secondary" en={s(settings,"home.hero.cta2.0","Our Work","हमारा काम").en}  hi={s(settings,"home.hero.cta2.0","Our Work","हमारा काम").hi} />,
    },
    1: {
      image:       <EditableImage settingKey="home.hero.img.1" src={settings["home.hero.img.1"]?.en || IMG.slide2}  alt="Hero slide 2" aspectRatio="4/3" className="w-full h-full object-cover" />,
      eyebrow:     <EditableText settingKey="home.hero.eyebrow.1"  label="Slide 2 — Eyebrow"      en={s(settings,"home.hero.eyebrow.1","Green Initiative","हरित पहल").en}             hi={s(settings,"home.hero.eyebrow.1","Green Initiative","हरित पहल").hi} />,
      line1:       <EditableText settingKey="home.hero.line1.1"    label="Slide 2 — Headline 1"   en={s(settings,"home.hero.line1.1","Planting","कल का").en}                          hi={s(settings,"home.hero.line1.1","Planting","कल का").hi} />,
      line2:       <EditableText settingKey="home.hero.line2.1"    label="Slide 2 — Headline 2"   en={s(settings,"home.hero.line2.1","Tomorrow.","रोपण।").en}                         hi={s(settings,"home.hero.line2.1","Tomorrow.","रोपण।").hi} />,
      tagline:     <EditableText settingKey="home.hero.tagline.1"  label="Slide 2 — Tagline"      multiline en={s(settings,"home.hero.tagline.1","Creating a greener future through large-scale tree plantation across West Champaran.","पश्चिम चम्पारण में वृहद वृक्षारोपण के माध्यम से हरित भविष्य का निर्माण।").en} hi={s(settings,"home.hero.tagline.1","Creating a greener future through large-scale tree plantation across West Champaran.","पश्चिम चम्पारण में वृहद वृक्षारोपण के माध्यम से हरित भविष्य का निर्माण।").hi} />,
      description: <EditableText settingKey="home.hero.desc.1"     label="Slide 2 — Description"  multiline en={s(settings,"home.hero.desc.1","Over 10,000 trees planted with participation from volunteers, students, and community members.","स्वयंसेवकों, छात्रों और समुदाय के सदस्यों की भागीदारी से 10,000 से अधिक वृक्ष रोपित किए गए।").en} hi={s(settings,"home.hero.desc.1","Over 10,000 trees planted with participation from volunteers, students, and community members.","स्वयंसेवकों, छात्रों और समुदाय के सदस्यों की भागीदारी से 10,000 से अधिक वृक्ष रोपित किए गए।").hi} />,
      cta1:        <EditableText settingKey="home.hero.cta1.1"     label="Slide 2 — CTA Primary"   en={s(settings,"home.hero.cta1.1","Donate Now","दान करें").en}    hi={s(settings,"home.hero.cta1.1","Donate Now","दान करें").hi} />,
      cta2:        <EditableText settingKey="home.hero.cta2.1"     label="Slide 2 — CTA Secondary" en={s(settings,"home.hero.cta2.1","Our Work","हमारा काम").en}  hi={s(settings,"home.hero.cta2.1","Our Work","हमारा काम").hi} />,
    },
    2: {
      image:       <EditableImage settingKey="home.hero.img.2" src={settings["home.hero.img.2"]?.en || IMG.slide3}  alt="Hero slide 3" aspectRatio="4/3" className="w-full h-full object-cover" />,
      eyebrow:     <EditableText settingKey="home.hero.eyebrow.2"  label="Slide 3 — Eyebrow"      en={s(settings,"home.hero.eyebrow.2","Community Relief","समुदाय राहत").en}          hi={s(settings,"home.hero.eyebrow.2","Community Relief","समुदाय राहत").hi} />,
      line1:       <EditableText settingKey="home.hero.line1.2"    label="Slide 3 — Headline 1"   en={s(settings,"home.hero.line1.2","Standing","परिवारों").en}                        hi={s(settings,"home.hero.line1.2","Standing","परिवारों").hi} />,
      line2:       <EditableText settingKey="home.hero.line2.2"    label="Slide 3 — Headline 2"   en={s(settings,"home.hero.line2.2","Together.","के साथ।").en}                       hi={s(settings,"home.hero.line2.2","Together.","के साथ।").hi} />,
      tagline:     <EditableText settingKey="home.hero.tagline.2"  label="Slide 3 — Tagline"      multiline en={s(settings,"home.hero.tagline.2","Supporting 5000+ families with food, clothing, and essentials throughout the year.","साल भर 5000+ परिवारों को भोजन, वस्त्र और आवश्यक सामान के साथ सहायता।").en} hi={s(settings,"home.hero.tagline.2","Supporting 5000+ families with food, clothing, and essentials throughout the year.","साल भर 5000+ परिवारों को भोजन, वस्त्र और आवश्यक सामान के साथ सहायता।").hi} />,
      description: <EditableText settingKey="home.hero.desc.2"     label="Slide 3 — Description"  multiline en={s(settings,"home.hero.desc.2","Providing relief to underprivileged and disaster-affected families across West Champaran.","पश्चिम चम्पारण में जरूरतमंद और आपदा प्रभावित परिवारों को सम्मान और करुणा के साथ राहत।").en} hi={s(settings,"home.hero.desc.2","Providing relief to underprivileged and disaster-affected families across West Champaran.","पश्चिम चम्पारण में जरूरतमंद और आपदा प्रभावित परिवारों को सम्मान और करुणा के साथ राहत।").hi} />,
      cta1:        <EditableText settingKey="home.hero.cta1.2"     label="Slide 3 — CTA Primary"   en={s(settings,"home.hero.cta1.2","Donate Now","दान करें").en}    hi={s(settings,"home.hero.cta1.2","Donate Now","दान करें").hi} />,
      cta2:        <EditableText settingKey="home.hero.cta2.2"     label="Slide 3 — CTA Secondary" en={s(settings,"home.hero.cta2.2","Our Work","हमारा काम").en}  hi={s(settings,"home.hero.cta2.2","Our Work","हमारा काम").hi} />,
    },
    3: {
      image:       <EditableImage settingKey="home.hero.img.3" src={settings["home.hero.img.3"]?.en || IMG.slide4}  alt="Hero slide 4" aspectRatio="4/3" className="w-full h-full object-cover" />,
      eyebrow:     <EditableText settingKey="home.hero.eyebrow.3"  label="Slide 4 — Eyebrow"      en={s(settings,"home.hero.eyebrow.3","Healthcare Services","स्वास्थ्य सेवाएं").en}   hi={s(settings,"home.hero.eyebrow.3","Healthcare Services","स्वास्थ्य सेवाएं").hi} />,
      line1:       <EditableText settingKey="home.hero.line1.3"    label="Slide 4 — Headline 1"   en={s(settings,"home.hero.line1.3","Healing","सेवा में").en}                         hi={s(settings,"home.hero.line1.3","Healing","सेवा में").hi} />,
      line2:       <EditableText settingKey="home.hero.line2.3"    label="Slide 4 — Headline 2"   en={s(settings,"home.hero.line2.3","Communities.","समर्पण।").en}                    hi={s(settings,"home.hero.line2.3","Communities.","समर्पण।").hi} />,
      tagline:     <EditableText settingKey="home.hero.tagline.3"  label="Slide 4 — Tagline"      multiline en={s(settings,"home.hero.tagline.3","Free health camps and medical assistance for rural low-income communities.","ग्रामीण निम्न आय समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।").en} hi={s(settings,"home.hero.tagline.3","Free health camps and medical assistance for rural low-income communities.","ग्रामीण निम्न आय समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।").hi} />,
      description: <EditableText settingKey="home.hero.desc.3"     label="Slide 4 — Description"  multiline en={s(settings,"home.hero.desc.3","Organizing regular health camps with doctors and volunteers providing essential medical care.","जरूरतमंदों को आवश्यक चिकित्सा देखभाल और दवाएं प्रदान करने वाले डॉक्टरों के साथ नियमित स्वास्थ्य शिविर।").en} hi={s(settings,"home.hero.desc.3","Organizing regular health camps with doctors and volunteers providing essential medical care.","जरूरतमंदों को आवश्यक चिकित्सा देखभाल और दवाएं प्रदान करने वाले डॉक्टरों के साथ नियमित स्वास्थ्य शिविर।").hi} />,
      cta1:        <EditableText settingKey="home.hero.cta1.3"     label="Slide 4 — CTA Primary"   en={s(settings,"home.hero.cta1.3","Donate Now","दान करें").en}    hi={s(settings,"home.hero.cta1.3","Donate Now","दान करें").hi} />,
      cta2:        <EditableText settingKey="home.hero.cta2.3"     label="Slide 4 — CTA Secondary" en={s(settings,"home.hero.cta2.3","Our Work","हमारा काम").en}  hi={s(settings,"home.hero.cta2.3","Our Work","हमारा काम").hi} />,
    },
  };

  return (
    <AdminEditProvider initialValues={settings}>
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} whatsappGroupLink={whatsappGroupLink} />
      <StickyQRDonate />

      {/* HERO SLIDER */}
      <HeroSlider onDonate={openDonate} overrides={heroOverrides} />

      {/* MARQUEE */}
      <div style={{ background: LENITY.accent, padding: "1rem 0" }}>
        <MarqueeText
          texts={[
            <EditableText key="m0" settingKey="home.marquee.0" label="Marquee 1" en={s(settings,"home.marquee.0","HARIWATIKA SEWA SAMITI","हरिवाटिका सेवा समिति").en} hi={s(settings,"home.marquee.0","HARIWATIKA SEWA SAMITI","हरिवाटिका सेवा समिति").hi} />,
            "✦",
            <EditableText key="m1" settingKey="home.marquee.1" label="Marquee 2" en={s(settings,"home.marquee.1","25 YEARS OF SERVICE","25 वर्षों की सेवा").en} hi={s(settings,"home.marquee.1","25 YEARS OF SERVICE","25 वर्षों की सेवा").hi} />,
            "✦",
            <EditableText key="m2" settingKey="home.marquee.2" label="Marquee 3" en={s(settings,"home.marquee.2","TRANSFORMING LIVES","जीवन बदलना").en} hi={s(settings,"home.marquee.2","TRANSFORMING LIVES","जीवन बदलना").hi} />,
            "✦",
            <EditableText key="m3" settingKey="home.marquee.3" label="Marquee 4" en={s(settings,"home.marquee.3","BUILDING COMMUNITIES","समुदाय बनाना").en} hi={s(settings,"home.marquee.3","BUILDING COMMUNITIES","समुदाय बनाना").hi} />,
            "✦",
          ]}
          speed={40} direction="left"
          textClassName="text-white text-lg md:text-xl font-bold tracking-wider"
        />
      </div>

      {/* MISSION & VISION */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-16">
            <Eyebrow>
              <EditableText settingKey="home.mission.eyebrow" label="Mission Section Eyebrow" en="Our Purpose" hi="हमारा उद्देश्य" />
            </Eyebrow>
            <EditableText as="h2" settingKey="home.mission.h2" label="Mission Section Heading" en="Mission & Vision" hi="मिशन और विज़न"
              className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
          </Fade>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Fade>
              <div className="bg-white rounded-2xl border p-8 md:p-10 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <EditableText as="h3" settingKey="home.mission.card.h3" label="Mission Card Title" en="Our Mission" hi="हमारा मिशन"
                  className="text-2xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText
                  as="p"
                  settingKey="home.mission.text"
                  label="Mission Text"
                  multiline
                  en="At Hariwatika Sewa Samiti, our mission is simple yet profound: to provide assistance and support to those in need. We believe every person deserves the opportunity to lead a dignified life, free from the burdens of poverty and hardship."
                  hi="हरिवाटिका सेवा समिति में, हमारा मिशन सरल लेकिन गहरा है: जरूरतमंदों को सहायता और समर्थन प्रदान करना। हम मानते हैं कि हर व्यक्ति गरिमापूर्ण जीवन जीने का हकदार है।"
                  className="text-[15px] leading-relaxed"
                  style={{ color: LENITY.muted }}
                />
              </div>
            </Fade>
            <Fade>
              <div className="bg-white rounded-2xl border p-8 md:p-10 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <EditableText as="h3" settingKey="home.vision.card.h3" label="Vision Card Title" en="Our Vision" hi="हमारी दृष्टि"
                  className="text-2xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText
                  as="p"
                  settingKey="home.vision.text"
                  label="Vision Text"
                  multiline
                  en="We envision a society where every individual has access to the resources and support they need to thrive. By bridging gaps in healthcare, education, and social welfare, we aspire to build a future where everyone can achieve their full potential."
                  hi="हम एक ऐसे समाज की कल्पना करते हैं जहाँ प्रत्येक व्यक्ति के पास वे संसाधन और समर्थन हो जो उन्हें फलने-फूलने की आवश्यकता है।"
                  className="text-[15px] leading-relaxed"
                  style={{ color: LENITY.muted }}
                />
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* PREMIUM STORY SECTION */}
      <PremiumStorySection
        eyebrow={<EditableText settingKey="home.impact.eyebrow" label="Impact Eyebrow" en={s(settings,"home.impact.eyebrow","Impact Stories","प्रभाव की कहानियाँ").en} hi={s(settings,"home.impact.eyebrow","Impact Stories","प्रभाव की कहानियाँ").hi} />}
        heading={<EditableText settingKey="home.impact.heading" label="Impact Heading" en={s(settings,"home.impact.heading","Transforming Lives, One Story at a Time","एक समय में एक जीवन बदलना").en} hi={s(settings,"home.impact.heading","Transforming Lives, One Story at a Time","एक समय में एक जीवन बदलना").hi} />}
        description={<EditableText settingKey="home.impact.desc" label="Impact Description" multiline en={s(settings,"home.impact.desc","Real stories from real people whose lives have been touched by our work.","वास्तविक लोगों की वास्तविक कहानियाँ जिनके जीवन हमारे काम से छुए गए हैं।").en} hi={s(settings,"home.impact.desc","Real stories from real people whose lives have been touched by our work.","वास्तविक लोगों की वास्तविक कहानियाँ जिनके जीवन हमारे काम से छुए गए हैं।").hi} />}
        cards={[
          { id: "story-1", number: "01",
            title: <EditableText settingKey="home.impact.story.0.title" label="Story 1 Title" en={s(settings,"home.impact.story.0.title","Education Transforms Communities","शिक्षा समुदायों को बदलती है").en} hi={s(settings,"home.impact.story.0.title","Education Transforms Communities","शिक्षा समुदायों को बदलती है").hi} />,
            description: <EditableText settingKey="home.impact.story.0.desc" label="Story 1 Description" multiline en={s(settings,"home.impact.story.0.desc","Through our Shiksha Seva program, over 500 underprivileged children have received quality education.","हमारे शिक्षा सेवा कार्यक्रम के माध्यम से, 500 से अधिक वंचित बच्चों को गुणवत्तापूर्ण शिक्षा मिली है।").en} hi={s(settings,"home.impact.story.0.desc","Through our Shiksha Seva program, over 500 underprivileged children have received quality education.","हमारे शिक्षा सेवा कार्यक्रम के माध्यम से, 500 से अधिक वंचित बच्चों को गुणवत्तापूर्ण शिक्षा मिली है।").hi} />,
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop", imageAlt: "Education Transforms Communities",
            stat: "500+", statLabel: <EditableText settingKey="home.impact.story.0.stat" label="Story 1 Stat Label" en={s(settings,"home.impact.story.0.stat","Students Supported","छात्र समर्थित").en} hi={s(settings,"home.impact.story.0.stat","Students Supported","छात्र समर्थित").hi} /> },
          { id: "story-2", number: "02",
            title: <EditableText settingKey="home.impact.story.1.title" label="Story 2 Title" en={s(settings,"home.impact.story.1.title","Green Revolution in Action","हरित क्रांति की कार्रवाई").en} hi={s(settings,"home.impact.story.1.title","Green Revolution in Action","हरित क्रांति की कार्रवाई").hi} />,
            description: <EditableText settingKey="home.impact.story.1.desc" label="Story 2 Description" multiline en={s(settings,"home.impact.story.1.desc","Our Vrikshaaropan initiative has planted over 10,000 trees across West Champaran.","हमारे वृक्षारोपण पहल ने पश्चिम चम्पारण में 10,000 से अधिक पेड़ लगाए हैं।").en} hi={s(settings,"home.impact.story.1.desc","Our Vrikshaaropan initiative has planted over 10,000 trees across West Champaran.","हमारे वृक्षारोपण पहल ने पश्चिम चम्पारण में 10,000 से अधिक पेड़ लगाए हैं।").hi} />,
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop", imageAlt: "Green Revolution in Action",
            stat: "10K+", statLabel: <EditableText settingKey="home.impact.story.1.stat" label="Story 2 Stat Label" en={s(settings,"home.impact.story.1.stat","Trees Planted","पेड़ लगाए गए").en} hi={s(settings,"home.impact.story.1.stat","Trees Planted","पेड़ लगाए गए").hi} /> },
          { id: "story-3", number: "03",
            title: <EditableText settingKey="home.impact.story.2.title" label="Story 3 Title" en={s(settings,"home.impact.story.2.title","Healthcare for All","सभी के लिए स्वास्थ्य सेवा").en} hi={s(settings,"home.impact.story.2.title","Healthcare for All","सभी के लिए स्वास्थ्य सेवा").hi} />,
            description: <EditableText settingKey="home.impact.story.2.desc" label="Story 3 Description" multiline en={s(settings,"home.impact.story.2.desc","Free health camps and medical assistance have reached over 5,000 patients.","मुफ्त स्वास्थ्य शिविर ग्रामीण क्षेत्रों में 5,000 से अधिक रोगियों तक पहुँची है।").en} hi={s(settings,"home.impact.story.2.desc","Free health camps and medical assistance have reached over 5,000 patients.","मुफ्त स्वास्थ्य शिविर ग्रामीण क्षेत्रों में 5,000 से अधिक रोगियों तक पहुँची है।").hi} />,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop", imageAlt: "Healthcare for All",
            stat: "5K+", statLabel: <EditableText settingKey="home.impact.story.2.stat" label="Story 3 Stat Label" en={s(settings,"home.impact.story.2.stat","Patients Treated","रोगियों का इलाज").en} hi={s(settings,"home.impact.story.2.stat","Patients Treated","रोगियों का इलाज").hi} /> },
        ]}
        ctaText={<EditableText settingKey="home.impact.cta" label="Impact CTA" en={s(settings,"home.impact.cta","Explore All Programs","सभी कार्यक्रम देखें").en} hi={s(settings,"home.impact.cta","Explore All Programs","सभी कार्यक्रम देखें").hi} />}
        ctaLink="/programs"
        theme="light"
      />

      {/* 01 — CONSISTENT SERVICE */}
      <NumberedSection num="01" label={t(c.about.h2.en, c.about.h2.hi)}>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <EditableText as="h2" settingKey="home.about.h2" label="About Heading" en={c.about.h2.en} hi={c.about.h2.hi} className="text-4xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }} />
            <EditableText as="p" settingKey="home.about.lead" label="About Lead" en={c.about.lead.en} hi={c.about.lead.hi} className="text-lg italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted }} />
            <EditableText as="p" settingKey="home.about.p1" label="About Paragraph 1" multiline en={c.about.p1.en} hi={c.about.p1.hi} className="text-[15px] leading-relaxed mb-4" style={{ color: LENITY.muted }} />
            <EditableText as="p" settingKey="home.about.p2" label="About Paragraph 2" multiline en={c.about.p2.en} hi={c.about.p2.hi} className="text-[15px] leading-relaxed mb-7" style={{ color: LENITY.muted }} />
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: LENITY.ink }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: LENITY.yellow }}>
                <ArrowRight className="w-4 h-4" style={{ color: LENITY.ink }} />
              </span>
              <EditableText settingKey="home.about.more" label="About Read More" en={c.about.more.en} hi={c.about.more.hi} />
            </Link>
          </div>
          <div className="flex justify-center items-start">
            <div className={`watercolor inline-block w-64 h-80`} style={{ ["--blob" as string]: LENITY.pinkSoft }}>
              <EditableImage
                settingKey="home.img.portrait1"
                src={settings["home.img.portrait1"]?.en || IMG.portrait1}
                alt={t("A family we serve", "एक परिवार जिसकी हम सेवा करते हैं")}
                aspectRatio="4/5"
                className="relative rounded-[2rem] object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </NumberedSection>

      {/* YELLOW PULL-QUOTE */}
      <section className="relative" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2">
          <Fade className="py-2">
            <div className={`watercolor inline-block w-full h-72 lg:h-full`} style={{ ["--blob" as string]: LENITY.yellowSoft }}>
              <EditableImage
                settingKey="home.img.quote"
                src={settings["home.img.quote"]?.en || IMG.quote}
                alt={t("Volunteer in the field", "क्षेत्र में स्वयंसेवक")}
                aspectRatio="4/3"
                className="relative rounded-[2rem] object-cover w-full h-full"
              />
            </div>
          </Fade>
          <Fade>
            <div className="p-10 lg:p-14 h-full flex flex-col justify-center" style={{ background: LENITY.yellow }}>
              <Quote className="w-10 h-10 mb-4" style={{ color: LENITY.ink }} />
              <EditableText as="p" settingKey="home.quote.text" label="Pull Quote" multiline en={c.quote.text.en} hi={c.quote.text.hi} className="text-xl lg:text-2xl font-medium leading-relaxed mb-5" style={{ fontFamily: SERIF, color: LENITY.ink }} />
              <EditableText as="p" settingKey="home.quote.who" label="Quote Attribution" en={c.quote.who.en} hi={c.quote.who.hi} className="text-sm font-bold mb-7" style={{ color: LENITY.ink }} />
              <button onClick={openDonate} className="self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all hover:scale-105" style={{ background: LENITY.ink }}>
                <EditableText settingKey="home.quote.donate" label="Quote Donate CTA" en={c.quote.donate.en} hi={c.quote.donate.hi} /> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* 02 — WHAT WE DO */}
      <NumberedSection num="02" label={t(c.services.h2.en, c.services.h2.hi)} alt>
        <EditableText as="h2" settingKey="home.services.h2" label="Services Heading" en={c.services.h2.en} hi={c.services.h2.hi} className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
        <EditableText as="p" settingKey="home.services.lead" label="Services Lead" en={c.services.lead.en} hi={c.services.lead.hi} className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }} />
        <HorizontalCardSlider
          cards={services.map((svc) => {
            const Icon = iconFor(svc.iconName);
            return {
              id: svc.id,
              content: (
                <div className="bg-white rounded-2xl border p-7 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line, height: "280px" }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: LENITY.yellowSoft }}>
                    <Icon className="w-6 h-6" style={{ color: LENITY.ink }} />
                  </span>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(svc.titleEn, svc.titleHi)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: LENITY.muted }}>{t(svc.descEn, svc.descHi)}</p>
                </div>
              ),
            };
          })}
          autoPlay={true} autoPlayInterval={4000} cardWidth={300} gap={24}
        />
      </NumberedSection>

      {/* STATS BAND */}
      <section className="py-16" style={{ background: LENITY.yellow }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((st, i) => (
            <Fade key={i}>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                <Counter target={st.value} />
              </div>
              <EditableText
                settingKey={`home.stat.${i}`}
                label={`Stat ${i + 1} Label`}
                en={st.en} hi={st.hi}
                className="text-sm font-semibold block"
                style={{ color: LENITY.ink }}
              />
            </Fade>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: LENITY.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-14">
            <Eyebrow>
              <EditableText settingKey="home.partners.eyebrow" label="Partners Eyebrow" en="Working Together" hi="मिलकर काम करना" />
            </Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              <EditableText settingKey="home.partners.h2" label="Partners Heading" en="Our Partners & Sponsors" hi="हमारे साझेदार और प्रायोजक" />
            </h2>
          </Fade>
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              <EditableText settingKey="home.partners.sub1" label="Partners Sub-heading 1" en="Associate Partners" hi="सहयोगी साझेदार" />
            </h3>
            <LogoCarousel logos={[{id:1,name:"Tata Trust",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png"},{id:2,name:"Rotary International",image:"https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/RotaryInternationalLogo.svg/200px-RotaryInternationalLogo.svg.png"},{id:3,name:"United Way",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/United_Way_Worldwide_logo.svg/200px-United_Way_Worldwide_logo.svg.png"},{id:4,name:"World Vision",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/World_Vision_logo.svg/200px-World_Vision_logo.svg.png"},{id:5,name:"Care International",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CARE_logo.svg/200px-CARE_logo.svg.png"},{id:6,name:"Oxfam",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Oxfam_logo.svg/200px-Oxfam_logo.svg.png"}]} direction="left" speed={30} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              <EditableText settingKey="home.partners.sub2" label="Partners Sub-heading 2" en="Medicine Sponsored By" hi="दवा प्रायोजित" />
            </h3>
            <LogoCarousel logos={[{id:1,name:"Cipla",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Cipla_logo.svg/200px-Cipla_logo.svg.png"},{id:2,name:"Sun Pharma",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sun_Pharmaceutical_Logo.svg/200px-Sun_Pharmaceutical_Logo.svg.png"},{id:3,name:"Dr. Reddy's",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Dr._Reddy%27s_Laboratories_logo.svg/200px-Dr._Reddy%27s_Laboratories_logo.svg.png"},{id:4,name:"Lupin",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lupin_Limited_Logo.svg/200px-Lupin_Limited_Logo.svg.png"}]} direction="right" speed={35} />
          </div>
        </div>
      </section>

      <ProgramsGrid settings={settings} />

      {/* 03 — CAMPAIGNS */}
      <NumberedSection num="03" label={t(c.challenges.h2.en, c.challenges.h2.hi)}>
        <EditableText as="h2" settingKey="home.challenges.h2" label="Campaigns Heading" en={c.challenges.h2.en} hi={c.challenges.h2.hi} className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
        <EditableText as="p" settingKey="home.challenges.lead" label="Campaigns Lead" en={c.challenges.lead.en} hi={c.challenges.lead.hi} className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }} />
        <div className="grid md:grid-cols-3 gap-7">
          {campaigns.map((cam) => {
            const pct = Math.round((cam.raised / cam.goal) * 100);
            return (
              <Fade key={cam.id}>
                <div className="bg-white rounded-2xl border p-7 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <h3 className="font-bold text-base leading-snug mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(cam.titleEn, cam.titleHi)}</h3>
                  <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ background: LENITY.line }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: LENITY.yellow }} />
                  </div>
                  <div className="flex justify-between text-sm mb-1" style={{ color: LENITY.muted }}>
                    <span><span className="font-bold" style={{ color: LENITY.ink }}>₹{cam.raised.toLocaleString("en-IN")}</span> raised</span>
                    <span className="text-xs">Goal: ₹{cam.goal.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs mb-5" style={{ color: LENITY.muted }}>{cam.backers} donors</p>
                  <button onClick={openDonate} className="w-full rounded-full py-3 text-sm font-bold" style={{ background: LENITY.yellow, color: LENITY.ink }}>
                    <EditableText settingKey="home.campaigns.btn" label="Campaign Button" en={c.campaigns.btn.en} hi={c.campaigns.btn.hi} />
                  </button>
                </div>
              </Fade>
            );
          })}
        </div>
      </NumberedSection>

      {/* COMING SOON — future plans teaser */}
      {futurePlans.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Fade className="text-center mb-12">
              <Eyebrow>
                <EditableText settingKey="home.comingsoon.eyebrow" label="Coming Soon Eyebrow" en="Coming Soon" hi="जल्द आ रहा है" />
              </Eyebrow>
              <EditableText as="h2" settingKey="home.comingsoon.h2" label="Coming Soon Heading"
                en="What We Are Building Next" hi="भविष्य की योजनाएं"
                className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
              <EditableText as="p" settingKey="home.comingsoon.lead" label="Coming Soon Lead"
                en="A campus, expanded education programs, and new community initiatives — launching soon."
                hi="एक परिसर, विस्तारित शिक्षा कार्यक्रम, और नई सामुदायिक पहल — जल्द शुरू होंगी।"
                className="text-lg italic max-w-2xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }} />
            </Fade>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {futurePlans.map((plan) => (
                <Fade key={plan.id}>
                  <div className="rounded-3xl border p-6 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ background: LENITY.soft, borderColor: LENITY.line }}>
                    <span className="inline-block text-xs font-bold rounded-full px-3 py-1 mb-3" style={{ background: LENITY.yellow, color: LENITY.ink }}>{plan.year}</span>
                    <h3 className="font-bold mb-2" style={{ color: LENITY.ink, fontFamily: SERIF }}>{t(plan.titleEn, plan.titleHi)}</h3>
                    <p className="text-sm" style={{ color: LENITY.muted }}>{t(plan.descEn, plan.descHi)}</p>
                  </div>
                </Fade>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: LENITY.ink }}>
                <EditableText settingKey="home.comingsoon.more" label="Coming Soon Read More" en="See All Future Plans" hi="सभी भविष्य की योजनाएं देखें" /> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* HOW YOU CAN HELP */}
      <section className="py-16 md:py-20" style={{ background: LENITY.yellow }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12">
            <EditableText as="h2" settingKey="home.help.h2" label="Help Section Heading" en="Join Hands With Us" hi="हमारे साथ हाथ मिलाएं" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }} />
            <EditableText as="p" settingKey="home.help.lead" label="Help Section Lead" en="On our amazing journey of helping others. Your support can transform lives." hi="दूसरों की मदद करने की हमारी अद्भुत यात्रा में। आपका समर्थन जीवन बदल सकता है।" className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: LENITY.ink, opacity: 0.9 }} />
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <EditableText as="h3" settingKey="home.help.card1.h3" label="Help Card 1 — Title" en="Donate Money" hi="पैसे दान करें" className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText as="p" settingKey="home.help.card1.desc" label="Help Card 1 — Desc" en="Make a financial contribution to support our programs" hi="हमारे कार्यक्रमों का समर्थन करने के लिए वित्तीय योगदान दें" className="text-sm mb-6" style={{ color: LENITY.muted }} />
                <button onClick={openDonate} className="w-full rounded-full py-3 text-sm font-bold" style={{ background: LENITY.accent, color: "#fff" }}>
                  <EditableText settingKey="home.help.card1.btn" label="Help Card 1 — Button" en="Donate Now" hi="अभी दान करें" />
                </button>
              </div>
            </Fade>
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <EditableText as="h3" settingKey="home.help.card2.h3" label="Help Card 2 — Title" en="Volunteer" hi="स्वयंसेवक बनें" className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText as="p" settingKey="home.help.card2.desc" label="Help Card 2 — Desc" en="Give your time and skills to make a difference" hi="बदलाव लाने के लिए अपना समय और कौशल दें" className="text-sm mb-6" style={{ color: LENITY.muted }} />
                <Link href="/volunteer" className="block w-full rounded-full py-3 text-sm font-bold border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  <EditableText settingKey="home.help.card2.btn" label="Help Card 2 — Button" en="Join Us" hi="हमसे जुड़ें" />
                </Link>
              </div>
            </Fade>
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <EditableText as="h3" settingKey="home.help.card3.h3" label="Help Card 3 — Title" en="Sponsor Program" hi="कार्यक्रम प्रायोजित करें" className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText as="p" settingKey="home.help.card3.desc" label="Help Card 3 — Desc" en="Support specific initiatives like education or healthcare" hi="शिक्षा या स्वास्थ्य जैसी विशिष्ट पहलों का समर्थन करें" className="text-sm mb-6" style={{ color: LENITY.muted }} />
                <Link href="/projects" className="block w-full rounded-full py-3 text-sm font-bold border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  <EditableText settingKey="home.help.card3.btn" label="Help Card 3 — Button" en="Learn More" hi="और जानें" />
                </Link>
              </div>
            </Fade>
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <EditableText as="h3" settingKey="home.help.card4.h3" label="Help Card 4 — Title" en="Corporate Partnership" hi="कॉर्पोरेट साझेदारी" className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText as="p" settingKey="home.help.card4.desc" label="Help Card 4 — Desc" en="Partner with us for CSR initiatives and social impact" hi="सीएसआर पहल के लिए हमारे साथ साझेदार बनें" className="text-sm mb-6" style={{ color: LENITY.muted }} />
                <Link href="/contact" className="block w-full rounded-full py-3 text-sm font-bold border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  <EditableText settingKey="home.help.card4.btn" label="Help Card 4 — Button" en="Contact Us" hi="संपर्क करें" />
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12">
            <Eyebrow>
              <EditableText settingKey="home.testimonials.eyebrow" label="Testimonials Eyebrow" en="Real Impact" hi="वास्तविक प्रभाव" />
            </Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              <EditableText settingKey="home.testimonials.h2" label="Testimonials Heading" en="Stories of Hope & Change" hi="आशा और परिवर्तन की कहानियाँ" />
            </h2>
          </Fade>
          <TestimonialCarousel
            testimonials={[
              {
                id: 1,
                quote: <EditableText settingKey="home.testimonial.0.quote" label="Testimonial 1 Quote" multiline en={s(settings,"home.testimonial.0.quote","Hariwatika helped my daughter get scholarships. Today she is a teacher helping other children.","हरिवाटिका ने मेरी बेटी को छात्रवृत्ति प्राप्त करने में मदद की। आज वह एक शिक्षिका है।").en} hi={s(settings,"home.testimonial.0.quote","Hariwatika helped my daughter get scholarships. Today she is a teacher helping other children.","हरिवाटिका ने मेरी बेटी को छात्रवृत्ति प्राप्त करने में मदद की। आज वह एक शिक्षिका है।").hi} />,
                name: t(s(settings,"home.testimonial.0.name","Rekha Devi","रेखा देवी").en, s(settings,"home.testimonial.0.name","Rekha Devi","रेखा देवी").hi),
                nameNode: <EditableText settingKey="home.testimonial.0.name" label="Testimonial 1 Name" en={s(settings,"home.testimonial.0.name","Rekha Devi","रेखा देवी").en} hi={s(settings,"home.testimonial.0.name","Rekha Devi","रेखा देवी").hi} />,
                location: <EditableText settingKey="home.testimonial.0.loc" label="Testimonial 1 Location" en={s(settings,"home.testimonial.0.loc","Parent, Bettiah","अभिभावक, बेतिया").en} hi={s(settings,"home.testimonial.0.loc","Parent, Bettiah","अभिभावक, बेतिया").hi} />,
                image: IMG.avatar,
              },
              {
                id: 2,
                quote: <EditableText settingKey="home.testimonial.1.quote" label="Testimonial 2 Quote" multiline en={s(settings,"home.testimonial.1.quote","During the flood, Hariwatika was first to reach our village with food and medicine.","बाढ़ के दौरान, हरिवाटिका भोजन और दवा के साथ पहुंचने वाला पहला था।").en} hi={s(settings,"home.testimonial.1.quote","During the flood, Hariwatika was first to reach our village with food and medicine.","बाढ़ के दौरान, हरिवाटिका भोजन और दवा के साथ पहुंचने वाला पहला था।").hi} />,
                name: t(s(settings,"home.testimonial.1.name","Ramesh Kumar","रमेश कुमार").en, s(settings,"home.testimonial.1.name","Ramesh Kumar","रमेश कुमार").hi),
                nameNode: <EditableText settingKey="home.testimonial.1.name" label="Testimonial 2 Name" en={s(settings,"home.testimonial.1.name","Ramesh Kumar","रमेश कुमार").en} hi={s(settings,"home.testimonial.1.name","Ramesh Kumar","रमेश कुमार").hi} />,
                location: <EditableText settingKey="home.testimonial.1.loc" label="Testimonial 2 Location" en={s(settings,"home.testimonial.1.loc","Farmer, West Champaran","किसान, पश्चिम चम्पारण").en} hi={s(settings,"home.testimonial.1.loc","Farmer, West Champaran","किसान, पश्चिम चम्पारण").hi} />,
                image: IMG.avatar,
              },
              {
                id: 3,
                quote: <EditableText settingKey="home.testimonial.2.quote" label="Testimonial 3 Quote" multiline en={s(settings,"home.testimonial.2.quote","The free health camp diagnosed my illness early. Their support gave me a second chance.","मुफ्त स्वास्थ्य शिविर ने मेरी बीमारी का जल्दी निदान किया। उनके समर्थन ने मुझे दूसरा मौका दिया।").en} hi={s(settings,"home.testimonial.2.quote","The free health camp diagnosed my illness early. Their support gave me a second chance.","मुफ्त स्वास्थ्य शिविर ने मेरी बीमारी का जल्दी निदान किया। उनके समर्थन ने मुझे दूसरा मौका दिया।").hi} />,
                name: t(s(settings,"home.testimonial.2.name","Sunita Singh","सुनीता सिंह").en, s(settings,"home.testimonial.2.name","Sunita Singh","सुनीता सिंह").hi),
                nameNode: <EditableText settingKey="home.testimonial.2.name" label="Testimonial 3 Name" en={s(settings,"home.testimonial.2.name","Sunita Singh","सुनीता सिंह").en} hi={s(settings,"home.testimonial.2.name","Sunita Singh","सुनीता सिंह").hi} />,
                location: <EditableText settingKey="home.testimonial.2.loc" label="Testimonial 3 Location" en={s(settings,"home.testimonial.2.loc","Village Elder","गांव की बुजुर्ग").en} hi={s(settings,"home.testimonial.2.loc","Village Elder","गांव की बुजुर्ग").hi} />,
                image: IMG.avatar,
              },
            ]}
            autoPlay={true} interval={5000}
          />
        </div>
      </section>

      {/* 04 — PILLARS + BLOG */}
      <NumberedSection num="04" label={t(c.blog.h2.en, c.blog.h2.hi)} alt>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, i) => (
            <Fade key={p.en}>
              <div className="text-center">
                <span className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: LENITY.yellowSoft }}>
                  <p.icon className="w-7 h-7" style={{ color: LENITY.ink }} />
                </span>
                <EditableText as="h3" settingKey={`home.pillar.${i}.title`} label={`Pillar ${i+1} Title`} en={p.en} hi={p.hi} className="font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }} />
                <EditableText as="p" settingKey={`home.pillar.${i}.desc`} label={`Pillar ${i+1} Description`} en={p.descEn} hi={p.descHi} className="text-xs mt-1" style={{ color: LENITY.muted }} />
              </div>
            </Fade>
          ))}
        </div>
        <Fade className="flex items-end justify-between mb-8">
          <div>
            <EditableText as="h2" settingKey="home.blog.h2" label="Blog Heading" en={c.blog.h2.en} hi={c.blog.h2.hi} className="text-4xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }} />
            <EditableText as="p" settingKey="home.blog.lead" label="Blog Lead" en={c.blog.lead.en} hi={c.blog.lead.hi} className="text-lg italic mt-1" style={{ fontFamily: SERIF, color: LENITY.muted }} />
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
            <EditableText settingKey="home.blog.all" label="Blog View All" en={c.blog.all.en} hi={c.blog.all.hi} /> <ArrowRight className="w-4 h-4" />
          </Link>
        </Fade>
        <div className="grid md:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <Fade key={post.id}>
              <div className="bg-white rounded-2xl border overflow-hidden h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="h-48 relative overflow-hidden">
                  <EditableImage
                    settingKey={`home.img.blog.${post.id}`}
                    src={post.img || IMG.svc[0]}
                    alt={t(post.titleEn, post.titleHi)}
                    aspectRatio="16/9"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full px-2.5 py-1" style={{ background: LENITY.yellow, color: LENITY.ink }}>{post.category}</span>
                </div>
                <div className="p-6">
                  <span className="text-[11px]" style={{ color: LENITY.muted }}>{post.date}</span>
                  <h3 className="font-bold text-base leading-snug my-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(post.titleEn, post.titleHi)}</h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: LENITY.muted }}>{t(post.excerptEn, post.excerptHi)}</p>
                  <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: LENITY.ink }}>
                    <EditableText settingKey="home.blog.more" label="Blog Read More" en={c.blog.more.en} hi={c.blog.more.hi} /> <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </NumberedSection>

    </AdminEditProvider>
  );
}
