"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface Slide {
  id: number;
  image: string;
  badge: { en: string; hi: string };
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  description: { en: string; hi: string };
  gradient: string; // Background gradient matching the image
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
    badge: { en: "Serving Since 2000", hi: "2000 से सेवारत" },
    title: { en: "Empowering Communities", hi: "समाज को सशक्त बनाना" },
    subtitle: { en: "Through Marriage Assistance", hi: "विवाह सहायता के माध्यम से" },
    description: {
      en: "Facilitating dignified marriages for underprivileged families across West Champaran with complete ceremony arrangements.",
      hi: "पश्चिम चम्पारण में गरीब परिवारों के लिए पूर्ण समारोह व्यवस्था के साथ सम्मानजनक विवाह।",
    },
    gradient: "from-[#E84523]/20 via-[#0d1229] to-[#0a0e1a]",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80&auto=format&fit=crop",
    badge: { en: "Green Initiative", hi: "हरित पहल" },
    title: { en: "Planting Tomorrow", hi: "कल का रोपण" },
    subtitle: { en: "10,000+ Trees Planted", hi: "10,000+ वृक्ष रोपित" },
    description: {
      en: "Large-scale tree plantation drives creating a greener future for West Champaran. Join our mission to plant trees.",
      hi: "पश्चिम चम्पारण के लिए हरित भविष्य बनाने वाले वृहद वृक्षारोपण अभियान। हमारे वृक्षारोपण मिशन में शामिल हों।",
    },
    gradient: "from-[#22c55e]/20 via-[#0d1229] to-[#0a0e1a]",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80&auto=format&fit=crop",
    badge: { en: "Relief Work", hi: "राहत कार्य" },
    title: { en: "Supporting Families", hi: "परिवारों की सहायता" },
    subtitle: { en: "5000+ Families Helped", hi: "5000+ परिवारों की मदद" },
    description: {
      en: "Providing food, clothing, and essentials to underprivileged and disaster-affected families throughout the year.",
      hi: "साल भर जरूरतमंद और आपदा प्रभावित परिवारों को भोजन, वस्त्र और आवश्यक सामान प्रदान करना।",
    },
    gradient: "from-[#F4A433]/20 via-[#0d1229] to-[#0a0e1a]",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&q=80&auto=format&fit=crop",
    badge: { en: "Healthcare", hi: "स्वास्थ्य सेवा" },
    title: { en: "Free Medical Care", hi: "नि:शुल्क चिकित्सा" },
    subtitle: { en: "Health Camps for All", hi: "सभी के लिए स्वास्थ्य शिविर" },
    description: {
      en: "Organizing free health camps and providing medical assistance to rural low-income communities in West Champaran.",
      hi: "पश्चिम चम्पारण में ग्रामीण निम्न आय वर्ग के लिए नि:शुल्क स्वास्थ्य शिविर और चिकित्सा सहायता।",
    },
    gradient: "from-[#3b82f6]/20 via-[#0d1229] to-[#0a0e1a]",
  },
];

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

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000); // Changed to 5 seconds
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic gradient background that matches image */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000`}
      />

      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full pointer-events-none hero-blob-1 opacity-60"
        style={{ background: "radial-gradient(circle, rgba(232,69,35,0.15) 0%, transparent 70%)" }} />
      <div className="absolute top-40 right-0 w-[420px] h-[420px] rounded-full pointer-events-none hero-blob-2 opacity-50"
        style={{ background: "radial-gradient(circle, rgba(244,164,51,0.12) 0%, transparent 70%)" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left side - Image with smooth transition */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    idx === current
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  <img
                    src={s.image}
                    alt={t(s.title.en, s.title.hi)}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  {/* Enhanced gradient overlay matching the background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} mix-blend-multiply opacity-40`} />
                  {/* Bottom gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              ))}

              {/* Navigation arrows on image */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === current
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Content with smooth transition */}
          <div className="order-1 lg:order-2 relative">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className={`transition-all duration-700 ease-in-out ${
                  idx === current
                    ? "opacity-100 translate-x-0 relative z-10"
                    : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"
                }`}
              >
                {/* Badge with better visibility */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 rounded-full bg-[#E84523] border-2 border-[#E84523]/30 backdrop-blur-sm shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide uppercase">
                    {t(s.badge.en, s.badge.hi)}
                  </span>
                </div>

                {/* Title with text shadow for visibility */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 text-white drop-shadow-2xl">
                  {t(s.title.en, s.title.hi)}
                </h1>

                {/* Subtitle with enhanced visibility */}
                <p className="text-2xl sm:text-3xl font-semibold text-[#F4A433] mb-6 drop-shadow-lg">
                  {t(s.subtitle.en, s.subtitle.hi)}
                </p>

                {/* Description with better contrast */}
                <p className="text-base sm:text-lg leading-relaxed text-gray-100 mb-8 max-w-xl drop-shadow-md bg-black/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                  {t(s.description.en, s.description.hi)}
                </p>

                {/* CTAs with enhanced visibility */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={onDonate}
                    className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-[#E84523] text-white font-bold text-sm hover:bg-[#c93b1d] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#E84523]/50 shadow-xl"
                  >
                    {t("Donate Now", "दान करें")} <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full px-8 py-4 border-2 border-white bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all hover:scale-105 backdrop-blur-md shadow-lg"
                  >
                    {t("Our Work", "हमारा काम")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 animate-bounce z-10">
        <span className="text-xs font-medium uppercase tracking-wider drop-shadow-md">{t("Scroll", "स्क्रॉल करें")}</span>
        <ChevronRight className="w-4 h-4 rotate-90" />
      </div>
    </section>
  );
}
