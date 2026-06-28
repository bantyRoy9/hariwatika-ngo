"use client";

import { useState, useEffect, useRef, Suspense, lazy } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import ImpactCounter from "@/components/ImpactCounter";
import { useLang } from "@/context/LanguageContext";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useTyped } from "@/hooks/useTyped";
import {
  Heart, TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight,
  Quote, ChevronDown, MessageCircle, Star,
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

const Hero3DCanvas = lazy(() => import("@/components/Hero3DCanvas"));

const IMG = {
  hero:     "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  portrait1:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80&auto=format&fit=crop",
  portrait2:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop",
  portrait3:"https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=700&q=80&auto=format&fit=crop",
  quote:    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80&auto=format&fit=crop",
  svc: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
  ],
};

/* ─────────────────────────────────────────────────────────────
   BILINGUAL CONTENT
───────────────────────────────────────────────────────────── */
const content = {
  hero: {
    badge:  { en: "Serving Since 2000 — सेवा ही धर्म है", hi: "सेवा ही धर्म है — 2000 से समर्पित" },
    line1:  { en: "Empowering Communities", hi: "समाज को सशक्त बना रहे" },
    typed:  {
      en: ["Marriage Assistance", "Tree Plantation", "Poverty Relief", "Healthcare Seva", "Education Support"],
      hi: ["विवाह सेवा", "वृक्षारोपण", "गरीब सहायता", "स्वास्थ्य सेवा", "शिक्षा सहयोग"],
    },
    sub: {
      en: "Hariwatika Shiv Mandir Vivah Sewa Samiti — transforming lives across West Champaran, Bihar since 2000.",
      hi: "हरिवाटिका शिव मंदिर विवाह सेवा समिति — 2000 से बिहार के पश्चिम चम्पारण में जीवन बदल रहे हैं।",
    },
    cta1:   { en: "Donate Now", hi: "दान करें" },
    cta2:   { en: "Our Work", hi: "हमारा काम" },
    scroll: { en: "Explore", hi: "देखें" },
  },
  about: {
    h2:  { en: "Consistent Service", hi: "निरंतर सेवा" },
    lead:{ en: "A quarter-century of compassion. What does it mean to you?", hi: "एक चौथाई सदी की करुणा। आपके लिए इसका क्या अर्थ है?" },
    p1: {
      en: "For more than 25 years, Hariwatika has been resolute in our goal to expand dignity and opportunity to families who need it most. As a community rooted in seva, we've moved with every step of the way and, together, we've achieved a lot.",
      hi: "25 वर्षों से हरिवाटिका उन परिवारों तक सम्मान और अवसर पहुँचाने में दृढ़ रहा है जिन्हें इसकी सबसे अधिक आवश्यकता है। सेवा में निहित समुदाय के रूप में, हमने हर कदम साथ चलकर बहुत कुछ हासिल किया है।",
    },
    p2: {
      en: "That means more families than ever have access to marriage assistance, healthcare, and relief. We know that access to dignity is critically important — but too often it is not enough. What about the quality of that care?",
      hi: "इसका अर्थ है कि पहले से कहीं अधिक परिवारों को विवाह सहायता, स्वास्थ्य और राहत तक पहुँच है। हम जानते हैं कि सम्मान तक पहुँच महत्वपूर्ण है — पर अक्सर पर्याप्त नहीं। उस सेवा की गुणवत्ता का क्या?",
    },
    more: { en: "Read More", hi: "और पढ़ें" },
  },
  quote: {
    text: { en: "“Together with our partners, we are working toward a community where no family is denied a dignified marriage, and where high-quality, effective and affordable care reaches everyone.”", hi: "“अपने सहयोगियों के साथ, हम ऐसे समाज की ओर काम कर रहे हैं जहाँ किसी परिवार को सम्मानजनक विवाह से वंचित न किया जाए।”" },
    who:  { en: "— Samiti Patron, Hariwatika Shiv Mandir", hi: "— संरक्षक, हरिवाटिका शिव मंदिर समिति" },
    donate: { en: "Donate Today", hi: "आज दान करें" },
  },
  challenges: {
    h2:  { en: "Challenges & Solutions", hi: "चुनौतियाँ और समाधान" },
    lead:{ en: "A relentless drive to expand dignity and care across West Champaran.", hi: "पश्चिम चम्पारण में सम्मान और सेवा बढ़ाने का अटूट प्रयास।" },
  },
  services: {
    h2:  { en: "What We Do", hi: "हम क्या करते हैं" },
    lead:{ en: "Four pillars of seva that have changed thousands of lives.", hi: "सेवा के चार स्तम्भ जिन्होंने हज़ारों जीवन बदले।" },
    more: { en: "Read More", hi: "और पढ़ें" },
  },
  stats: [
    { value: "25+",    en: "Years of Service",      hi: "सेवा के वर्ष" },
    { value: "5000+",  en: "Families Helped",       hi: "परिवारों की मदद" },
    { value: "10000+", en: "Trees Planted",         hi: "वृक्ष लगाए" },
    { value: "200+",   en: "Marriages Facilitated", hi: "विवाह सम्पन्न" },
  ],
  campaigns: {
    h2:  { en: "Active Campaigns", hi: "सक्रिय अभियान" },
    lead:{ en: "Support ongoing campaigns and help us reach our goals.", hi: "चल रहे अभियानों का समर्थन करें।" },
    btn: { en: "Support This Campaign", hi: "इस अभियान का साथ दें" },
  },
  blog: {
    h2:   { en: "News & Updates",  hi: "समाचार और अपडेट" },
    lead: { en: "Stories of impact and hope from the field.", hi: "क्षेत्र से प्रभाव और आशा की कहानियाँ।" },
    all:  { en: "View All",        hi: "सब देखें" },
    more: { en: "Read More",       hi: "और पढ़ें" },
  },
};

