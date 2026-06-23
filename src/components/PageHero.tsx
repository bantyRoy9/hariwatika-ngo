"use client";

/**
 * PageHero
 * ─────────────────────────────────────────────────────────────
 * Shared inner-page hero with:
 * • Deep parallax scroll (background moves at 0.35× speed)
 * • Mouse-reactive floating blobs (CSS var --mx / --my)
 * • Particle dots drifting across
 * • Animated entrance for text
 * • Wavy bottom transition
 */

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface Props {
  tag?:      string;
  title:     string;
  subtitle?: string;
  icon?:     ReactNode;
  /** colour of bottom wave fill — defaults to #fbf9f4 */
  waveFill?: string;
}

const particles = [
  { s:4, t:"14%", l:"8%",  c:"#F4A433", d:"5s",   dl:"0s"   },
  { s:3, t:"35%", l:"92%", c:"#ffffff", d:"7s",   dl:"0.8s" },
  { s:5, t:"68%", l:"4%",  c:"#48cc84", d:"6s",   dl:"1.6s" },
  { s:3, t:"78%", l:"88%", c:"#F4A433", d:"8s",   dl:"0.4s" },
  { s:4, t:"50%", l:"50%", c:"#ffffff", d:"9s",   dl:"2.5s" },
  { s:3, t:"22%", l:"70%", c:"#48cc84", d:"5.5s", dl:"1.2s" },
  { s:5, t:"55%", l:"26%", c:"#F4A433", d:"7.5s", dl:"2s"   },
  { s:4, t:"10%", l:"55%", c:"#ffffff", d:"6.5s", dl:"0.6s" },
];

export default function PageHero({ tag, title, subtitle, icon, waveFill = "#fbf9f4" }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  /* scroll parallax on background */
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.35}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section className="relative pt-28 pb-20 overflow-hidden">

      {/* ── Parallax bg gradient ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(133,83,0,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 70% 50% at 80% 70%, rgba(244,164,51,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,109,62,0.14) 0%, transparent 70%),
            linear-gradient(155deg, #080300 0%, #1c0900 20%, #3b1600 45%, #2a1000 70%, #0d0500 100%)
          `,
        }}
      />

      {/* ── CSS-var driven blobs (react to mouse via CSS) ── */}
      <div
        className="absolute inset-0 pointer-events-none hero-blob-1"
        style={{
          background: "radial-gradient(circle 320px at 20% 35%, rgba(133,83,0,0.35) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: "translate(calc(var(--mx,0.5) * 30px - 15px), calc(var(--my,0.5) * 20px - 10px))",
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hero-blob-2"
        style={{
          background: "radial-gradient(circle 400px at 75% 70%, rgba(244,164,51,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(calc(var(--mx,0.5) * -20px + 10px), calc(var(--my,0.5) * -15px + 8px))",
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* ── Particle dots ── */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none particle"
          style={{
            width:      p.s, height: p.s,
            top: p.t, left: p.l,
            background: p.c,
            "--dur":    p.d,
            "--delay":  p.dl,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {icon && (
          <div className="hero-enter-0 flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(244,164,51,0.15)",
                border:     "1px solid rgba(244,164,51,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              {icon}
            </div>
          </div>
        )}

        {tag && (
          <div className="hero-enter-0 mb-4">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A433]"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(244,164,51,0.25)", backdropFilter: "blur(12px)" }}
            >
              {tag}
            </span>
          </div>
        )}

        <h1
          className="hero-enter-1 text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: "'Literata', serif",
            background: "linear-gradient(135deg, #ffffff 0%, #F4A433 45%, #ffd580 70%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="hero-enter-2 text-white/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 70" className="w-full block">
          <path
            d="M0,35 C200,65 400,10 600,35 C800,60 1000,15 1200,38 C1300,50 1380,25 1440,35 L1440,70 L0,70 Z"
            fill={waveFill}
          />
        </svg>
      </div>
    </section>
  );
}
