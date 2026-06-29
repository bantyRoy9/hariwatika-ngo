"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface Slide {
  id: number;
  image: string;
  eyebrow: { en: string; hi: string };
  line1: { en: string; hi: string };
  line2: { en: string; hi: string };
  tagline: { en: string; hi: string };
  description: { en: string; hi: string };
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80&auto=format&fit=crop",
    eyebrow: { en: "Hariwatika Vivah Sewa Samiti", hi: "हरिवाटिका विवाह सेवा समिति" },
    line1: { en: "A Relentless", hi: "अटूट" },
    line2: { en: "Pursuit.", hi: "सेवा।" },
    tagline: { en: "To bring dignity, marriage, and lasting change to families across Bihar.", hi: "बिहार के परिवारों को सम्मान, विवाह और स्थायी बदलाव देने का संकल्प।" },
    description: { en: "For over 25 years Hariwatika Shiv Mandir Vivah Sewa Samiti has facilitated marriages, planted forests, and stood with the poor across West Champaran.", hi: "25 वर्षों से हरिवाटिका शिव मंदिर विवाह सेवा समिति ने पश्चिम चम्पारण में विवाह, वृक्षारोपण और गरीब सहायता की है।" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80&auto=format&fit=crop",
    eyebrow: { en: "Green Initiative", hi: "हरित पहल" },
    line1: { en: "Planting", hi: "कल का" },
    line2: { en: "Tomorrow.", hi: "रोपण।" },
    tagline: { en: "Creating a greener future through large-scale tree plantation across West Champaran.", hi: "पश्चिम चम्पारण में वृहद वृक्षारोपण के माध्यम से हरित भविष्य का निर्माण।" },
    description: { en: "Over 10,000 trees planted with participation from volunteers, students, and community members creating lasting environmental impact.", hi: "स्वयंसेवकों, छात्रों और समुदाय के सदस्यों की भागीदारी से 10,000 से अधिक वृक्ष रोपित किए गए।" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop",
    eyebrow: { en: "Community Relief", hi: "समुदाय राहत" },
    line1: { en: "Standing", hi: "परिवारों" },
    line2: { en: "Together.", hi: "के साथ।" },
    tagline: { en: "Supporting 5000+ families with food, clothing, and essentials throughout the year.", hi: "साल भर 5000+ परिवारों को भोजन, वस्त्र और आवश्यक सामान के साथ सहायता।" },
    description: { en: "Providing relief to underprivileged and disaster-affected families across West Champaran with dignity and compassion.", hi: "पश्चिम चम्पारण में जरूरतमंद और आपदा प्रभावित परिवारों को सम्मान और करुणा के साथ राहत प्रदान करना।" },
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=700&q=80&auto=format&fit=crop",
    eyebrow: { en: "Healthcare Services", hi: "स्वास्थ्य सेवाएं" },
    line1: { en: "Healing", hi: "सेवा में" },
    line2: { en: "Communities.", hi: "समर्पण।" },
    tagline: { en: "Free health camps and medical assistance for rural low-income communities.", hi: "ग्रामीण निम्न आय समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।" },
    description: { en: "Organizing regular health camps with doctors and volunteers providing essential medical care and medicines to those in need.", hi: "जरूरतमंदों को आवश्यक चिकित्सा देखभाल और दवाएं प्रदान करने वाले डॉक्टरों और स्वयंसेवकों के साथ नियमित स्वास्थ्य शिविर आयोजित करना।" },
  },
];

const LENITY = {
  ink: "#0d1229",
  muted: "#6b7280",
  yellow: "#D4A574",
  yellowSoft: "rgba(212, 165, 116, 0.15)",
  pinkSoft: "rgba(232, 196, 160, 0.2)",
  bg: "#FFFAF5",
  soft: "#FFF8F0",
  line: "rgba(139, 90, 43, 0.15)",
};

const SERIF = "'Literata', Georgia, serif";

interface HeroSliderProps {
  onDonate: () => void;
}

export default function HeroSlider({ onDonate }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLang();

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = slides[current];

  return (
    <section 
      className="relative overflow-hidden" 
      style={{ background: LENITY.bg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Yellow watercolor wash top-left */}
      <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: LENITY.yellowSoft, filter: "blur(80px)", opacity: 0.6 }} />
      <div className="absolute top-40 right-0 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: LENITY.pinkSoft, filter: "blur(80px)", opacity: 0.7 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 lg:pt-44 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: watercolor portrait with slider */}
        <div className="relative">
          <div className="watercolor inline-block w-full h-[420px] sm:h-[520px]" style={{ "--blob": LENITY.yellowSoft } as React.CSSProperties}>
            {/* Images */}
            {slides.map((s, idx) => (
              <img
                key={s.id}
                src={s.image}
                alt={t(s.line1.en + " " + s.line2.en, s.line1.hi + " " + s.line2.hi)}
                className={`absolute inset-0 w-full h-full rounded-[2rem] object-cover transition-opacity duration-1000 ${
                  idx === current ? "opacity-100" : "opacity-0"
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}
            
            {/* Navigation Arrows - Small and elegant */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110 z-10"
              style={{ color: LENITY.ink }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110 z-10"
              style={{ color: LENITY.ink }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === current
                      ? "w-8"
                      : "w-1.5 hover:w-3"
                  }`}
                  style={{ 
                    background: idx === current ? LENITY.yellow : "rgba(255,255,255,0.5)"
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: editorial headline with smooth transition */}
        <div className="relative">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`transition-all duration-700 ${
                idx === current
                  ? "opacity-100 translate-x-0 relative"
                  : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"
              }`}
            >
              {/* PAI Eyebrow: yellow dash + uppercase label */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: LENITY.ink }}>
                  <span className="inline-block w-8 h-0.5" style={{ background: LENITY.yellow }} />
                  {t(s.eyebrow.en, s.eyebrow.hi)}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-bold leading-[0.95] mb-4 text-5xl sm:text-6xl lg:text-7xl" style={{ fontFamily: SERIF, color: LENITY.ink }}>
                {t(s.line1.en, s.line1.hi)}<br />
                <span style={{ color: LENITY.ink }}>{t(s.line2.en, s.line2.hi)}</span>
              </h1>

              {/* Tagline */}
              <p className="text-lg italic mb-6" style={{ fontFamily: SERIF, color: LENITY.muted }}>
                {t(s.tagline.en, s.tagline.hi)}
              </p>

              {/* Description */}
              <p className="text-[15px] leading-relaxed mb-9 max-w-xl" style={{ color: LENITY.muted }}>
                {t(s.description.en, s.description.hi)}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onDonate}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm transition-all hover:scale-105"
                  style={{ background: LENITY.yellow, color: LENITY.ink }}
                >
                  {t("Donate Now", "दान करें")} <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm border-2 transition-all hover:bg-[#0d1229] hover:text-white"
                  style={{ borderColor: LENITY.ink, color: LENITY.ink }}
                >
                  {t("Our Work", "हमारा काम")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yellow rule under hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-1 w-full" style={{ background: LENITY.yellow }} />
      </div>
    </section>
  );
}

