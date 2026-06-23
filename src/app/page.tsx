"use client";

import { useState, useEffect, useRef, Suspense, lazy } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import { useLang } from "@/context/LanguageContext";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useTyped } from "@/hooks/useTyped";
import {
  Heart, TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight,
  ChevronDown, MessageCircle, Star,
} from "lucide-react";

/* lazy-load heavy 3D canvas */
const Hero3DCanvas = lazy(() => import("@/components/Hero3DCanvas"));

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
  stats: [
    { value: "25+",    en: "Years of Service",      hi: "सेवा के वर्ष",       sub: { en: "Since 2000",      hi: "2000 से"        } },
    { value: "5000+",  en: "Families Helped",       hi: "परिवारों की मदद",    sub: { en: "Garib Sahayata",  hi: "गरीब सहायता"    } },
    { value: "10000+", en: "Trees Planted",         hi: "वृक्ष लगाए",         sub: { en: "Vrikshaaropan",   hi: "वृक्षारोपण"     } },
    { value: "200+",   en: "Marriages Facilitated", hi: "विवाह सम्पन्न",       sub: { en: "Vivah Seva",      hi: "विवाह सेवा"     } },
  ],
  whatWeDo: {
    tag: { en: "Our Work",          hi: "हमारा कार्य"       },
    h2:  { en: "What We Do",        hi: "हम क्या करते हैं"  },
    sub: {
      en: "Four pillars of community service that have impacted thousands across West Champaran.",
      hi: "चार सेवा स्तम्भ जिन्होंने पश्चिम चम्पारण में हज़ारों जीवन बदले।",
    },
  },
  campaigns: {
    tag: { en: "Active Campaigns",       hi: "सक्रिय अभियान"              },
    h2:  { en: "Join Our Campaign",      hi: "अभियान में भाग लें"          },
    sub: { en: "Support ongoing campaigns and help us reach our goals.", hi: "चल रहे अभियानों का समर्थन करें और हमें लक्ष्य तक पहुँचने में मदद करें।" },
    btn: { en: "Support This Campaign",  hi: "इस अभियान का साथ दें"        },
  },
  cta: {
    tag: { en: "Get Involved",    hi: "हमसे जुड़ें"              },
    h2:  { en: "Join Us Today",   hi: "आज हमारे साथ जुड़ें"      },
    sub: { en: "Join hundreds of volunteers and donors making a real difference in West Champaran.", hi: "पश्चिम चम्पारण में असली बदलाव लाने वाले सैकड़ों स्वयंसेवकों के साथ जुड़ें।" },
    vol: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें"         },
    don: { en: "Donate Now",      hi: "दान करें"                 },
    wa:  { en: "WhatsApp Us",     hi: "व्हाट्सएप करें"           },
  },
  pillars: {
    tag: { en: "Core Pillars",          hi: "मुख्य आधार"         },
    h2:  { en: "Four Pillars of Service", hi: "सेवा के चार आधार" },
  },
  blog: {
    tag:  { en: "Latest News", hi: "ताज़ा समाचार" },
    h2:   { en: "News & Updates", hi: "समाचार और अपडेट" },
    all:  { en: "View All",    hi: "सब देखें"    },
    more: { en: "Read More",   hi: "और पढ़ें"    },
  },
};

/* ── Data arrays ── */
const services = [
  { icon: Heart,       titleEn: "Vivah Seva",     titleHi: "विवाह सेवा",    descEn: "Facilitating marriages for underprivileged families with complete ceremony arrangements.", descHi: "गरीब परिवारों के लिए पूर्ण समारोह व्यवस्था के साथ विवाह सुविधा।", color: "#855300", bg: "#fff8f0" },
  { icon: TreePine,    titleEn: "Vrikshaaropan",  titleHi: "वृक्षारोपण",   descEn: "Large-scale tree plantation drives to green the region across West Champaran.", descHi: "क्षेत्र को हरा-भरा बनाने के लिए वृहद वृक्षारोपण अभियान।", color: "#006d3e", bg: "#f0fdf4" },
  { icon: Users,       titleEn: "Garib Sahayata", titleHi: "गरीब सहायता",   descEn: "Food, clothing, and essentials to underprivileged and disaster-affected families.", descHi: "जरूरतमंद परिवारों को भोजन, वस्त्र और आवश्यक सामान।", color: "#855300", bg: "#fff8f0" },
  { icon: Stethoscope, titleEn: "Swasthya Seva",  titleHi: "स्वास्थ्य सेवा", descEn: "Free health camps and medical assistance for rural low-income communities.", descHi: "ग्रामीण समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर।", color: "#006d3e", bg: "#f0fdf4" },
];