const services = [
  { icon: Heart,       titleEn: "Vivah Seva",     titleHi: "विवाह सेवा",    descEn: "Facilitating marriages for underprivileged families with complete ceremony arrangements.", descHi: "गरीब परिवारों के लिए पूर्ण विवाह व्यवस्था।" },
  { icon: TreePine,    titleEn: "Vrikshaaropan",  titleHi: "वृक्षारोपण",   descEn: "Large-scale tree plantation drives to green the region across West Champaran.", descHi: "क्षेत्र को हरा-भरा बनाने हेतु वृक्षारोपण अभियान।" },
  { icon: Users,       titleEn: "Garib Sahayata", titleHi: "गरीब सहायता",   descEn: "Food, clothing, and essentials to underprivileged and disaster-affected families.", descHi: "जरूरतमंद परिवारों को भोजन, वस्त्र और आवश्यक सामान।" },
  { icon: Stethoscope, titleEn: "Swasthya Seva",  titleHi: "स्वास्थ्य सेवा", descEn: "Free health camps and medical assistance for rural low-income communities.", descHi: "ग्रामीण समुदायों हेतु नि:शुल्क स्वास्थ्य शिविर।" },
];

const pillars = [
  { icon: BookOpen,    en: "Education",  hi: "शिक्षा",    descEn: "Supporting children's education", descHi: "बच्चों की शिक्षा में सहयोग" },
  { icon: Droplets,    en: "Water",      hi: "जल",        descEn: "Clean water access for all",      descHi: "सभी के लिए स्वच्छ जल" },
  { icon: Wheat,       en: "Food",       hi: "अन्न",       descEn: "No one sleeps hungry",           descHi: "कोई भूखा न सोए" },
  { icon: Stethoscope, en: "Healthcare", hi: "स्वास्थ्य",  descEn: "Free medical assistance",        descHi: "नि:शुल्क चिकित्सा सहायता" },
];

const campaigns = [
  { titleEn: "Mass Marriage Ceremony 2025", titleHi: "सामूहिक विवाह समारोह 2025", raised: 85000, goal: 100000, backers: 42 },
  { titleEn: "10,000 Trees This Monsoon",   titleHi: "इस मानसून 10,000 पेड़",       raised: 32000, goal: 50000,  backers: 118 },
  { titleEn: "Winter Relief Drive",          titleHi: "शीतकालीन राहत अभियान",       raised: 18500, goal: 30000,  backers: 67 },
];

