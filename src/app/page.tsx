"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import { useLang } from "@/context/LanguageContext";
import {
  Heart, TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight,
  Check, HandHeart,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   LENITY THEME TOKENS (light charity look)
───────────────────────────────────────────────────────────── */
const LENITY = {
  accent: "#F97316",
  accentHover: "#ea670c",
  ink: "#1b1c19",
  muted: "#6b6b6b",
  soft: "#f7f7f5",
  line: "#ececea",
  amber: "#f0a830",
  red: "#e8542a",
  blue: "#3a7bd5",
};

const SERIF = "'Literata', serif";

/* Unsplash hotlinks — community / charity / India themed */
const IMG = {
  hero:      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  about1:    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80&auto=format&fit=crop",
  about2:    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop",
  avatar:    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80&auto=format&fit=crop",
  whatWeDo:  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=900&q=80&auto=format&fit=crop",
  svc: [
    "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
  ],
  community: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&auto=format&fit=crop",
  children:  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80&auto=format&fit=crop",
};

/* reference-theme: 3 overlapping feature cards under hero (red / photo / blue) */
const featureCards = [
  { key: "crowd",  bg: "#e8542a", img: null,
    titleEn: "Crowdfunding", titleHi: "क्राउडफंडिंग",
    descEn: "Our charity activities go further with your donation. We call on fundraising from anyone who can.",
    descHi: "आपके दान से हमारी सेवाएँ और आगे बढ़ती हैं। हर सहयोगी का स्वागत है।", href: "/donate" },
  { key: "vol",    bg: null, img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80&auto=format&fit=crop",
    titleEn: "Become a Volunteer", titleHi: "स्वयंसेवक बनें", descEn: "", descHi: "", href: "/volunteer" },
  { key: "school", bg: "#3a7bd5", img: null,
    titleEn: "Give Scholarship", titleHi: "छात्रवृत्ति दें",
    descEn: "We believe education is the best way to help those in need. Support a child's future today.",
    descHi: "शिक्षा ही जरूरतमंदों की सबसे बड़ी मदद है। आज एक बच्चे के भविष्य का सहयोग करें।", href: "/donate" },
];

/* reference-theme: "Our Projects" amber band */
const projects = [
  { titleEn: "Women Empowerment", titleHi: "महिला सशक्तिकरण", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format&fit=crop" },
  { titleEn: "Donation Drive",    titleHi: "दान अभियान",       img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80&auto=format&fit=crop" },
  { titleEn: "Community Care",    titleHi: "सामुदायिक सेवा",   img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80&auto=format&fit=crop" },
];

/* ─────────────────────────────────────────────────────────────
   BILINGUAL CONTENT
───────────────────────────────────────────────────────────── */
const content = {
  hero: {
    eyebrow: { en: "Welcome Our Charity", hi: "हमारी संस्था में स्वागत है" },
    line1:   { en: "Empower change,", hi: "बदलाव लाएँ," },
    line2:   { en: "one act of kindness at a time", hi: "एक-एक सेवा से" },
    sub: {
      en: "Hariwatika Shiv Mandir Vivah Sewa Samiti — serving communities across West Champaran, Bihar since 2000 with hope, help, and lasting change.",
      hi: "हरिवाटिका शिव मंदिर विवाह सेवा समिति — 2000 से बिहार के पश्चिम चम्पारण में आशा, सहायता और स्थायी बदलाव।",
    },
    cta1: { en: "Donate Now", hi: "दान करें" },
    cta2: { en: "Our Work", hi: "हमारा काम" },
    feat1: { en: "Education and Skill Development", hi: "शिक्षा और कौशल विकास" },
    feat2: { en: "Women and Youth Empowerment", hi: "महिला और युवा सशक्तिकरण" },
  },
  about: {
    tag: { en: "About Us", hi: "हमारे बारे में" },
    h2:  { en: "United in compassion, changing lives", hi: "करुणा में एक, जीवन बदलते हुए" },
    sub: {
      en: "Driven by compassion and a shared vision, we work hand-in-hand with communities to create meaningful change.",
      hi: "करुणा और साझा दृष्टि से प्रेरित होकर, हम समुदायों के साथ मिलकर सार्थक बदलाव लाते हैं।",
    },
    supportTitle: { en: "Healthcare Support", hi: "स्वास्थ्य सहायता" },
    supportSub:   { en: "Providing essential healthcare services and resources to communities.", hi: "समुदायों को आवश्यक स्वास्थ्य सेवाएँ और संसाधन प्रदान करना।" },
    btn:   { en: "About Us", hi: "और जानें" },
    badge: { en: "We've Funded", hi: "हमने जुटाए" },
    helped:{ en: "Helped Fund", hi: "सहयोग पाए" },
    helpedSub: { en: "Supporting growth through community funding.", hi: "सामुदायिक सहयोग से विकास।" },
  },
  services: {
    tag: { en: "Services", hi: "सेवाएँ" },
    h2:  { en: "Our comprehensive services", hi: "हमारी व्यापक सेवाएँ" },
    sub: {
      en: "Our services focus on lasting change through community development, healthcare access, educational support, and emergency relief.",
      hi: "हमारी सेवाएँ सामुदायिक विकास, स्वास्थ्य, शिक्षा और आपातकालीन राहत के माध्यम से स्थायी बदलाव पर केंद्रित हैं।",
    },
    more: { en: "Read More", hi: "और पढ़ें" },
  },
  whatWeDo: {
    tag: { en: "What We Do", hi: "हम क्या करते हैं" },
    h2:  { en: "Building hope creating lasting change", hi: "आशा बनाना, स्थायी बदलाव लाना" },
    sub: {
      en: "Four pillars of community service that have impacted thousands of families across West Champaran.",
      hi: "चार सेवा स्तम्भ जिन्होंने पश्चिम चम्पारण में हज़ारों परिवारों का जीवन बदला।",
    },
    donate: { en: "Donate Now", hi: "दान करें" },
  },
  stats: [
    { value: "25+",    en: "Years of Service",      hi: "सेवा के वर्ष" },
    { value: "5000+",  en: "Families Helped",       hi: "परिवारों की मदद" },
    { value: "10000+", en: "Trees Planted",         hi: "वृक्ष लगाए" },
    { value: "200+",   en: "Marriages Facilitated", hi: "विवाह सम्पन्न" },
  ],
  campaigns: {
    tag: { en: "Active Campaigns",      hi: "सक्रिय अभियान" },
    h2:  { en: "Join our campaign",     hi: "अभियान में भाग लें" },
    sub: { en: "Support ongoing campaigns and help us reach our goals.", hi: "चल रहे अभियानों का समर्थन करें।" },
    btn: { en: "Support This Campaign", hi: "इस अभियान का साथ दें" },
  },
  cta: {
    tag: { en: "Get Involved",  hi: "हमसे जुड़ें" },
    h2:  { en: "Join us today", hi: "आज हमारे साथ जुड़ें" },
    sub: { en: "Join hundreds of volunteers and donors making a real difference in West Champaran.", hi: "पश्चिम चम्पारण में बदलाव लाने वाले सैकड़ों स्वयंसेवकों के साथ जुड़ें।" },
    vol: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
    don: { en: "Donate Now", hi: "दान करें" },
  },
  blog: {
    tag:  { en: "Latest News",     hi: "ताज़ा समाचार" },
    h2:   { en: "News & Updates",  hi: "समाचार और अपडेट" },
    all:  { en: "View All",        hi: "सब देखें" },
    more: { en: "Read More",       hi: "और पढ़ें" },
  },
};

const services = [
  { icon: Heart,       titleEn: "Vivah Seva",     titleHi: "विवाह सेवा",    descEn: "Facilitating marriages for underprivileged families with complete ceremony arrangements.", descHi: "गरीब परिवारों के लिए पूर्ण विवाह व्यवस्था।", img: IMG.svc[0] },
  { icon: TreePine,    titleEn: "Vrikshaaropan",  titleHi: "वृक्षारोपण",   descEn: "Large-scale tree plantation drives to green the region across West Champaran.", descHi: "क्षेत्र को हरा-भरा बनाने हेतु वृक्षारोपण अभियान।", img: IMG.svc[1] },
  { icon: Users,       titleEn: "Garib Sahayata", titleHi: "गरीब सहायता",   descEn: "Food, clothing, and essentials to underprivileged and disaster-affected families.", descHi: "जरूरतमंद परिवारों को भोजन, वस्त्र और आवश्यक सामान।", img: IMG.svc[2] },
  { icon: Stethoscope, titleEn: "Swasthya Seva",  titleHi: "स्वास्थ्य सेवा", descEn: "Free health camps and medical assistance for rural low-income communities.", descHi: "ग्रामीण समुदायों हेतु नि:शुल्क स्वास्थ्य शिविर।", img: IMG.svc[0] },
];

const campaigns = [
  { titleEn: "Mass Marriage Ceremony 2025", titleHi: "सामूहिक विवाह समारोह 2025", raised: 85000, goal: 100000, backers: 42 },
  { titleEn: "10,000 Trees This Monsoon",   titleHi: "इस मानसून 10,000 पेड़",       raised: 32000, goal: 50000,  backers: 118 },
  { titleEn: "Winter Relief Drive",          titleHi: "शीतकालीन राहत अभियान",       raised: 18500, goal: 30000,  backers: 67 },
];

const pillars = [
  { icon: BookOpen,    en: "Education",  hi: "शिक्षा",    descEn: "Supporting children's education", descHi: "बच्चों की शिक्षा में सहयोग" },
  { icon: Droplets,    en: "Water",      hi: "जल",        descEn: "Clean water access for all",      descHi: "सभी के लिए स्वच्छ जल" },
  { icon: Wheat,       en: "Food",       hi: "अन्न",       descEn: "No one sleeps hungry",           descHi: "कोई भूखा न सोए" },
  { icon: Stethoscope, en: "Healthcare", hi: "स्वास्थ्य",  descEn: "Free medical assistance",        descHi: "नि:शुल्क चिकित्सा सहायता" },
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

/* small shared eyebrow */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]"
      style={{ color: LENITY.accent }}>
      <span className="inline-block w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: `${LENITY.accent}1a` }}>
        <HandHeart className="w-3 h-3" />
      </span>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const { t } = useLang();
  const openDonate = () => setDonateOpen(true);

  return (
    <>
      <Navbar />
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img src={IMG.hero} alt="Wedding ceremony facilitated by Hariwatika Vivah Sewa Samiti"
          className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        {/* dark left-to-right overlay keeps white navbar text readable */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(15,10,5,0.70) 0%, rgba(15,10,5,0.45) 50%, rgba(15,10,5,0.30) 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="mb-5"><Eyebrow>{t(content.hero.eyebrow.en, content.hero.eyebrow.hi)}</Eyebrow></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-white mb-6" style={{ fontFamily: SERIF }}>
              <span style={{ color: LENITY.accent }}>{t(content.hero.line1.en, content.hero.line1.hi)}</span>{" "}
              {t(content.hero.line2.en, content.hero.line2.hi)}
            </h1>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
              {t(content.hero.sub.en, content.hero.sub.hi)}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button onClick={openDonate}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: LENITY.accent, boxShadow: "0 10px 30px rgba(249,115,22,0.4)" }}>
                <Heart className="w-4 h-4 fill-white" />
                {t(content.hero.cta1.en, content.hero.cta1.hi)}
              </button>
              <Link href="/projects"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition-all">
                {t(content.hero.cta2.en, content.hero.cta2.hi)}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              {[content.hero.feat1, content.hero.feat2].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/90 text-sm font-medium">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: LENITY.accent }}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  {t(f.en, f.hi)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE CARDS (overlap hero) ════════════ */}
      <section className="relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative">
          <div className="grid sm:grid-cols-3 rounded-2xl overflow-hidden shadow-2xl">
            {featureCards.map((c) => (
              <div key={c.key} className="relative min-h-[300px] flex flex-col justify-center items-center text-center p-8 group overflow-hidden"
                style={c.bg ? { background: c.bg } : undefined}>
                {c.img && (
                  <>
                    <img src={c.img} alt={t(c.titleEn, c.titleHi)} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: "rgba(15,10,5,0.62)" }} />
                  </>
                )}
                <div className="relative z-10 text-white">
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF }}>{t(c.titleEn, c.titleHi)}</h3>
                  <span className="block w-10 h-0.5 bg-white/70 mx-auto mb-4" />
                  {c.descEn && <p className="text-sm text-white/85 leading-relaxed mb-5 max-w-xs">{t(c.descEn, c.descHi)}</p>}
                  <Link href={c.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition-all">
                    {t("Learn More", "और जानें")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ ABOUT SPLIT ════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          {/* photos */}
          <Fade className="relative">
            <div className="grid grid-cols-5 gap-4">
              <img src={IMG.about1} alt="Children at a community program"
                className="col-span-3 rounded-2xl object-cover w-full h-72" loading="lazy" />
              <img src={IMG.about2} alt="Volunteers serving the community"
                className="col-span-2 rounded-2xl object-cover w-full h-72 mt-10" loading="lazy" />
            </div>
            {/* orange funded badge */}
            <div className="absolute left-2 bottom-2 rounded-2xl px-5 py-4 text-white shadow-xl"
              style={{ background: LENITY.accent }}>
              <HandHeart className="w-6 h-6 mb-1" />
              <p className="text-[11px] font-medium opacity-90">{t(content.about.badge.en, content.about.badge.hi)}</p>
              <p className="text-lg font-bold leading-none">75k Dollars</p>
            </div>
            {/* avatar stat */}
            <div className="absolute right-0 top-4 flex items-center gap-3 bg-white rounded-2xl shadow-xl px-4 py-3 border" style={{ borderColor: LENITY.line }}>
              <img src={IMG.avatar} alt="" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="text-base font-bold" style={{ color: LENITY.accent, fontFamily: SERIF }}>
                  <Counter target="75958" />
                </p>
                <p className="text-[10px] font-semibold" style={{ color: LENITY.ink }}>{t(content.about.helped.en, content.about.helped.hi)}</p>
              </div>
            </div>
          </Fade>
          {/* text */}
          <Fade>
            <div className="mb-4"><Eyebrow>{t(content.about.tag.en, content.about.tag.hi)}</Eyebrow></div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-5" style={{ color: LENITY.ink, fontFamily: SERIF }}>
              {t(content.about.h2.en, content.about.h2.hi)}
            </h2>
            <p className="text-[15px] leading-relaxed mb-7" style={{ color: LENITY.muted }}>
              {t(content.about.sub.en, content.about.sub.hi)}
            </p>
            <div className="flex items-start gap-4 mb-8">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${LENITY.accent}1a` }}>
                <Stethoscope className="w-6 h-6" style={{ color: LENITY.accent }} />
              </span>
              <div>
                <p className="font-bold mb-1" style={{ color: LENITY.ink }}>{t(content.about.supportTitle.en, content.about.supportTitle.hi)}</p>
                <p className="text-sm" style={{ color: LENITY.muted }}>{t(content.about.supportSub.en, content.about.supportSub.hi)}</p>
              </div>
            </div>
            <Link href="/about"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm text-white transition-all hover:scale-105"
              style={{ background: LENITY.ink }}>
              {t(content.about.btn.en, content.about.btn.hi)}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Fade>
        </div>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section className="py-24" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-14 max-w-2xl mx-auto">
            <div className="mb-3 flex justify-center"><Eyebrow>{t(content.services.tag.en, content.services.tag.hi)}</Eyebrow></div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LENITY.ink, fontFamily: SERIF }}>
              {t(content.services.h2.en, content.services.h2.hi)}
            </h2>
            <p className="text-[15px]" style={{ color: LENITY.muted }}>{t(content.services.sub.en, content.services.sub.hi)}</p>
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.slice(0, 3).map((svc) => (
              <Fade key={svc.titleEn}>
                <div className="bg-white rounded-3xl border p-8 h-full flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ borderColor: LENITY.line }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: LENITY.ink, fontFamily: SERIF }}>{t(svc.titleEn, svc.titleHi)}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: LENITY.muted }}>{t(svc.descEn, svc.descHi)}</p>
                  <img src={svc.img} alt={t(svc.titleEn, svc.titleHi)}
                    className="w-32 h-32 rounded-full object-cover mb-6 ring-4" style={{ ["--tw-ring-color" as string]: `${LENITY.accent}22` }} loading="lazy" />
                  <Link href="/projects"
                    className="mt-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white transition-all hover:scale-105"
                    style={{ background: LENITY.accent }}>
                    {t(content.services.more.en, content.services.more.hi)}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ WHAT WE DO SPLIT ════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Fade>
            <div className="mb-4"><Eyebrow>{t(content.whatWeDo.tag.en, content.whatWeDo.tag.hi)}</Eyebrow></div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-5" style={{ color: LENITY.ink, fontFamily: SERIF }}>
              {t(content.whatWeDo.h2.en, content.whatWeDo.h2.hi)}
            </h2>
            <p className="text-[15px] leading-relaxed mb-7" style={{ color: LENITY.muted }}>
              {t(content.whatWeDo.sub.en, content.whatWeDo.sub.hi)}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {pillars.map((p) => (
                <div key={p.en} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${LENITY.accent}14` }}>
                    <p.icon className="w-5 h-5" style={{ color: LENITY.accent }} />
                  </span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: LENITY.ink }}>{t(p.en, p.hi)}</p>
                    <p className="text-xs" style={{ color: LENITY.muted }}>{t(p.descEn, p.descHi)}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={openDonate}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: LENITY.accent }}>
              <Heart className="w-4 h-4 fill-white" />
              {t(content.whatWeDo.donate.en, content.whatWeDo.donate.hi)}
            </button>
          </Fade>
          <Fade className="relative">
            <img src={IMG.whatWeDo} alt="Community working together"
              className="rounded-3xl object-cover w-full h-[420px]" loading="lazy" />
            {/* vertical donate tab */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-5 text-white font-bold text-xs shadow-lg"
              style={{ background: LENITY.accent, writingMode: "vertical-rl" }}>
              {t(content.whatWeDo.donate.en, content.whatWeDo.donate.hi)}
            </div>
          </Fade>
        </div>
      </section>

      {/* ════════════ STATS BAND ════════════ */}
      <section className="py-16" style={{ background: LENITY.ink }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {content.stats.map((s) => (
            <Fade key={s.en}>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ color: LENITY.accent, fontFamily: SERIF }}>
                <Counter target={s.value} />
              </div>
              <div className="text-white/70 text-sm font-medium">{t(s.en, s.hi)}</div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ════════════ OUR PROJECTS (amber band) ════════════ */}
      <section className="py-24" style={{ background: LENITY.amber }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: SERIF }}>
              {t("Our Projects", "हमारी परियोजनाएं")}
            </h2>
            <span className="block w-14 h-1 bg-white/80 mx-auto rounded-full" />
          </Fade>
          <div className="grid sm:grid-cols-3 gap-7">
            {projects.map((p) => (
              <Fade key={p.titleEn}>
                <Link href="/projects" className="block rounded-3xl overflow-hidden shadow-xl group relative">
                  <img src={p.img} alt={t(p.titleEn, p.titleHi)} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(15,10,5,0.78) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: SERIF }}>{t(p.titleEn, p.titleHi)}</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 mt-1">
                      {t("View Project", "देखें")} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CAMPAIGNS ════════════ */}
      <section className="py-24" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-14 max-w-2xl mx-auto">
            <div className="mb-3 flex justify-center"><Eyebrow>{t(content.campaigns.tag.en, content.campaigns.tag.hi)}</Eyebrow></div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LENITY.ink, fontFamily: SERIF }}>
              {t(content.campaigns.h2.en, content.campaigns.h2.hi)}
            </h2>
            <p className="text-[15px]" style={{ color: LENITY.muted }}>{t(content.campaigns.sub.en, content.campaigns.sub.hi)}</p>
          </Fade>
          <div className="grid md:grid-cols-3 gap-7">
            {campaigns.map((c) => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <Fade key={c.titleEn}>
                  <div className="bg-white rounded-3xl border p-7 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                    <div className="flex items-start justify-between mb-5">
                      <h3 className="font-bold text-base leading-snug flex-1 pr-2" style={{ color: LENITY.ink, fontFamily: SERIF }}>
                        {t(c.titleEn, c.titleHi)}
                      </h3>
                      <span className="text-xs font-bold rounded-full px-2.5 py-1" style={{ color: LENITY.accent, background: `${LENITY.accent}14` }}>{pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ background: LENITY.line }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: LENITY.accent, transition: "width 1.2s ease" }} />
                    </div>
                    <div className="flex justify-between text-sm mb-1" style={{ color: LENITY.muted }}>
                      <span><span className="font-bold" style={{ color: LENITY.ink }}>₹{c.raised.toLocaleString("en-IN")}</span> raised</span>
                      <span className="text-xs">Goal: <span className="font-semibold">₹{c.goal.toLocaleString("en-IN")}</span></span>
                    </div>
                    <p className="text-xs mb-5" style={{ color: LENITY.muted }}>{c.backers} donors</p>
                    <button onClick={openDonate}
                      className="w-full rounded-full py-3 text-sm font-bold text-white transition-all hover:scale-[1.02]"
                      style={{ background: LENITY.accent }}>
                      {t(content.campaigns.btn.en, content.campaigns.btn.hi)}
                    </button>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ JOIN CTA ════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade>
            <div className="rounded-[2rem] px-8 py-14 text-center relative overflow-hidden" style={{ background: LENITY.accent }}>
              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/90">
                    <HandHeart className="w-4 h-4" />
                    {t(content.cta.tag.en, content.cta.tag.hi)}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: SERIF }}>
                  {t(content.cta.h2.en, content.cta.h2.hi)}
                </h2>
                <p className="text-white/85 text-base mb-9 max-w-xl mx-auto leading-relaxed">
                  {t(content.cta.sub.en, content.cta.sub.hi)}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/volunteer" className="bg-white rounded-full px-7 py-3.5 font-bold text-sm transition-all hover:scale-105" style={{ color: LENITY.accent }}>
                    {t(content.cta.vol.en, content.cta.vol.hi)}
                  </Link>
                  <button onClick={openDonate} className="rounded-full px-7 py-3.5 font-bold text-sm text-white border border-white/50 hover:bg-white/10 transition-all">
                    {t(content.cta.don.en, content.cta.don.hi)}
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ════════════ BLOG ════════════ */}
      <section className="py-24" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="flex items-end justify-between mb-12">
            <div>
              <div className="mb-3"><Eyebrow>{t(content.blog.tag.en, content.blog.tag.hi)}</Eyebrow></div>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: LENITY.ink, fontFamily: SERIF }}>
                {t(content.blog.h2.en, content.blog.h2.hi)}
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.accent }}>
              {t(content.blog.all.en, content.blog.all.hi)} <ArrowRight className="w-4 h-4" />
            </Link>
          </Fade>
          <div className="grid md:grid-cols-3 gap-7">
            {blogPosts.map((post) => (
              <Fade key={post.titleEn}>
                <div className="bg-white rounded-3xl border overflow-hidden h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                  <div className="h-48 relative overflow-hidden">
                    <img src={post.img} alt={t(post.titleEn, post.titleHi)} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full px-2.5 py-1 text-white" style={{ background: LENITY.accent }}>
                      {t(post.catEn, post.catHi)}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-[11px]" style={{ color: LENITY.muted }}>{post.date}</span>
                    <h3 className="font-bold text-base leading-snug my-2" style={{ color: LENITY.ink, fontFamily: SERIF }}>
                      {t(post.titleEn, post.titleHi)}
                    </h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: LENITY.muted }}>{t(post.excerptEn, post.excerptHi)}</p>
                    <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: LENITY.accent }}>
                      {t(content.blog.more.en, content.blog.more.hi)} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