const campaigns = [
  { titleEn: "Mass Marriage Ceremony 2025", titleHi: "सामूहिक विवाह समारोह 2025", raised: 85000, goal: 100000, backers: 42 },
  { titleEn: "10,000 Trees This Monsoon",   titleHi: "इस मानसून 10,000 पेड़",       raised: 32000, goal: 50000,  backers: 118 },
  { titleEn: "Winter Relief Drive",          titleHi: "शीतकालीन राहत अभियान",       raised: 18500, goal: 30000,  backers: 67 },
];

const pillars = [
  { icon: BookOpen,    en: "Education",  hi: "शिक्षा",    descEn: "Supporting children's education", descHi: "बच्चों की शिक्षा में सहयोग", color: "#855300" },
  { icon: Droplets,    en: "Water",      hi: "जल",        descEn: "Clean water access for all",      descHi: "सभी के लिए स्वच्छ जल",       color: "#006d3e" },
  { icon: Wheat,       en: "Food",       hi: "अन्न",       descEn: "No one sleeps hungry",           descHi: "कोई भूखा न सोए",               color: "#F4A433" },
  { icon: Stethoscope, en: "Healthcare", hi: "स्वास्थ्य",  descEn: "Free medical assistance",        descHi: "नि:शुल्क चिकित्सा सहायता",    color: "#855300" },
];

const blogPosts = [
  { date: "15 Dec 2024", catEn: "Event",       catHi: "कार्यक्रम",
    titleEn: "Successful Saptapadi Vivah Mahotsav — 12 Couples Blessed",
    titleHi: "सफल सप्तपदी विवाह महोत्सव — 12 जोड़ों को आशीर्वाद",
    excerptEn: "This year's mass marriage ceremony witnessed 12 families unite under Shiv Mandir's blessings.",
    excerptHi: "इस वर्ष शिव मंदिर के आशीर्वाद से 12 परिवार एक छत के नीचे मिले।" },
  { date: "05 Nov 2024", catEn: "Environment", catHi: "पर्यावरण",
    titleEn: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    titleHi: "वन महोत्सव: पश्चिम चम्पारण में 2000 पौधे लगाए",
    excerptEn: "Volunteers planted 2000 saplings across Bettiah and surrounding villages.",
    excerptHi: "स्वयंसेवकों ने बेतिया और आसपास के गांवों में 2000 पौधे लगाए।" },
  { date: "20 Oct 2024", catEn: "Relief",      catHi: "राहत",
    titleEn: "Winter Blanket Distribution Reaches 500 Families",
    titleHi: "शीतकालीन कंबल वितरण 500 परिवारों तक पहुँचा",
    excerptEn: "Our team distributed warm blankets to 500 underprivileged families as winter approached.",
    excerptHi: "ठंड में हमारी टीम ने 500 जरूरतमंद परिवारों को गर्म कंबल बाँटे।" },
];

/* ── Scroll fade hook ── */
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

