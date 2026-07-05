"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DonationModal from "@/components/DonationModal";
import HeroSlider from "@/components/HeroSlider";
import StickyQRDonate from "@/components/StickyQRDonate";
import HorizontalCardSlider from "@/components/HorizontalCardSlider";
import MarqueeText from "@/components/MarqueeText";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ProgramsGrid from "@/components/ProgramsGrid";
import LogoCarousel from "@/components/LogoCarousel";
import PremiumStorySection from "@/components/PremiumStorySection";
import { useLang } from "@/context/LanguageContext";
import {
  TreePine, Users, Stethoscope,
  BookOpen, Droplets, Wheat, ArrowRight,
  Quote, Heart, type LucideIcon,
} from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

export type HomeServiceData = { id: number; iconName: string; titleEn: string; titleHi: string; descEn: string; descHi: string };
export type HomeStatData = { id: number; value: string; labelEn: string; labelHi: string };
export type HomeCampaignData = { id: number; titleEn: string; titleHi: string; raised: number; goal: number; backers: number };
export type HomePillarData = { id: number; iconName: string; titleEn: string; titleHi: string; descEn: string; descHi: string };
export type HomeSettings = Record<string, { en: string; hi: string; img: string | null }>;

interface HomeContentProps {
  services: HomeServiceData[];
  stats: HomeStatData[];
  campaigns: HomeCampaignData[];
  pillars: HomePillarData[];
  settings: HomeSettings;
}

const SVC_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
];

const ICONS: Record<string, LucideIcon> = { Heart, TreePine, Users, Stethoscope, BookOpen, Droplets, Wheat };
const iconFor = (name: string): LucideIcon => ICONS[name] ?? Heart;

