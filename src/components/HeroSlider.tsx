"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { LENITY, SERIF, IMG } from "@/theme/lenity";

/* ─── Slide data shape ───────────────────────────────────────── */
export interface Slide {
  id: number;
  image: string;
  eyebrow:     { en: string; hi: string };
  line1:       { en: string; hi: string };
  line2:       { en: string; hi: string };
  tagline:     { en: string; hi: string };
  description: { en: string; hi: string };
  cta1?:       { en: string; hi: string };
  cta2?:       { en: string; hi: string };
}

/**
 * Per-slide renderable overrides.
 * Each value is a ReactNode — pass <EditableText> from the parent
 * to make that field inline-editable.
 */
export interface SlideOverride {
  image?:       React.ReactNode; // wraps the <img> with EditableImage
  eyebrow?:     React.ReactNode;
  line1?:       React.ReactNode;
  line2?:       React.ReactNode;
  tagline?:     React.ReactNode;
  description?: React.ReactNode;
  cta1?:        React.ReactNode;
  cta2?:        React.ReactNode;
}

/* ─── Default slide data (hardcoded fallbacks) ───────────────── */
export const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    image: IMG.hero,
    eyebrow:     { en: "Hariwatika Sewa Samiti", hi: "हरिवाटिका सेवा समिति" },
    line1:       { en: "A Relentless", hi: "अटूट" },
    line2:       { en: "Pursuit.", hi: "सेवा।" },
    tagline:     { en: "Bringing dignity, healthcare, and lasting change to families across Bihar.", hi: "बिहार के परिवारों को सम्मान, स्वास्थ्य और स्थायी बदलाव देने का संकल्प।" },
    description: { en: "For over 25 years Hariwatika has planted forests, provided healthcare, and stood with the poor across West Champaran.", hi: "25 वर्षों से हरिवाटिका ने पश्चिम चम्पारण में वृक्षारोपण, स्वास्थ्य सेवा और गरीब सहायता की है।" },
    cta1:        { en: "Donate Now", hi: "दान करें" },
    cta2:        { en: "Our Work",   hi: "हमारा काम" },
  },
  {
    id: 2,
    image: IMG.trees,
    eyebrow:     { en: "Green Initiative", hi: "हरित पहल" },
    line1:       { en: "Planting", hi: "कल का" },
    line2:       { en: "Tomorrow.", hi: "रोपण।" },
    tagline:     { en: "Creating a greener future through large-scale tree plantation across West Champaran.", hi: "पश्चिम चम्पारण में वृहद वृक्षारोपण के माध्यम से हरित भविष्य का निर्माण।" },
    description: { en: "Over 10,000 trees planted with participation from volunteers, students, and community members creating lasting environmental impact.", hi: "स्वयंसेवकों, छात्रों और समुदाय के सदस्यों की भागीदारी से 10,000 से अधिक वृक्ष रोपित किए गए।" },
    cta1:        { en: "Donate Now", hi: "दान करें" },
    cta2:        { en: "Our Work",   hi: "हमारा काम" },
  },
  {
    id: 3,
    image: IMG.relief,
    eyebrow:     { en: "Community Relief", hi: "समुदाय राहत" },
    line1:       { en: "Standing", hi: "परिवारों" },
    line2:       { en: "Together.", hi: "के साथ।" },
    tagline:     { en: "Supporting 5000+ families with food, clothing, and essentials throughout the year.", hi: "साल भर 5000+ परिवारों को भोजन, वस्त्र और आवश्यक सामान के साथ सहायता।" },
    description: { en: "Providing relief to underprivileged and disaster-affected families across West Champaran with dignity and compassion.", hi: "पश्चिम चम्पारण में जरूरतमंद और आपदा प्रभावित परिवारों को सम्मान और करुणा के साथ राहत।" },
    cta1:        { en: "Donate Now", hi: "दान करें" },
    cta2:        { en: "Our Work",   hi: "हमारा काम" },
  },
  {
    id: 4,
    image: IMG.children,
    eyebrow:     { en: "Healthcare Services", hi: "स्वास्थ्य सेवाएं" },
    line1:       { en: "Healing", hi: "सेवा में" },
    line2:       { en: "Communities.", hi: "समर्पण।" },
    tagline:     { en: "Free health camps and medical assistance for rural low-income communities.", hi: "ग्रामीण निम्न आय समुदायों के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।" },
    description: { en: "Organizing regular health camps with doctors and volunteers providing essential medical care and medicines to those in need.", hi: "जरूरतमंदों को आवश्यक चिकित्सा देखभाल और दवाएं प्रदान करने वाले डॉक्टरों के साथ नियमित स्वास्थ्य शिविर।" },
    cta1:        { en: "Donate Now", hi: "दान करें" },
    cta2:        { en: "Our Work",   hi: "हमारा काम" },
  },
];

/* ─── Eyebrow ────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: LENITY.ink }}>
      <span className="inline-block w-8 h-0.5" style={{ background: LENITY.accent }} />
      {children}
    </span>
  );
}

/* ─── Props ──────────────────────────────────────────────────── */
export interface HeroSliderProps {
  onDonate: () => void;
  /** Optional overrides per slide index — pass EditableText/EditableImage nodes */
  overrides?: Record<number, SlideOverride>;
}