/* ── 3D tilt card ── */
function TiltCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale3d(1.03,1.03,1.03)`;
    const shine = el.querySelector<HTMLElement>(".card-shine");
    if (shine) { shine.style.setProperty("--mx", `${(x + 0.5) * 100}%`); shine.style.setProperty("--my", `${(y + 0.5) * 100}%`); }
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={`tilt-card ${className}`} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="card-shine" />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION COMPONENT — pure CSS parallax + 3D canvas
═══════════════════════════════════════════════════════════════ */
function HeroSection({
  onDonate, lang, t,
}: {
  onDonate: () => void;
  lang: string;
  t: (en: string, hi: string) => string;
}) {
  const mouse   = useMouseParallax();
  const phrases = lang === "hi" ? content.hero.typed.hi : content.hero.typed.en;
  const { displayed, cursor } = useTyped(phrases, 65, 38, 1600);

  /* scroll-based parallax on bg gradient */
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bgRef.current; if (!el) return;
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.3}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const layer = (depth: number) => ({
    transform: `translate(${mouse.x * depth * 28}px, ${mouse.y * depth * 20}px)`,
    transition: "transform 0.12s ease-out",
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Layer 0: deep parallax gradient ── */}
      <div ref={bgRef} className="absolute inset-0 -top-20 -bottom-20 hex-grid" style={{
        background: "linear-gradient(155deg, #080300 0%, #1c0900 18%, #3b1600 36%, #5c2a00 52%, #2e1200 70%, #0d0500 100%)",
      }} />

      {/* ── Layer 1: radial light bleed (mid parallax) ── */}
      <div className="absolute inset-0 pointer-events-none" style={layer(0.6)}>
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full hero-blob-1"
          style={{ background: "radial-gradient(circle, rgba(133,83,0,0.4) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[15%] right-[10%] w-[600px] h-[600px] rounded-full hero-blob-2"
          style={{ background: "radial-gradient(circle, rgba(244,164,51,0.22) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div className="absolute top-[45%] right-[30%] w-[350px] h-[350px] rounded-full hero-blob-3"
          style={{ background: "radial-gradient(circle, rgba(0,109,62,0.18) 0%, transparent 65%)", filter: "blur(50px)" }} />
      </div>

      {/* ── Layer 2: 3D Three.js canvas ── */}
      <div className="canvas-3d-container">
        <Suspense fallback={null}>
          <Hero3DCanvas />
        </Suspense>
      </div>

      {/* ── Layer 3: floating geometric shapes (HTML, fast parallax) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={layer(1.4)}>
        {/* big outer ring */}
        <div className="absolute top-[8%] right-[5%] w-56 h-56 rounded-full border border-[#F4A433]/15 gradient-ring opacity-60" />
        {/* small rings */}
        <div className="absolute bottom-[20%] left-[8%] w-28 h-28 rounded-full border border-[#F4A433]/20" style={{ animation: "blob-drift 10s ease-in-out infinite" }} />
        <div className="absolute top-[60%] right-[12%] w-20 h-20 rounded-full border border-white/10" style={{ animation: "blob-drift2 13s ease-in-out infinite" }} />
        {/* diamond shapes */}
        <div className="absolute top-[30%] left-[5%] w-10 h-10 rotate-45 border border-[#48cc84]/30 rounded-sm" style={{ animation: "blob-drift 8s 1s ease-in-out infinite" }} />
        <div className="absolute bottom-[30%] right-[6%] w-8 h-8 rotate-45 bg-[#F4A433]/10 border border-[#F4A433]/30 rounded-sm" style={{ animation: "blob-drift2 11s ease-in-out infinite" }} />
      </div>

      {/* ── Layer 4: particles (fastest parallax) ── */}
      <div className="absolute inset-0 pointer-events-none" style={layer(2)}>
        {[
          { s:5, t:"12%", l:"7%",  c:"#F4A433", d:"5s",   dl:"0s"   },
          { s:3, t:"28%", l:"93%", c:"#ffffff", d:"7s",   dl:"1s"   },
          { s:6, t:"70%", l:"4%",  c:"#48cc84", d:"6s",   dl:"2s"   },
          { s:4, t:"85%", l:"90%", c:"#F4A433", d:"8s",   dl:"0.5s" },
          { s:5, t:"45%", l:"48%", c:"#ffffff", d:"9s",   dl:"3s"   },
          { s:3, t:"18%", l:"72%", c:"#48cc84", d:"5.5s", dl:"1.5s" },
          { s:4, t:"75%", l:"28%", c:"#F4A433", d:"7.5s", dl:"2.5s" },
          { s:6, t:"5%",  l:"52%", c:"#ffffff", d:"6.5s", dl:"0.8s" },
          { s:3, t:"55%", l:"82%", c:"#48cc84", d:"10s",  dl:"1.2s" },
          { s:5, t:"38%", l:"20%", c:"#ffd580", d:"8.5s", dl:"0.3s" },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full particle glow-dot"
            style={{ width: p.s, height: p.s, top: p.t, left: p.l, background: p.c,
              "--dur": p.d, "--delay": p.dl } as React.CSSProperties} />
        ))}
      </div>

      {/* ── Cinematic vignette ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />

      {/* ── Grain overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">

        {/* Trust badge */}
        <div className="hero-enter-0 inline-flex items-center gap-2.5 mb-8">
          <div className="flex items-center gap-2 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full pl-3 pr-4 py-2 shadow-2xl">
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#F4A433] text-[#F4A433]" />)}
            </span>
            <span className="text-[#F4A433] text-xs font-bold tracking-wide">
              {t("Serving Since 2000", "2000 से सेवा में समर्पित")}
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/70 text-xs">{t("Bihar, India", "बिहार, भारत")}</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="hero-enter-1 mb-3">
          <p className="text-white/60 text-lg sm:text-xl font-light tracking-widest uppercase mb-2">
            {t(content.hero.line1.en, content.hero.line1.hi)}
          </p>
        </div>

        {/* Typed headline */}
        <div className="hero-enter-2 mb-6">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none hero-glow-text"
            style={{
              fontFamily: "'Literata', serif",
              background: "linear-gradient(135deg, #F4A433 0%, #ffd580 30%, #ffffff 55%, #F4A433 80%, #b87000 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
            {displayed}
            <span className="typed-cursor" style={{ opacity: cursor ? 1 : 0 }} />
          </h1>
        </div>

        {/* Ornamental divider */}
        <div className="hero-enter-3 flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(244,164,51,0.6))" }} />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F4A433]" />
            <div className="w-2 h-2 rounded-full bg-[#F4A433]/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#F4A433]" />
          </div>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(244,164,51,0.6))" }} />
        </div>

        {/* Subtext */}
        <p className="hero-enter-3 text-white/65 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {t(content.hero.sub.en, content.hero.sub.hi)}
        </p>

        {/* CTA buttons */}
        <div className="hero-enter-4 flex flex-wrap items-center justify-center gap-3 mb-14">
          <button onClick={onDonate}
            className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-4 font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6b3500 0%, #a05500 40%, #c87800 100%)", boxShadow: "0 6px 40px rgba(133,83,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-full" />
            <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10">{t(content.hero.cta1.en, content.hero.cta1.hi)}</span>
          </button>

          <Link href="/projects"
            className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/20 backdrop-blur-md text-white rounded-full px-8 py-4 font-semibold text-base transition-all duration-300 hover:scale-105">
            {t(content.hero.cta2.en, content.hero.cta2.hi)}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a href="https://wa.me/919473331919?text=Hello%2C%20I%20want%20to%20join%20Hariwatika%20Samiti."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-white rounded-full px-6 py-4 font-semibold text-base transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            WhatsApp
          </a>
        </div>

        {/* Stat cards with 3D tilt */}
        <div className="hero-enter-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {content.stats.map((s) => (
            <TiltCard key={s.en}
              className="relative overflow-hidden rounded-2xl border border-white/[0.12] p-4 text-center cursor-default"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}>
              <div className="absolute inset-0 stat-shimmer rounded-2xl" />
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-[#F4A433]" style={{ fontFamily: "'Literata', serif" }}>
                  <Counter target={s.value} />
                </div>
                <div className="text-white text-xs sm:text-sm font-semibold mt-1">{t(s.en, s.hi)}</div>
                <div className="text-white/40 text-[10px] mt-0.5">{t(s.sub.en, s.sub.hi)}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/35 text-[9px] tracking-[0.3em] uppercase">{t(content.hero.scroll.en, content.hero.scroll.hi)}</span>
        <div className="w-px h-10 overflow-hidden relative">
          <div className="scroll-line absolute top-0 left-0 w-full" />
        </div>
        <ChevronDown className="w-4 h-4 text-[#F4A433]/50 bounce-down" />
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 90" className="w-full block">
          <path d="M0,45 C180,85 360,10 540,45 C720,80 900,15 1080,45 C1260,75 1380,20 1440,45 L1440,90 L0,90 Z" fill="#fbf9f4" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const { lang, t } = useLang();

  return (
    <>
      <Navbar />
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

      <HeroSection onDonate={() => setDonateOpen(true)} lang={lang} t={t} />

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
                <TiltCard className="bg-white rounded-2xl border border-[#e4e2dd] p-6 h-full cursor-default">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: svc.bg }}>
                    <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1b1c19] mb-1" style={{ fontFamily: "'Literata', serif" }}>
                    {t(svc.titleEn, svc.titleHi)}
                  </h3>
                  <p className="text-[#524435] text-sm leading-relaxed">{t(svc.descEn, svc.descHi)}</p>
                </TiltCard>
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
                  <TiltCard className="bg-white rounded-2xl border border-[#e4e2dd] p-6 cursor-default">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-[#1b1c19] text-base leading-snug flex-1 pr-2" style={{ fontFamily: "'Literata', serif" }}>
                        {t(c.titleEn, c.titleHi)}
                      </h3>
                      <span className="text-xs font-bold text-[#855300] bg-orange-50 rounded-full px-2.5 py-1">{pct}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#6b3500,#F4A433)", transition: "width 1.2s ease" }} />
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span><span className="font-bold text-[#1b1c19]">₹{c.raised.toLocaleString("en-IN")}</span> <span className="text-[#524435] text-xs">raised</span></span>
                      <span className="text-[#524435] text-xs">Goal: <span className="font-semibold">₹{c.goal.toLocaleString("en-IN")}</span></span>
                    </div>
                    <p className="text-[#524435] text-xs mb-4">{c.backers} donors</p>
                    <button onClick={() => setDonateOpen(true)}
                      className="w-full text-white rounded-full py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg,#855300,#b87000)" }}>
                      {t(content.campaigns.btn.en, content.campaigns.btn.hi)}
                    </button>
                  </TiltCard>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2a1000 0%, #6b3500 40%, #a05500 70%, #3d1900 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl hero-blob-1" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#F4A433]/10 blur-3xl hero-blob-2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Fade>
            <span className="inline-block bg-white/15 backdrop-blur-sm text-white rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
              {t(content.cta.tag.en, content.cta.tag.hi)}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Literata', serif" }}>
              {t(content.cta.h2.en, content.cta.h2.hi)}
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {t(content.cta.sub.en, content.cta.sub.hi)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/volunteer" className="bg-white text-[#855300] hover:bg-orange-50 rounded-full px-7 py-3.5 font-bold text-sm transition-all hover:scale-105 shadow-xl">
                {t(content.cta.vol.en, content.cta.vol.hi)}
              </Link>
              <button onClick={() => setDonateOpen(true)} className="bg-[#1b1c19] text-white hover:bg-black rounded-full px-7 py-3.5 font-bold text-sm transition-all hover:scale-105">
                {t(content.cta.don.en, content.cta.don.hi)}
              </button>
              <a href="https://wa.me/919473331919?text=Hello%2C%20I%20want%20to%20join%20Hariwatika%20Samiti."
                target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] text-white hover:bg-[#1da851] rounded-full px-7 py-3.5 font-bold text-sm transition-all hover:scale-105">
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
                <TiltCard className="bg-white rounded-2xl border border-[#e4e2dd] p-6 text-center cursor-default">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${p.color}18` }}>
                    <p.icon className="w-7 h-7" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-bold text-[#1b1c19] text-lg" style={{ fontFamily: "'Literata', serif" }}>{t(p.en, p.hi)}</h3>
                  <p className="text-[#524435] text-xs mt-1">{t(p.descEn, p.descHi)}</p>
                </TiltCard>
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
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-[#855300] hover:text-[#653e00] text-sm font-semibold">
              {t(content.blog.all.en, content.blog.all.hi)} <ArrowRight className="w-4 h-4" />
            </Link>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Fade key={post.titleEn}>
                <TiltCard className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden cursor-default">
                  <div className="h-44 flex items-center justify-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg,#fff1d6,#ffe4a0 50%,#ffd580)" }}>
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
                    <Link href="/blog" className="inline-flex items-center gap-1 mt-3 text-[#855300] hover:text-[#653e00] text-xs font-semibold">
                      {t(content.blog.more.en, content.blog.more.hi)} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </TiltCard>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