const blogPosts = [
  { date: "15 Dec 2024", catEn: "Event",       catHi: "कार्यक्रम", img: IMG.svc[0],
    titleEn: "Successful Saptapadi Vivah Mahotsav — 12 Couples Blessed",
    titleHi: "सफल सप्तपदी विवाह महोत्सव — 12 जोड़ों को आशीर्वाद",
    excerptEn: "This year's mass marriage ceremony witnessed 12 families unite under Shiv Mandir's blessings.",
    excerptHi: "इस वर्ष शिव मंदिर के आशीर्वाद से 12 परिवार एक छत के नीचे मिले।" },
  { date: "05 Nov 2024", catEn: "Environment", catHi: "पर्यावरण", img: IMG.svc[1],
    titleEn: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    titleHi: "वन महोत्सव: पश्चिम चम्पारण में 2000 पौधे लगाए",
    excerptEn: "Volunteers planted 2000 saplings across Bettiah and surrounding villages.",
    excerptHi: "स्वयंसेवकों ने बेतिया और आसपास के गांवों में 2000 पौधे लगाए।" },
  { date: "20 Oct 2024", catEn: "Relief",      catHi: "राहत", img: IMG.svc[2],
    titleEn: "Winter Blanket Distribution Reaches 500 Families",
    titleHi: "शीतकालीन कंबल वितरण 500 परिवारों तक पहुँचा",
    excerptEn: "Our team distributed warm blankets to 500 underprivileged families as winter approached.",
    excerptHi: "ठंड में हमारी टीम ने 500 जरूरतमंद परिवारों को गर्म कंबल बाँटे।" },
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

/* PAI eyebrow: yellow dash + uppercase label */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: LENITY.ink }}>
      <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
      {children}
    </span>
  );
}

/* watercolor portrait: paint blob behind a rounded photo */
function WaterPortrait({ src, alt, blob = LENITY.yellowSoft, className = "" }:
  { src: string; alt: string; blob?: string; className?: string }) {
  return (
    <div className={`watercolor inline-block ${className}`} style={{ ["--blob" as string]: blob }}>
      <img src={src} alt={alt} className="relative rounded-[2rem] object-cover w-full h-full" loading="lazy" />
    </div>
  );
}