const blogPosts = [
  { date: "15 Dec 2024", catEn: "Education",    catHi: "शिक्षा", img: SVC_IMAGES[0],
    titleEn: "150 Children Receive School Scholarships This Year",
    titleHi: "इस वर्ष 150 बच्चों को स्कूल छात्रवृत्ति मिली",
    excerptEn: "Hariwatika's education drive reached 150 underprivileged children with scholarships and learning kits.",
    excerptHi: "हरिवाटिका के शिक्षा अभियान ने 150 जरूरतमंद बच्चों को छात्रवृत्ति और शिक्षण सामग्री दी।" },
  { date: "05 Nov 2024", catEn: "Environment", catHi: "पर्यावरण", img: SVC_IMAGES[1],
    titleEn: "Van Mahotsav: 2000 Saplings Planted in West Champaran",
    titleHi: "वन महोत्सव: पश्चिम चम्पारण में 2000 पौधे लगाए",
    excerptEn: "Volunteers planted 2000 saplings across Bettiah and surrounding villages.",
    excerptHi: "स्वयंसेवकों ने बेतिया और आसपास के गांवों में 2000 पौधे लगाए।" },
  { date: "20 Oct 2024", catEn: "Relief",      catHi: "राहत", img: SVC_IMAGES[2],
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
export default function HomeContent({ services, stats, campaigns, pillars, settings }: HomeContentProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const { t } = useLang();
  const openDonate = () => setDonateOpen(true);

  const s = (key: string) => settings[key] ?? { en: "", hi: "", img: null as string | null };

  return (
    <>
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
      <StickyQRDonate />

      {/* ════════════ HERO SLIDER ════════════ */}
      <HeroSlider onDonate={openDonate} />

      {/* ════════════ MARQUEE TEXT BANNER ════════════ */}
      <div style={{ background: LENITY.accent, padding: "1rem 0" }}>
        <MarqueeText
          texts={[
            t("HARIWATIKA SEWA SAMITI", "हरिवाटिका सेवा समिति"),
            "✦",
            t("25 YEARS OF SERVICE", "25 वर्षों की सेवा"),
            "✦",
            t("TRANSFORMING LIVES", "जीवन बदलना"),
            "✦",
            t("BUILDING COMMUNITIES", "समुदाय बनाना"),
            "✦",
          ]}
          speed={40}
          direction="left"
          textClassName="text-white text-lg md:text-xl font-bold tracking-wider"
        />
      </div>

      {/* ════════════ MISSION & VISION ════════════ */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-16">
            <Eyebrow>{t("Our Purpose", "हमारा उद्देश्य")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Mission & Vision", "मिशन और विज़न")}
            </h2>
            <p className="text-base md:text-lg italic" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t("Guiding our path to serve communities with compassion and dedication", "करुणा और समर्पण के साथ समुदायों की सेवा करने का हमारा मार्ग")}
            </p>
          </Fade>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Card */}
            <Fade>
              <div className="bg-white rounded-2xl border p-8 md:p-10 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.yellowSoft }}>
                    <svg className="w-7 h-7" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                    {t("Our Mission", "हमारा मिशन")}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: LENITY.muted }}>
                  {t(
                    "At Hariwatika Sewa Samiti, our mission is simple yet profound: to provide assistance and support to those in need. We believe every person deserves the opportunity to lead a dignified life, free from the burdens of poverty and hardship. Through our comprehensive programs, we aim to create a positive impact in the lives of individuals and families, fostering a spirit of resilience and hope.",
                    "हरिवाटिका सेवा समिति में, हमारा मिशन सरल लेकिन गहरा है: जरूरतमंदों को सहायता और समर्थन प्रदान करना। हम मानते हैं कि हर व्यक्ति गरिमापूर्ण जीवन जीने का हकदार है। हमारे व्यापक कार्यक्रमों के माध्यम से, हम व्यक्तियों और परिवारों के जीवन में सकारात्मक प्रभाव डालने का लक्ष्य रखते हैं।"
                  )}
                </p>
              </div>
            </Fade>

            {/* Vision Card */}
            <Fade>
              <div className="bg-white rounded-2xl border p-8 md:p-10 h-full transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: LENITY.line }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: LENITY.pinkSoft }}>
                    <svg className="w-7 h-7" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                    {t("Our Vision", "हमारी दृष्टि")}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: LENITY.muted }}>
                  {t(
                    "We envision a society where every individual has access to the resources and support they need to thrive. By bridging gaps in healthcare, education, and social welfare, we aspire to build a future where everyone can achieve their full potential and contribute meaningfully to their communities.",
                    "हम एक ऐसे समाज की कल्पना करते हैं जहाँ प्रत्येक व्यक्ति के पास वे संसाधन और समर्थन हो जो उन्हें फलने-फूलने की आवश्यकता है। स्वास्थ्य सेवा, शिक्षा और सामाजिक कल्याण में अंतराल को पाटकर, हम एक ऐसे भविष्य का निर्माण करना चाहते हैं जहाँ हर कोई अपनी पूर्ण क्षमता प्राप्त कर सके।"
                  )}
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ════════════ PREMIUM STORYTELLING SECTION ════════════ */}
      <PremiumStorySection
        eyebrow={t("Impact Stories", "प्रभाव की कहानियाँ")}
        heading={t("Transforming Lives, One Story at a Time", "एक समय में एक जीवन बदलना")}
        description={t(
          "Real stories from real people whose lives have been touched by our work. Every number represents a human story, every program brings hope to families across West Champaran.",
          "वास्तविक लोगों की वास्तविक कहानियाँ जिनके जीवन हमारे काम से छुए गए हैं। हर संख्या एक मानवीय कहानी का प्रतिनिधित्व करती है।"
        )}
        cards={[
          {
            id: "story-1",
            number: "01",
            title: t("Education Transforms Communities", "शिक्षा समुदायों को बदलती है"),
            description: t(
              "Through our Shiksha Seva program, over 500 underprivileged children have received quality education, scholarships, and learning materials. Education is not just about books—it's about opening doors to opportunity and breaking the cycle of poverty.",
              "हमारे शिक्षा सेवा कार्यक्रम के माध्यम से, 500 से अधिक वंचित बच्चों को गुणवत्तापूर्ण शिक्षा, छात्रवृत्ति और सीखने की सामग्री मिली है।"
            ),
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop",
            stat: "500+",
            statLabel: t("Students Supported", "छात्र समर्थित"),
          },
          {
            id: "story-2",
            number: "02",
            title: t("Green Revolution in Action", "हरित क्रांति की कार्रवाई"),
            description: t(
              "Our Vrikshaaropan initiative has planted over 10,000 trees across West Champaran, creating a greener tomorrow. Each sapling is a promise to future generations.",
              "हमारे वृक्षारोपण पहल ने पश्चिम चम्पारण में 10,000 से अधिक पेड़ लगाए हैं। हर पौधा भविष्य की पीढ़ियों के लिए एक वादा है।"
            ),
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop",
            stat: "10K+",
            statLabel: t("Trees Planted", "पेड़ लगाए गए"),
          },
          {
            id: "story-3",
            number: "03",
            title: t("Healthcare for All", "सभी के लिए स्वास्थ्य सेवा"),
            description: t(
              "Free health camps and medical assistance have reached over 5,000 patients in rural areas. Quality healthcare is a right, not a privilege.",
              "मुफ्त स्वास्थ्य शिविर और चिकित्सा सहायता ग्रामीण क्षेत्रों में 5,000 से अधिक रोगियों तक पहुँची है।"
            ),
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
            stat: "5K+",
            statLabel: t("Patients Treated", "रोगियों का इलाज"),
          },
        ]}
        ctaText={t("Explore All Programs", "सभी कार्यक्रम देखें")}
        ctaLink="/programs"
        theme="light"
      />

      {/* ════════════ 01 — CONSISTENT SERVICE ════════════ */}
      <NumberedSection num="01" label={t(s("home.about.h2").en, s("home.about.h2").hi)}>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t(s("home.about.h2").en, s("home.about.h2").hi)}
            </h2>
            <p className="text-lg italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t(s("home.about.lead").en, s("home.about.lead").hi)}
            </p>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: LENITY.muted }}>{t(s("home.about.p1").en, s("home.about.p1").hi)}</p>
            <p className="text-[15px] leading-relaxed mb-7" style={{ color: LENITY.muted }}>{t(s("home.about.p2").en, s("home.about.p2").hi)}</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: LENITY.ink }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: LENITY.yellow }}>
                <ArrowRight className="w-4 h-4" style={{ color: LENITY.ink }} />
              </span>
              {t(s("home.about.more").en, s("home.about.more").hi)}
            </Link>
          </div>
          <div className="flex justify-center items-start">
            <WaterPortrait src={s("IMG.home.portrait1").img ?? ""} alt={t("A family we serve", "एक परिवार जिसकी हम सेवा करते हैं")}
              blob={LENITY.pinkSoft} className="w-64 h-80" />
          </div>
        </div>
      </NumberedSection>

      {/* ════════════ YELLOW PULL-QUOTE ════════════ */}
      <section className="relative" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2">
          <Fade className="py-2">
            <WaterPortrait src={s("IMG.home.quote").img ?? ""} alt={t("Volunteer in the field", "क्षेत्र में स्वयंसेवक")}
              blob={LENITY.yellowSoft} className="w-full h-72 lg:h-full" />
          </Fade>
          <Fade>
            <div className="p-10 lg:p-14 h-full flex flex-col justify-center" style={{ background: LENITY.yellow }}>
              <Quote className="w-10 h-10 mb-4" style={{ color: LENITY.ink }} />
              <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-5" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                {t(s("home.quote.text").en, s("home.quote.text").hi)}
              </p>
              <p className="text-sm font-bold mb-7" style={{ color: LENITY.ink }}>{t(s("home.quote.who").en, s("home.quote.who").hi)}</p>
              <button onClick={openDonate}
                className="self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: LENITY.ink }}>
                {t(s("home.quote.donate").en, s("home.quote.donate").hi)} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ════════════ 02 — WHAT WE DO ════════════ */}
      <NumberedSection num="02" label={t(s("home.services.h2").en, s("home.services.h2").hi)} alt>
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          {t(s("home.services.h2").en, s("home.services.h2").hi)}
        </h2>
        <p className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }}>
          {t(s("home.services.lead").en, s("home.services.lead").hi)}
        </p>

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
          autoPlay={true}
          autoPlayInterval={4000}
          cardWidth={300}
          gap={24}
        />
      </NumberedSection>

      {/* ════════════ STATS BAND ════════════ */}
      <section className="py-16" style={{ background: LENITY.yellow }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <Fade key={stat.id}>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                <Counter target={stat.value} />
              </div>
              <div className="text-sm font-semibold" style={{ color: LENITY.ink }}>{t(stat.labelEn, stat.labelHi)}</div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ════════════ PARTNERS & SPONSORS ════════════ */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: LENITY.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-14">
            <Eyebrow>{t("Working Together", "मिलकर काम करना")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Our Partners & Sponsors", "हमारे साझेदार और प्रायोजक")}
            </h2>
            <p className="text-base md:text-lg italic max-w-2xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t("Grateful for the support of our partners who make our mission possible", "हमारे साझेदारों के समर्थन के लिए आभारी जो हमारे मिशन को संभव बनाते हैं")}
            </p>
          </Fade>

          {/* Associate Partners - Scroll Right to Left */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Associate Partners", "सहयोगी साझेदार")}
            </h3>
            <LogoCarousel
              logos={[
                { id: 1, name: "Tata Trust", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png" },
                { id: 2, name: "Rotary International", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/RotaryInternationalLogo.svg/200px-RotaryInternationalLogo.svg.png" },
                { id: 3, name: "United Way", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/United_Way_Worldwide_logo.svg/200px-United_Way_Worldwide_logo.svg.png" },
                { id: 4, name: "World Vision", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/World_Vision_logo.svg/200px-World_Vision_logo.svg.png" },
                { id: 5, name: "Care International", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CARE_logo.svg/200px-CARE_logo.svg.png" },
                { id: 6, name: "Oxfam", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Oxfam_logo.svg/200px-Oxfam_logo.svg.png" },
                { id: 7, name: "Red Cross", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/American_Red_Cross_logo.svg/200px-American_Red_Cross_logo.svg.png" },
                { id: 8, name: "Save the Children", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Save_the_Children_logo.svg/200px-Save_the_Children_logo.svg.png" },
              ]}
              direction="left"
              speed={30}
            />
          </div>

          {/* Medicine Sponsors - Scroll Left to Right */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Medicine Sponsored By", "दवा प्रायोजित")}
            </h3>
            <LogoCarousel
              logos={[
                { id: 1, name: "Cipla", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Cipla_logo.svg/200px-Cipla_logo.svg.png" },
                { id: 2, name: "Sun Pharma", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sun_Pharmaceutical_Logo.svg/200px-Sun_Pharmaceutical_Logo.svg.png" },
                { id: 3, name: "Dr. Reddy's", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Dr._Reddy%27s_Laboratories_logo.svg/200px-Dr._Reddy%27s_Laboratories_logo.svg.png" },
                { id: 4, name: "Lupin", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lupin_Limited_Logo.svg/200px-Lupin_Limited_Logo.svg.png" },
                { id: 5, name: "Aurobindo Pharma", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Aurobindo_Pharma_logo.svg/200px-Aurobindo_Pharma_logo.svg.png" },
                { id: 6, name: "Torrent Pharma", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Torrent_Pharmaceuticals_logo.svg/200px-Torrent_Pharmaceuticals_logo.svg.png" },
              ]}
              direction="right"
              speed={35}
            />
          </div>
        </div>
      </section>

      {/* ════════════ PROGRAMS GRID WITH HOVER EFFECT ════════════ */}
      <ProgramsGrid />

      {/* ════════════ 03 — CHALLENGES & SOLUTIONS (campaigns) ════════════ */}
      <NumberedSection num="03" label={t(s("home.challenges.h2").en, s("home.challenges.h2").hi)}>
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          {t(s("home.challenges.h2").en, s("home.challenges.h2").hi)}
        </h2>
        <p className="text-lg italic mb-10" style={{ fontFamily: SERIF, color: LENITY.muted }}>
          {t(s("home.challenges.lead").en, s("home.challenges.lead").hi)}
        </p>
        <div className="grid md:grid-cols-3 gap-7">
          {campaigns.map((c) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <Fade key={c.id}>
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
                    {t(s("home.campaigns.btn").en, s("home.campaigns.btn").hi)}
                  </button>
                </div>
              </Fade>
            );
          })}
        </div>
      </NumberedSection>

      {/* ════════════ HOW YOU CAN HELP ════════════ */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: LENITY.yellow }}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ background: LENITY.accent, filter: "blur(80px)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Fade className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Join Hands With Us", "हमारे साथ हाथ मिलाएं")}
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: LENITY.ink, opacity: 0.9 }}>
              {t("On our amazing journey of helping others. Your support can transform lives.", "दूसरों की मदद करने की हमारी अद्भुत यात्रा में। आपका समर्थन जीवन बदल सकता है।")}
            </p>
          </Fade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Donate Money */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.yellowSoft }}>
                  <svg className="w-8 h-8" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Donate Money", "पैसे दान करें")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Make a financial contribution to support our programs", "हमारे कार्यक्रमों का समर्थन करने के लिए वित्तीय योगदान दें")}
                </p>
                <button onClick={openDonate} className="w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105" style={{ background: LENITY.accent, color: "#fff" }}>
                  {t("Donate Now", "अभी दान करें")}
                </button>
              </div>
            </Fade>

            {/* Volunteer */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.pinkSoft }}>
                  <Users className="w-8 h-8" style={{ color: LENITY.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Volunteer", "स्वयंसेवक बनें")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Give your time and skills to make a difference", "बदलाव लाने के लिए अपना समय और कौशल दें")}
                </p>
                <Link href="/volunteer" className="block w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105 border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  {t("Join Us", "हमसे जुड़ें")}
                </Link>
              </div>
            </Fade>

            {/* Sponsor Program */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.yellowSoft }}>
                  <svg className="w-8 h-8" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Sponsor Program", "कार्यक्रम प्रायोजित करें")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Support specific initiatives like education or healthcare", "शिक्षा या स्वास्थ्य सेवा जैसी विशिष्ट पहलों का समर्थन करें")}
                </p>
                <Link href="/projects" className="block w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105 border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  {t("Learn More", "और जानें")}
                </Link>
              </div>
            </Fade>

            {/* Corporate Partnership */}
            <Fade>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: LENITY.pinkSoft }}>
                  <svg className="w-8 h-8" style={{ color: LENITY.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  {t("Corporate Partnership", "कॉर्पोरेट साझेदारी")}
                </h3>
                <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
                  {t("Partner with us for CSR initiatives and social impact", "सीएसआर पहल और सामाजिक प्रभाव के लिए हमारे साथ साझेदार बनें")}
                </p>
                <Link href="/contact" className="block w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105 border-2" style={{ borderColor: LENITY.accent, color: LENITY.accent }}>
                  {t("Contact Us", "संपर्क करें")}
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS / IMPACT STORIES ════════════ */}
      <section className="py-16 md:py-20" style={{ background: LENITY.soft }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="text-center mb-12 md:mb-14">
            <Eyebrow>{t("Real Impact", "वास्तविक प्रभाव")}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3" style={{ fontFamily: SERIF, color: LENITY.ink }}>
              {t("Stories of Hope & Change", "आशा और परिवर्तन की कहानियाँ")}
            </h2>
            <p className="text-base md:text-lg italic max-w-2xl mx-auto" style={{ fontFamily: SERIF, color: LENITY.muted }}>
              {t("Hear from the lives we've touched and the communities we've transformed", "उन जीवनों से सुनें जिन्हें हमने छुआ है और उन समुदायों से जिन्हें हमने बदला है")}
            </p>
          </Fade>

          <TestimonialCarousel
            testimonials={[
              {
                id: 1,
                quote: t(
                  "Hariwatika helped my daughter get scholarships for her education. Today she is a teacher helping other children. Forever grateful.",
                  "हरिवाटिका ने मेरी बेटी को उसकी शिक्षा के लिए छात्रवृत्ति प्राप्त करने में मदद की। आज वह एक शिक्षिका है जो अन्य बच्चों की मदद कर रही है। हमेशा आभारी।"
                ),
                name: t("Rekha Devi", "रेखा देवी"),
                location: t("Parent, Bettiah", "अभिभावक, बेतिया"),
                image: s("IMG.avatar").img ?? "",
              },
              {
                id: 2,
                quote: t(
                  "During the flood, Hariwatika was the first to reach our village with food and medicine. They saved many lives including my family.",
                  "बाढ़ के दौरान, हरिवाटिका भोजन और दवा के साथ हमारे गांव पहुंचने वाला पहला था। उन्होंने मेरे परिवार सहित कई जीवन बचाए।"
                ),
                name: t("Ramesh Kumar", "रमेश कुमार"),
                location: t("Farmer, West Champaran", "किसान, पश्चिम चम्पारण"),
                image: s("IMG.avatar").img ?? "",
              },
              {
                id: 3,
                quote: t(
                  "The free health camp organized by Hariwatika diagnosed my illness early. Their support for treatment gave me a second chance at life.",
                  "हरिवाटिका द्वारा आयोजित मुफ्त स्वास्थ्य शिविर ने मेरी बीमारी का जल्दी निदान किया। उनके उपचार समर्थन ने मुझे जीवन का दूसरा मौका दिया।"
                ),
                name: t("Sunita Singh", "सुनीता सिंह"),
                location: t("Village Elder", "गांव की बुजुर्ग"),
                image: s("IMG.avatar").img ?? "",
              },
            ]}
            autoPlay={true}
            interval={5000}
          />
        </div>
      </section>

      {/* ════════════ 04 — PILLARS + BLOG ════════════ */}
      <NumberedSection num="04" label={t(s("home.blog.h2").en, s("home.blog.h2").hi)} alt>
        {/* pillars row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => {
            const Icon = iconFor(p.iconName);
            return (
              <Fade key={p.id}>
                <div className="text-center">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: LENITY.yellowSoft }}>
                    <Icon className="w-7 h-7" style={{ color: LENITY.ink }} />
                  </span>
                  <h3 className="font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(p.titleEn, p.titleHi)}</h3>
                  <p className="text-xs mt-1" style={{ color: LENITY.muted }}>{t(p.descEn, p.descHi)}</p>
                </div>
              </Fade>
            );
          })}
        </div>

        {/* blog header */}
        <Fade className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>{t(s("home.blog.h2").en, s("home.blog.h2").hi)}</h2>
            <p className="text-lg italic mt-1" style={{ fontFamily: SERIF, color: LENITY.muted }}>{t(s("home.blog.lead").en, s("home.blog.lead").hi)}</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-bold" style={{ color: LENITY.ink }}>
            {t(s("home.blog.all").en, s("home.blog.all").hi)} <ArrowRight className="w-4 h-4" />
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
                    {t(s("home.blog.more").en, s("home.blog.more").hi)} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </NumberedSection>
    </>
  );
}