/* ─── Component ──────────────────────────────────────────────── */
export default function HeroSlider({ onDonate, overrides = {} }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLang();

  const slides = DEFAULT_SLIDES;
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => setCurrent((p) => (p + 1) % totalSlides), [totalSlides]);
  const prevSlide = useCallback(() => setCurrent((p) => (p - 1 + totalSlides) % totalSlides), [totalSlides]);
  const goToSlide = useCallback((i: number) => setCurrent(i), []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [isPaused, nextSlide]);

  const slide = slides[current];
  const ov    = overrides[current] ?? {};

  /* helper: use override node if supplied, else render raw text via t() */
  const node = (override: React.ReactNode | undefined, raw: { en: string; hi: string }) =>
    override ?? t(raw.en, raw.hi);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: LENITY.bg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Watercolor washes */}
      <div className="absolute -top-20 md:-top-32 -left-20 md:-left-32 w-[400px] md:w-[640px] h-[400px] md:h-[640px] rounded-full pointer-events-none"
        style={{ background: LENITY.yellowSoft, filter: "blur(80px)", opacity: 0.6 }} />
      <div className="absolute top-20 md:top-40 right-0 w-[300px] md:w-[420px] h-[300px] md:h-[420px] rounded-full pointer-events-none"
        style={{ background: LENITY.pinkSoft, filter: "blur(80px)", opacity: 0.7 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">

          {/* ── Left: image slider ── */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-3 md:-inset-5 rounded-[2rem] md:rounded-[3rem] -z-10 opacity-40"
              style={{ background: LENITY.yellowSoft, filter: "blur(40px)", animation: "blob-organic 20s ease-in-out infinite" }} />

            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl">
              {slides.map((s, idx) => {
                const slideOv = overrides[idx] ?? {};
                return (
                  <div
                    key={s.id}
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
                    style={{
                      opacity: idx === current ? 1 : 0,
                      transform: idx === current ? "translateX(0)" : idx < current ? "translateX(-100%)" : "translateX(100%)",
                      zIndex: idx === current ? 10 : 0,
                    }}
                  >
                    {/* Use EditableImage override if provided, else plain img */}
                    {slideOv.image ? (
                      <div className="w-full h-full">{slideOv.image}</div>
                    ) : (
                      <img
                        src={s.image}
                        alt={t(s.line1.en + " " + s.line2.en, s.line1.hi + " " + s.line2.hi)}
                        className="w-full h-full object-cover"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </div>
                );
              })}

              {/* Arrows */}
              <button onClick={prevSlide} aria-label="Previous"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110 z-30"
                style={{ color: LENITY.ink }}>
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={nextSlide} aria-label="Next"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110 z-30"
                style={{ color: LENITY.ink }}>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 z-30">
                {slides.map((_, idx) => (
                  <button key={idx} onClick={() => goToSlide(idx)} aria-label={`Slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 ${idx === current ? "w-6 sm:w-8 h-1.5 sm:h-2" : "w-1.5 sm:w-2 h-1.5 sm:h-2 hover:w-2.5 sm:hover:w-3"}`}
                    style={{ background: idx === current ? LENITY.accent : "rgba(255,255,255,0.6)", boxShadow: idx === current ? "0 2px 8px rgba(232,69,35,0.4)" : "none" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: text content ── */}
          <div className="relative order-1 lg:order-2">
            <div key={current} className="animate-slide-in-right">
              {/* Eyebrow */}
              <div className="mb-3 sm:mb-4 md:mb-5">
                <Eyebrow>{node(ov.eyebrow, slide.eyebrow)}</Eyebrow>
              </div>

              {/* Headline */}
              <h1 className="font-bold leading-[0.95] mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: SERIF, color: LENITY.ink }}>
                {node(ov.line1, slide.line1)}<br />
                <span style={{ color: LENITY.ink }}>{node(ov.line2, slide.line2)}</span>
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-lg mb-4 sm:mb-5 md:mb-6 italic"
                style={{ fontFamily: SERIF, color: LENITY.muted }}>
                {node(ov.tagline, slide.tagline)}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 md:mb-9 max-w-xl"
                style={{ color: LENITY.muted }}>
                {node(ov.description, slide.description)}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <button onClick={onDonate}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm transition-all hover:scale-105 shadow-md"
                  style={{ background: LENITY.accent, color: "#fff" }}>
                  {node(ov.cta1, slide.cta1 ?? { en: "Donate Now", hi: "दान करें" })}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm border-2 transition-all hover:scale-105"
                  style={{ borderColor: LENITY.ink, color: LENITY.ink }}>
                  {node(ov.cta2, slide.cta2 ?? { en: "Our Work", hi: "हमारा काम" })}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Orange rule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-1">
        <div className="h-0.5 sm:h-1 w-full rounded-full"
          style={{ background: LENITY.accent, boxShadow: `0 2px 8px ${LENITY.accentSoft}` }} />
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </section>
  );
}