/* big outline number + vertical label, editorial layout */
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
   MAIN PAGE — PAI editorial
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const { t, lang } = useLang();
  const openDonate = () => setDonateOpen(true);
  const mouse = useMouseParallax();
  const typedPhrases = lang === "hi" ? content.hero.typed.hi : content.hero.typed.en;
  const { displayed, cursor } = useTyped(typedPhrases);

  return (
    <>
      <Navbar />
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

      {/* ════════════ HERO — 3D Canvas Banner ════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1229 0%, #1a1040 50%, #0d1229 100%)" }}>
        {/* 3D canvas background */}
        <Suspense fallback={null}>
          <Hero3DCanvas />
        </Suspense>

        {/* Parallax orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full"
            style={{ width: 520, height: 520, top: "10%", left: "5%", background: LENITY.accentSoft, filter: "blur(80px)",
              transform: `translate(${mouse.x * -30}px, ${mouse.y * -20}px)`, transition: "transform 0.1s ease-out" }} />
          <div className="absolute rounded-full"
            style={{ width: 380, height: 380, bottom: "15%", right: "8%", background: LENITY.yellowSoft, filter: "blur(60px)",
              transform: `translate(${mouse.x * 25}px, ${mouse.y * 15}px)`, transition: "transform 0.1s ease-out" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: "rgba(232,69,35,0.4)", background: "rgba(232,69,35,0.08)", color: "#f9a87a" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LENITY.accent }} />
            {t(content.hero.badge.en, content.hero.badge.hi)}
          </div>

          {/* Headline */}
          <h1 className="font-bold mb-4 leading-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontFamily: SERIF, color: "#ffffff" }}>
            {t(content.hero.line1.en, content.hero.line1.hi)}
          </h1>

          {/* Typed phrase */}
          <div className="h-14 flex items-center justify-center mb-6">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: LENITY.accent }}>
              {displayed}
              <span className="ml-0.5 inline-block w-0.5 h-8 align-middle" style={{ background: LENITY.accent, opacity: cursor ? 1 : 0 }} />
            </span>
          </div>

          {/* Sub */}
          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>
            {t(content.hero.sub.en, content.hero.sub.hi)}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button onClick={openDonate}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm transition-all hover:scale-105"
              style={{ background: LENITY.accent, color: "#ffffff", boxShadow: "0 8px 30px rgba(232,69,35,0.4)" }}>
              {t(content.hero.cta1.en, content.hero.cta1.hi)} <ArrowRight className="w-4 h-4" />
            </button>
            <Link href="/projects"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm border transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#ffffff" }}>
              {t(content.hero.cta2.en, content.hero.cta2.hi)}
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="flex flex-col items-center gap-1 animate-bounce">
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t(content.hero.scroll.en, content.hero.scroll.hi)}
            </span>
            <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>
        </div>
      </section>

      {/* ════════════ 01 — CONSISTENT SERVICE ════════════ */}
      <NumberedSection num="01" label={t(content.about.h2.en, content.about.h2.hi)}>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t(content.about.h2.en, content.about.h2.hi)}
            </h2>
            <p className="text-lg italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t(content.about.lead.en, content.about.lead.hi)}
            </p>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: LENITY.muted }}>{t(content.about.p1.en, content.about.p1.hi)}</p>
            <p className="text-[15px] leading-relaxed mb-7" style={{ color: LENITY.muted }}>{t(content.about.p2.en, content.about.p2.hi)}</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: LENITY.ink }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: LENITY.yellow }}>
                <ArrowRight className="w-4 h-4" style={{ color: LENITY.ink }} />
              </span>
              {t(content.about.more.en, content.about.more.hi)}
            </Link>
          </div>
          <div className="flex justify-center items-start">
            <WaterPortrait src={IMG.portrait1} alt={t("A family we serve", "एक परिवार जिसकी हम सेवा करते हैं")}
              blob={LENITY.pinkSoft} className="w-64 h-80" />
          </div>
        </div>
      </NumberedSection>

      {/* ════════════ YELLOW PULL-QUOTE ════════════ */}
      <section className="relative" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2">
          <Fade className="py-2">
            <WaterPortrait src={IMG.quote} alt={t("Volunteer in the field", "क्षेत्र में स्वयंसेवक")}
              blob={LENITY.yellowSoft} className="w-full h-72 lg:h-full" />
          </Fade>
          <Fade>
            <div className="p-10 lg:p-14 h-full flex flex-col justify-center" style={{ background: LENITY.yellow }}>
              <Quote className="w-10 h-10 mb-4" style={{ color: LENITY.ink }} />
              <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-5" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                {t(content.quote.text.en, content.quote.text.hi)}
              </p>
              <p className="text-sm font-bold mb-7" style={{ color: LENITY.ink }}>{t(content.quote.who.en, content.quote.who.hi)}</p>
              <button onClick={openDonate}
                className="self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: LENITY.ink }}>
                {t(content.quote.donate.en, content.quote.donate.hi)} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ════════════ 02 — WHAT WE DO ════════════ */}
      <NumberedSection num="02" label={t(content.services.h2.en, content.services.h2.hi)} alt>
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          {t(content.services.h2.en, content.services.h2.hi)}
        </h2>
        <p className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }}>
          {t(content.services.lead.en, content.services.lead.hi)}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {services.map((svc) => (
            <Fade key={svc.titleEn}>
              <div className="bg-white rounded-2xl border p-7 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: LENITY.yellowSoft }}>
                  <svc.icon className="w-6 h-6" style={{ color: LENITY.ink }} />
                </span>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(svc.titleEn, svc.titleHi)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: LENITY.muted }}>{t(svc.descEn, svc.descHi)}</p>
              </div>
            </Fade>
          ))}
        </div>
      </NumberedSection>

      {/* ════════════ STATS BAND ════════════ */}
      <section className="py-16" style={{ background: LENITY.yellow }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {content.stats.map((s) => (
            <Fade key={s.en}>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                <Counter target={s.value} />
              </div>
              <div className="text-sm font-semibold" style={{ color: LENITY.ink }}>{t(s.en, s.hi)}</div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ════════════ IMPACT COUNTER ════════════ */}
      <ImpactCounter stats={content.stats.map(s => ({ value: s.value, labelEn: s.en, labelHi: s.hi }))} />

      {/* ════════════ 03 — CHALLENGES & SOLUTIONS (campaigns) ════════════ */}
      <NumberedSection num="03" label={t(content.challenges.h2.en, content.challenges.h2.hi)}>
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          {t(content.challenges.h2.en, content.challenges.h2.hi)}
        </h2>
        <p className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }}>
          {t(content.challenges.lead.en, content.challenges.lead.hi)}
        </p>
        <div className="grid md:grid-cols-3 gap-7">
          {campaigns.map((c) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <Fade key={c.titleEn}>
                <div className="bg-white rounded-2xl border p-7 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <div className="flex items-start justify-between mb-5">
                    <h3 className="font-bold text-base leading-snug flex-1 pr-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(c.titleEn, c.titleHi)}</h3>
                    <span className="text-xs font-bold rounded-full px-2.5 py-1" style={{ color: LENITY.ink, background: LENITY.yellowSoft }}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ background: LENITY.line }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: LENITY.yellow, transition: "width 1.2s ease" }} />
                  </div>
                  <div className="flex justify-between text-sm mb-1" style={{ color: LENITY.muted }}>
                    <span><span className="font-bold" style={{ color: LENITY.ink }}>₹{c.raised.toLocaleString("en-IN")}</span> raised</span>
                    <span className="text-xs">Goal: <span className="font-semibold">₹{c.goal.toLocaleString("en-IN")}</span></span>
                  </div>
                  <p className="text-xs mb-5" style={{ color: LENITY.muted }}>{c.backers} donors</p>
                  <button onClick={openDonate}
                    className="w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-[1.02]"
                    style={{ background: LENITY.yellow, color: LENITY.ink }}>
                    {t(content.campaigns.btn.en, content.campaigns.btn.hi)}
                  </button>
                </div>
              </Fade>
            );
          })}
        </div>
      </NumberedSection>

      {/* ════════════ 04 — PILLARS + BLOG ════════════ */}
      <NumberedSection num="04" label={t(content.blog.h2.en, content.blog.h2.hi)} alt>
        {/* pillars row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => (
            <Fade key={p.en}>
              <div className="text-center">
                <span className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: LENITY.yellowSoft }}>
                  <p.icon className="w-7 h-7" style={{ color: LENITY.ink }} />
                </span>
                <h3 className="font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(p.en, p.hi)}</h3>
                <p className="text-xs mt-1" style={{ color: LENITY.muted }}>{t(p.descEn, p.descHi)}</p>
              </div>
            </Fade>
          ))}
        </div>

        {/* blog header */}
        <Fade className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(content.blog.h2.en, content.blog.h2.hi)}</h2>
            <p className="text-lg italic mt-1" style={{ fontFamily: SERIF, color: LENITY.muted }}>{t(content.blog.lead.en, content.blog.lead.hi)}</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
            {t(content.blog.all.en, content.blog.all.hi)} <ArrowRight className="w-4 h-4" />
          </Link>
        </Fade>
        <div className="grid md:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <Fade key={post.titleEn}>
              <div className="bg-white rounded-2xl border overflow-hidden h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="h-48 relative overflow-hidden">
                  <img src={post.img} alt={t(post.titleEn, post.titleHi)} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full px-2.5 py-1" style={{ background: LENITY.yellow, color: LENITY.ink }}>
                    {t(post.catEn, post.catHi)}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px]" style={{ color: LENITY.muted }}>{post.date}</span>
                  <h3 className="font-bold text-base leading-snug my-2" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(post.titleEn, post.titleHi)}</h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: LENITY.muted }}>{t(post.excerptEn, post.excerptHi)}</p>
                  <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: LENITY.ink }}>
                    {t(content.blog.more.en, content.blog.more.hi)} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </NumberedSection>

      <Footer />
    </>
  );
}
