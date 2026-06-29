"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import HeroSlider from "@/components/HeroSlider";
import StickyQRDonate from "@/components/StickyQRDonate";
import { useLang } from "@/context/LanguageContext";
import {
  TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight,
  Quote,
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

const IMG = {
  hero:     "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&auto=format&fit=crop",
  portrait1:"https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop",
  portrait2:"https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80&auto=format&fit=crop",
  portrait3:"https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&q=80&auto=format&fit=crop",
  quote:    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80&auto=format&fit=crop",
  svc: [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
  ],
};

/* ─────────────────────────────────────────────────────────────
   BILINGUAL CONTENT
───────────────────────────────────────────────────────────── */
const content = {
  hero: {
    eyebrow: { en: "Hariwatika Sewa Samiti", hi: "हरिवाटिका सेवा समिति" },
    line1:   { en: "A Relentless", hi: "अटूट" },
    line2:   { en: "Pursuit.", hi: "सेवा।" },
    tagline: { en: "Bringing dignity, healthcare, and lasting change to families across Bihar.", hi: "बिहार के परिवारों को सम्मान, स्वास्थ्य और स्थायी बदलाव देने का संकल्प।" },
    sub: {
      en: "For over 25 years Hariwatika has planted forests, provided healthcare, and stood with the poor across West Champaran — funded by a network of donors and volunteers who believe in this work.",
      hi: "25 वर्षों से हरिवाटिका ने पश्चिम चम्पारण में वृक्षारोपण, स्वास्थ्य सेवा और गरीब सहायता की है — दानदाताओं और स्वयंसेवकों के सहयोग से।",
    },
    cta1: { en: "Donate Now", hi: "दान करें" },
    cta2: { en: "Our Work", hi: "हमारा काम" },
    scroll: { en: "Learn More", hi: "और जानें" },
  },
  about: {
    h2:  { en: "Consistent Service", hi: "निरंतर सेवा" },
    lead:{ en: "A quarter-century of compassion. What does it mean to you?", hi: "एक चौथाई सदी की करुणा। आपके लिए इसका क्या अर्थ है?" },
    p1: {
      en: "For more than 25 years, Hariwatika has been resolute in our goal to expand dignity and opportunity to families who need it most. As a community rooted in seva, we've moved with every step of the way and, together, we've achieved a lot.",
      hi: "25 वर्षों से हरिवाटिका उन परिवारों तक सम्मान और अवसर पहुँचाने में दृढ़ रहा है जिन्हें इसकी सबसे अधिक आवश्यकता है। सेवा में निहित समुदाय के रूप में, हमने हर कदम साथ चलकर बहुत कुछ हासिल किया है।",
    },
    p2: {
      en: "That means more families than ever have access to healthcare, education, and relief. We know that access to dignity is critically important — but too often it is not enough. What about the quality of that care?",
      hi: "इसका अर्थ है कि पहले से कहीं अधिक परिवारों को स्वास्थ्य, शिक्षा और राहत तक पहुँच है। हम जानते हैं कि सम्मान तक पहुँच महत्वपूर्ण है — पर अक्सर पर्याप्त नहीं। उस सेवा की गुणवत्ता का क्या?",
    },
    more: { en: "Read More", hi: "और पढ़ें" },
  },
  quote: {
    text: { en: "Together with our partners, we are working toward a community where every child gets an education, every family has clean water, and high-quality, effective and affordable care reaches everyone.", hi: "अपने सहयोगियों के साथ, हम ऐसे समाज की ओर काम कर रहे हैं जहाँ हर बच्चे को शिक्षा, हर परिवार को स्वच्छ जल और उत्तम स्वास्थ्य सेवा मिले।" },
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
    { value: "200+",   en: "Volunteers Trained",     hi: "स्वयंसेवक प्रशिक्षित" },
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
  { icon: BookOpen,    titleEn: "Shiksha Seva",   titleHi: "शिक्षा सेवा",   descEn: "Supporting education for underprivileged children through scholarships and learning materials.", descHi: "जरूरतमंद बच्चों की शिक्षा में सहयोग — छात्रवृत्ति और सामग्री।" },
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
  { titleEn: "Clean Water for 50 Villages", titleHi: "50 गांवों में स्वच्छ जल", raised: 85000, goal: 100000, backers: 42 },
  { titleEn: "10,000 Trees This Monsoon",   titleHi: "इस मानसून 10,000 पेड़",       raised: 32000, goal: 50000,  backers: 118 },
  { titleEn: "Winter Relief Drive",          titleHi: "शीतकालीन राहत अभियान",       raised: 18500, goal: 30000,  backers: 67 },
];

const blogPosts = [
  { date: "15 Dec 2024", catEn: "Education",    catHi: "शिक्षा", img: IMG.svc[0],
    titleEn: "150 Children Receive School Scholarships This Year",
    titleHi: "इस वर्ष 150 बच्चों को स्कूल छात्रवृत्ति मिली",
    excerptEn: "Hariwatika's education drive reached 150 underprivileged children with scholarships and learning kits.",
    excerptHi: "हरिवाटिका के शिक्षा अभियान ने 150 जरूरतमंद बच्चों को छात्रवृत्ति और शिक्षण सामग्री दी।" },
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
  const { t } = useLang();
  const openDonate = () => setDonateOpen(true);

  return (
    <>
      <Navbar />
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
      <StickyQRDonate />

      {/* ════════════ HERO SLIDER ════════════ */}
      <HeroSlider onDonate={openDonate} />

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
