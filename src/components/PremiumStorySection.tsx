"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

interface StoryCard {
  id: string;
  number: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  /** Plain-text alt for the image — falls back to "" if not given (title may not be plain text). */
  imageAlt?: string;
  stat?: string;
  statLabel?: React.ReactNode;
}

interface PremiumStorySectionProps {
  eyebrow: React.ReactNode;
  heading: React.ReactNode;
  description: React.ReactNode;
  cards: StoryCard[];
  ctaText?: React.ReactNode;
  ctaLink?: string;
  theme?: "light" | "dark";
}

export default function PremiumStorySection({
  eyebrow,
  heading,
  description,
  cards,
  ctaText = "Learn More",
  ctaLink = "#",
  theme = "light",
}: PremiumStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute("data-reveal");
            if (elementId) {
              setVisibleElements((prev) => new Set(prev).add(elementId));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "-50px" }
    );

    const elements = sectionRef.current?.querySelectorAll("[data-reveal]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleElements.has(id);

  const bgColor = theme === "dark" ? "#0a0a0a" : "#fafaf9";
  const textColor = theme === "dark" ? "#ffffff" : LENITY.ink;
  const mutedColor = theme === "dark" ? "#a1a1a1" : LENITY.muted;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: bgColor }}
    >
      {/* Soft Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: `radial-gradient(circle, ${LENITY.accent} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.02]"
          style={{
            background: `radial-gradient(circle, ${LENITY.yellow} 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header - Asymmetric */}
        <div className="max-w-6xl mb-24">
          {/* Eyebrow */}
          <div
            data-reveal="eyebrow"
            className="mb-6 transition-all duration-700"
            style={{
              opacity: isVisible("eyebrow") ? 1 : 0,
              transform: isVisible("eyebrow")
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.95)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span
              className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] px-4 py-2 rounded-full"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(232,69,35,0.06)",
                color: theme === "dark" ? "#fafafa" : LENITY.accent,
                border: `1px solid ${
                  theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(232,69,35,0.1)"
                }`,
              }}
            >
              {eyebrow}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            {/* Heading */}
            <div className="lg:col-span-7">
              <h2
                data-reveal="heading"
                className="transition-all duration-700"
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: textColor,
                  opacity: isVisible("heading") ? 1 : 0,
                  transform: isVisible("heading")
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "100ms",
                }}
              >
                {heading}
              </h2>
            </div>

            {/* Description */}
            <div className="lg:col-span-5">
              <p
                data-reveal="description"
                className="transition-all duration-700"
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  color: mutedColor,
                  opacity: isVisible("description") ? 1 : 0,
                  transform: isVisible("description")
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "200ms",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Cards - Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Large Featured Card - Left */}
          <div
            data-reveal="card-0"
            className="lg:col-span-7 transition-all duration-700"
            style={{
              opacity: isVisible("card-0") ? 1 : 0,
              transform: isVisible("card-0")
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.98)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "300ms",
            }}
          >
            <div
              className="group relative overflow-hidden rounded-[2rem] transition-all duration-500"
              style={{
                background: theme === "dark" ? "#111111" : "#ffffff",
                border: `1px solid ${
                  theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                }`,
                boxShadow:
                  theme === "dark"
                    ? "0 1px 3px rgba(0,0,0,0.3)"
                    : "0 1px 3px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  theme === "dark"
                    ? "0 20px 60px rgba(0,0,0,0.5)"
                    : "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  theme === "dark"
                    ? "0 1px 3px rgba(0,0,0,0.3)"
                    : "0 1px 3px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04)";
              }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={cards[0].image}
                  alt={cards[0].imageAlt ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ willChange: "transform" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-10">
                <span
                  className="inline-block text-7xl font-bold mb-4 opacity-10"
                  style={{ fontFamily: SERIF, color: LENITY.accent }}
                >
                  {cards[0].number}
                </span>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: SERIF, color: textColor }}
                >
                  {cards[0].title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: mutedColor }}>
                  {cards[0].description}
                </p>
                {cards[0].stat && (
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl font-bold"
                      style={{ fontFamily: SERIF, color: LENITY.accent }}
                    >
                      {cards[0].stat}
                    </span>
                    <span className="text-sm font-medium" style={{ color: mutedColor }}>
                      {cards[0].statLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stacked Cards */}
          <div className="lg:col-span-5 space-y-8">
            {cards.slice(1, 3).map((card, index) => (
              <div
                key={card.id}
                data-reveal={`card-${index + 1}`}
                className="transition-all duration-700"
                style={{
                  opacity: isVisible(`card-${index + 1}`) ? 1 : 0,
                  transform: isVisible(`card-${index + 1}`)
                    ? "translateY(0) scale(1)"
                    : "translateY(40px) scale(0.98)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${400 + index * 100}ms`,
                }}
              >
                <div
                  className="group relative overflow-hidden rounded-[1.5rem] p-8 transition-all duration-500"
                  style={{
                    background: theme === "dark" ? "#111111" : "#ffffff",
                    border: `1px solid ${
                      theme === "dark"
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)"
                    }`,
                    boxShadow:
                      theme === "dark"
                        ? "0 1px 3px rgba(0,0,0,0.3)"
                        : "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      theme === "dark"
                        ? "0 12px 40px rgba(0,0,0,0.4)"
                        : "0 12px 40px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      theme === "dark"
                        ? "0 1px 3px rgba(0,0,0,0.3)"
                        : "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)";
                  }}
                >
                  <span
                    className="inline-block text-5xl font-bold mb-3 opacity-10"
                    style={{ fontFamily: SERIF, color: LENITY.accent }}
                  >
                    {card.number}
                  </span>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: SERIF, color: textColor }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>
                    {card.description}
                  </p>
                  {card.stat && (
                    <div className="flex items-baseline gap-2 mt-4">
                      <span
                        className="text-3xl font-bold"
                        style={{ fontFamily: SERIF, color: LENITY.accent }}
                      >
                        {card.stat}
                      </span>
                      <span className="text-xs font-medium" style={{ color: mutedColor }}>
                        {card.statLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          data-reveal="cta"
          className="mt-16 flex justify-center transition-all duration-700"
          style={{
            opacity: isVisible("cta") ? 1 : 0,
            transform: isVisible("cta") ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "600ms",
          }}
        >
          <a
            href={ctaLink}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300"
            style={{
              background: LENITY.accent,
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(232,69,35,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,69,35,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(232,69,35,0.15)";
            }}
          >
            {ctaText}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
