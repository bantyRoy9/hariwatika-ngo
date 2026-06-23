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
  ChevronDown, MessageCircle,
} from "lucide-react";

/* ─── Bilingual data ─────────────────────────────────────────── */
const content = {
  hero: {
    badge:    { en: "Serving Since 2000 — सेवा ही धर्म है", hi: "सेवा ही धर्म है — 2000 से समर्पित" },
    line1:    { en: "Marriage Assistance", hi: "विवाह सेवा" },
    line2:    { en: "Tree Plantation", hi: "वृक्षारोपण" },
    line3:    { en: "Poverty Relief", hi: "गरीब सहायता" },
    sub:      {
      en: "Hariwatika Shiv Mandir Vivah Sewa Samiti — transforming lives through community service in West Champaran, Bihar.",
      hi: "हरिवाटिका शिव मंदिर विवाह सेवा समिति — बिहार के पश्चिम चम्पारण में सामाजिक सेवा के माध्यम से जीवन बदल रहे हैं।",
    },
    cta1:     { en: "Donate Now", hi: "दान करें" },
    cta2:     { en: "Learn More", hi: "और जानें" },
    scroll:   { en: "Scroll to explore", hi: "नीचे देखें" },
  },
  stats: [
    { value: "25+",    en: "Years of Service",        hi: "सेवा के वर्ष",          sub: { en: "Since 2000", hi: "2000 से" } },
    { value: "5000+",  en: "Families Helped",         hi: "परिवारों की मदद",        sub: { en: "Garib Sahayata", hi: "गरीब सहायता" } },
    { value: "10000+", en: "Trees Planted",           hi: "वृक्ष लगाए",            sub: { en: "Vrikshaaropan", hi: "वृक्षारोपण" } },
    { value: "200+",   en: "Marriages Facilitated",   hi: "विवाह सम्पन्न",          sub: { en: "Vivah Seva", hi: "विवाह सेवा" } },
  ],
  whatWeDo: {
    tag:  { en: "Our Work", hi: "हमारा कार्य" },
    h2:   { en: "What We Do", hi: "हम क्या करते हैं" },
    sub:  { en: "Four pillars of community service that have impacted thousands across West Champaran.", hi: "चार सेवा स्तम्भ जिन्होंने पश्चिम चम्पारण में हज़ारों जीवन बदले।" },
  },
  campaigns: {
    tag:  { en: "Active Campaigns", hi: "सक्रिय अभियान" },
    h2:   { en: "Join Our Campaign", hi: "अभियान में भाग लें" },
    sub:  { en: "Support ongoing campaigns and help us reach our goals.", hi: "चल रहे अभियानों का समर्थन करें और हमें लक्ष्य तक पहुँचने में मदद करें।" },
    btn:  { en: "Support This Campaign", hi: "इस अभियान का साथ दें" },
  },
  cta: {
    tag:  { en: "Get Involved", hi: "हमसे जुड़ें" },
    h2:   { en: "Join Us Today", hi: "आज हमारे साथ जुड़ें" },
    sub:  { en: "Join hundreds of volunteers and donors making a real difference in West Champaran.", hi: "पश्चिम चम्पारण में असली बदलाव लाने वाले सैकड़ों स्वयंसेवकों और दानदाताओं के साथ जुड़ें।" },
    vol:  { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
    don:  { en: "Donate Now", hi: "दान करें" },
    wa:   { en: "WhatsApp Us", hi: "व्हाट्सएप करें" },
  },
  pillars: {
    tag:  { en: "Core Pillars", hi: "मुख्य आधार" },
    h2:   { en: "Four Pillars of Service", hi: "सेवा के चार आधार" },
  },
  blog: {
    tag:  { en: "Latest News", hi: "ताज़ा समाचार" },
    h2:   { en: "News & Updates", hi: "समाचार और अपडेट" },
    all:  { en: "View All", hi: "सब देखें" },
    more: { en: "Read More", hi: "और पढ़ें" },
  },
};

const services = [
  { icon: Heart,       titleEn: "Vivah Seva",       titleHi: "विवाह सेवा",    descEn: "Facilitating marriages for underprivileged families with complete ceremony arrangements and community support.", descHi: "गरीब परिवारों के लिए पूर्ण समारोह व्यवस्था के साथ विवाह की सुविधा प्रदान करना।", color: "#855300", bg: "#fff8f0" },
  { icon: TreePine,    titleEn: "Vrikshaaropan",    titleHi: "वृक्षारोपण",    descEn: "Large-scale tree plantation drives to green the region and improve air quality across West Champaran.", descHi: "क्षेत्र को हरा-भरा बनाने और वायु गुणवत्ता सुधारने के लिए वृहद वृक्षारोपण अभियान।", color: "#006d3e", bg: "#f0fdf4" },
  { icon: Users,       titleEn: "Garib Sahayata",   titleHi: "गरीब सहायता",   descEn: "Providing food, clothing, and essential goods to underprivileged and disaster-affected families.", descHi: "जरूरतमंद और आपदा प्रभावित परिवारों को भोजन, वस्त्र और आवश्यक सामान प्रदान करना।", color: "#855300", bg: "#fff8f0" },
  { icon: Stethoscope, titleEn: "Swasthya Seva",    titleHi: "स्वास्थ्य सेवा", descEn: "Free health camps and medical assistance programs for rural and low-income communities.", descHi: "ग्रामीण और कम आय वाले समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।", color: "#006d3e", bg: "#f0fdf4" },
];

const campaigns = [
  { titleEn: "Mass Marriage Ceremony 2025", titleHi: "सामूहिक विवाह समारोह 2025", raised: 85000, goal: 100000, backers: 42 },
  { titleEn: "10,000 Trees This Monsoon",   titleHi: "इस मानसून 10,000 पेड़",       raised: 32000, goal: 50000,  backers: 118 },
  { titleEn: "Winter Relief Drive",          titleHi: "शीतकालीन राहत अभियान",       raised: 18500, goal: 30000,  backers: 67 },
];

const pillars = [
  { icon: BookOpen,    en: "Education",   hi: "शिक्षा",   descEn: "Supporting children's education", descHi: "बच्चों की शिक्षा में सहयोग", color: "#855300" },
  { icon: Droplets,    en: "Water",       hi: "जल",       descEn: "Clean water access for all",      descHi: "सभी के लिए स्वच्छ जल",       color: "#006d3e" },
  { icon: Wheat,       en: "Food",        hi: "अन्न",      descEn: "No one sleeps hungry",           descHi: "कोई भूखा न सोए",               color: "#F4A433" },
  { icon: Stethoscope, en: "Healthcare",  hi: "स्वास्थ्य", descEn: "Free medical assistance",        descHi: "नि:शुल्क चिकित्सा सहायता",    color: "#855300" },
];

const blogPosts = [
  {
    date: "15 Dec 2024", catEn: "Event", catHi: "कार्यक्रम",
    titleEn: "Successful Saptapadi Vivah Mahotsav — 12 Couples Blessed",
    titleHi: "सफल सप्तपदी विवाह महोत्सव — 12 जोड़ों को आशीर्वाद",
    excerptEn: "This year's mass marriage ceremony witnessed 12 families unite under one roof with the blessings of Shiv Mandir.",
    excerptHi: "इस वर्ष के सामूहिक विवाह समारोह में शिव मंदिर के आशीर्वाद से 12 परिवार एक छत के नीचे मिले।",
  },
  {
    date: "05 Nov 2024", catEn: "Environment", catHi: "पर्यावरण",
    titleEn: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    titleHi: "वन महोत्सव: पश्चिम चम्पारण में 2000 पौधे लगाए",
    excerptEn: "Volunteers and community members planted 2000 saplings across Bettiah and surrounding villages.",
    excerptHi: "स्वयंसेवकों और समुदाय के सदस्यों ने बेतिया और आसपास के गांवों में 2000 पौधे लगाए।",
  },
  {
    date: "20 Oct 2024", catEn: "Relief", catHi: "राहत",
    titleEn: "Winter Blanket Distribution Reaches 500 Families",
    titleHi: "शीतकालीन कंबल वितरण 500 परिवारों तक पहुँचा",
    excerptEn: "Our team distributed warm blankets and essentials to 500 underprivileged families as winter approached.",
    excerptHi: "ठंड के मौसम में हमारी टीम ने 500 जरूरतमंद परिवारों को गर्म कंबल और आवश्यक सामान बाँटा।",
  },
];

/* ─── Scroll-fade hook ──────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

/* ─── Parallax hero bg ──────────────────────────────────────── */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

/* ─── Animated counter ──────────────────────────────────────── */
function Counter({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const dur = 1400;
      const step = 16;
      const total = Math.ceil(dur / step);
      let tick = 0;
      const id = setInterval(() => {
        tick++;
        const val = Math.round((tick / total) * num);
        setDisplay(val + suffix);
        if (tick >= total) { setDisplay(target); clearInterval(id); }
      }, step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{display}</span>;
}

/* ─── Particle component ────────────────────────────────────── */
const particles = [
  { size: 6,  top: "18%", left: "8%",  dur: "5s",  delay: "0s"   },
  { size: 4,  top: "35%", left: "92%", dur: "7s",  delay: "1s"   },
  { size: 8,  top: "65%", left: "5%",  dur: "6s",  delay: "2s"   },
  { size: 5,  top: "80%", left: "88%", dur: "8s",  delay: "0.5s" },
  { size: 3,  top: "50%", left: "50%", dur: "9s",  delay: "3s"   },
  { size: 6,  top: "25%", left: "75%", dur: "5.5s",delay: "1.5s" },
  { size: 4,  top: "70%", left: "30%", dur: "7.5s",delay: "2.5s" },
  { size: 7,  top: "10%", left: "55%", dur: "6.5s",delay: "0.8s" },
];

/* ─── Main Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const parallaxRef = useParallax();
  const { lang, t } = useLang();

  return (
    <>
      <Navbar />
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

      {/* ════════════════════════════════════════════════════════
          HERO SECTION — Parallax + Cinematic Overlay
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

        {/* ── Parallax background layer ── */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-16 -bottom-16 hero-parallax-bg"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 30%, rgba(133,83,0,0.55) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 80% 70%, rgba(244,164,51,0.25) 0%, transparent 55%),
              radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,109,62,0.15) 0%, transparent 70%),
              linear-gradient(160deg, #0e0700 0%, #2a1100 25%, #4a2000 50%, #1a0a00 75%, #0a0400 100%)
            `,
          }}
        />

        {/* ── Animated floating blobs ── */}
        <div className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full hero-blob-1 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(133,83,0,0.35) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full hero-blob-2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(244,164,51,0.2) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute top-[40%] right-[25%] w-64 h-64 rounded-full hero-blob-3 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,109,62,0.2) 0%, transparent 70%)", filter: "blur(35px)" }} />

        {/* ── Particle dots ── */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none particle"
            style={{
              width: p.size, height: p.size,
              top: p.top, left: p.left,
              background: i % 3 === 0 ? "#F4A433" : i % 3 === 1 ? "#ffffff" : "#48cc84",
              "--dur": p.dur, "--delay": p.delay,
            } as React.CSSProperties}
          />
        ))}

        {/* ── Diagonal light ray overlay ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full opacity-10"
            style={{ background: "linear-gradient(to bottom, transparent, #F4A433 40%, transparent)" }} />
          <div className="absolute top-0 left-2/3 w-px h-full opacity-8"
            style={{ background: "linear-gradient(to bottom, transparent, #ffffff 50%, transparent)" }} />
        </div>

        {/* ── Vignette edges ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />

        {/* ── Fine grain texture overlay ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }} />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16">

          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#F4A433] rounded-full px-5 py-2 text-sm font-semibold mb-8 shadow-lg">
            <Heart className="w-3.5 h-3.5 fill-[#F4A433]" />
            {t(content.hero.badge.en, content.hero.badge.hi)}
          </div>

          {/* Headline — stacked words with accent */}
          <h1 className="hero-title mb-6" style={{ fontFamily: "'Literata', serif" }}>
            <span className="block text-white/90 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {t(content.hero.line1.en, content.hero.line1.hi)}
            </span>
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mt-1"
              style={{
                background: "linear-gradient(135deg, #F4A433 0%, #ffd580 40%, #F4A433 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(content.hero.line2.en, content.hero.line2.hi)}
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/80 leading-tight mt-1">
              {t(content.hero.line3.en, content.hero.line3.hi)}
            </span>
          </h1>

          {/* Divider line */}
          <div className="hero-sub flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-[#F4A433]/50" />
            <span className="text-[#F4A433]/70 text-lg">॥</span>
            <div className="h-px w-16 bg-[#F4A433]/50" />
          </div>

          {/* Subtext */}
          <p className="hero-sub text-white/75 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t(content.hero.sub.en, content.hero.sub.hi)}
          </p>

          {/* CTA Buttons */}
          <div className="hero-btns flex flex-wrap items-center justify-center gap-3 mb-14">
            <button
              onClick={() => setDonateOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-base text-white transition-all duration-300 hover:scale-105 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #855300 0%, #b87000 100%)", boxShadow: "0 8px 32px rgba(133,83,0,0.5)" }}
            >
              <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
              {t(content.hero.cta1.en, content.hero.cta1.hi)}
            </button>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm text-white rounded-full px-8 py-4 font-semibold text-base transition-all duration-300 hover:scale-105"
            >
              {t(content.hero.cta2.en, content.hero.cta2.hi)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919473331919?text=नमस्ते%2C%20मैं%20हरिवाटिका%20समिति%20से%20जुड़ना%20चाहता%20हूँ।"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-white rounded-full px-6 py-4 font-semibold text-base transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Animated stat cards */}
          <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-3">
            {content.stats.map((s) => (
              <div
                key={s.en}
                className="relative overflow-hidden rounded-2xl border border-white/15 p-4 text-center stat-shimmer"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
              >
                <div
                  className="text-2xl sm:text-3xl font-bold text-[#F4A433]"
                  style={{ fontFamily: "'Literata', serif" }}
                >
                  <Counter target={s.value} />
                </div>
                <div className="text-white text-xs sm:text-sm font-semibold mt-1">
                  {t(s.en, s.hi)}
                </div>
                <div className="text-white/45 text-[10px] mt-0.5">
                  {t(s.sub.en, s.sub.hi)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
          <span className="text-white/40 text-[10px] tracking-widest uppercase">
            {t(content.hero.scroll.en, content.hero.scroll.hi)}
          </span>
          <ChevronDown className="w-5 h-5 text-[#F4A433]/60 bounce-down" />
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" className="w-full" style={{ display: "block" }}>
            <path
              d="M0,32 C240,72 480,8 720,40 C960,72 1200,16 1440,40 L1440,80 L0,80 Z"
              fill="#fbf9f4"
            />
          </svg>
        </div>
      </section>
      {/* ════ END HERO ════ */}

      {/* ── WHAT WE DO ── */}
      <section className="py-20 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
              {t(content.whatWeDo.tag.en, content.whatWeDo.tag.hi)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>
              {t(content.whatWeDo.h2.en, content.whatWeDo.h2.hi)}
            </h2>
            <p className="text-[#524435] mt-3 max-w-xl mx-auto text-sm sm:text-base">
              {t(content.whatWeDo.sub.en, content.whatWeDo.sub.hi)}
            </p>
          </Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <Fade key={svc.titleEn}>
                <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: svc.bg }}>
                    <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1b1c19] mb-1" style={{ fontFamily: "'Literata', serif" }}>
                    {t(svc.titleEn, svc.titleHi)}
                  </h3>
                  <p className="text-[#524435] text-sm leading-relaxed">
                    {t(svc.descEn, svc.descHi)}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPAIGNS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
              {t(content.campaigns.tag.en, content.campaigns.tag.hi)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>
              {t(content.campaigns.h2.en, content.campaigns.h2.hi)}
            </h2>
            <p className="text-[#524435] mt-3 max-w-xl mx-auto text-sm sm:text-base">
              {t(content.campaigns.sub.en, content.campaigns.sub.hi)}
            </p>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((c) => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <Fade key={c.titleEn}>
                  <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-[#1b1c19] text-base leading-snug flex-1 pr-2" style={{ fontFamily: "'Literata', serif" }}>
                        {t(c.titleEn, c.titleHi)}
                      </h3>
                      <span className="text-xs font-bold text-[#855300] bg-orange-50 rounded-full px-2.5 py-1">{pct}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #855300, #F4A433)" }} />
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span><span className="font-bold text-[#1b1c19]">₹{c.raised.toLocaleString("en-IN")}</span> <span className="text-[#524435] text-xs">raised</span></span>
                      <span className="text-[#524435] text-xs">Goal: <span className="font-semibold">₹{c.goal.toLocaleString("en-IN")}</span></span>
                    </div>
                    <p className="text-[#524435] text-xs mb-4">{c.backers} donors</p>
                    <button
                      onClick={() => setDonateOpen(true)}
                      className="w-full bg-[#855300] hover:bg-[#653e00] text-white rounded-full py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                    >
                      {t(content.campaigns.btn.en, content.campaigns.btn.hi)}
                    </button>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3d1f00 0%, #855300 50%, #4a2500 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#F4A433]/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Fade>
            <span className="inline-block bg-white/15 backdrop-blur-sm text-white rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
              {t(content.cta.tag.en, content.cta.tag.hi)}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Literata', serif" }}>
              {t(content.cta.h2.en, content.cta.h2.hi)}
            </h2>
            <p className="text-white/75 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {t(content.cta.sub.en, content.cta.sub.hi)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/volunteer" className="bg-white text-[#855300] hover:bg-orange-50 rounded-full px-7 py-3.5 font-bold text-sm transition-all duration-200 shadow-xl hover:scale-105">
                {t(content.cta.vol.en, content.cta.vol.hi)}
              </Link>
              <button onClick={() => setDonateOpen(true)} className="bg-[#1b1c19] text-white hover:bg-black rounded-full px-7 py-3.5 font-bold text-sm transition-all duration-200 hover:scale-105">
                {t(content.cta.don.en, content.cta.don.hi)}
              </button>
              <a
                href="https://wa.me/919473331919?text=नमस्ते%2C%20मैं%20हरिवाटिका%20समिति%20से%20जुड़ना%20चाहता%20हूँ।"
                target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] text-white hover:bg-[#1da851] rounded-full px-7 py-3.5 font-bold text-sm transition-all duration-200 hover:scale-105"
              >
                {t(content.cta.wa.en, content.cta.wa.hi)}
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CORE PILLARS ── */}
      <section className="py-20 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
              {t(content.pillars.tag.en, content.pillars.tag.hi)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>
              {t(content.pillars.h2.en, content.pillars.h2.hi)}
            </h2>
          </Fade>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <Fade key={p.en}>
                <div className="bg-white rounded-2xl border border-[#e4e2dd] p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${p.color}18` }}>
                    <p.icon className="w-7 h-7" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-bold text-[#1b1c19] text-lg" style={{ fontFamily: "'Literata', serif" }}>
                    {t(p.en, p.hi)}
                  </h3>
                  <p className="text-[#524435] text-xs mt-1">{t(p.descEn, p.descHi)}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block bg-orange-100 text-[#855300] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                {t(content.blog.tag.en, content.blog.tag.hi)}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1b1c19]" style={{ fontFamily: "'Literata', serif" }}>
                {t(content.blog.h2.en, content.blog.h2.hi)}
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-[#855300] hover:text-[#653e00] text-sm font-semibold transition-colors">
              {t(content.blog.all.en, content.blog.all.hi)} <ArrowRight className="w-4 h-4" />
            </Link>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Fade key={post.titleEn}>
                <div className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-44 flex items-center justify-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #fff1d6 0%, #ffe4a0 50%, #ffd580 100%)" }}>
                    <Heart className="w-14 h-14 text-[#855300]/20 fill-[#855300]/10" />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold text-[#855300] bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1">
                        {t(post.catEn, post.catHi)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] text-[#524435]">{post.date}</span>
                    <h3 className="font-semibold text-[#1b1c19] text-base leading-snug my-2" style={{ fontFamily: "'Literata', serif" }}>
                      {t(post.titleEn, post.titleHi)}
                    </h3>
                    <p className="text-[#524435] text-xs leading-relaxed">{t(post.excerptEn, post.excerptHi)}</p>
                    <Link href="/blog" className="inline-flex items-center gap-1 mt-3 text-[#855300] hover:text-[#653e00] text-xs font-semibold transition-colors">
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
