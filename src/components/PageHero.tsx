"use client";

/**
 * PageHero — Lenity light theme
 * ─────────────────────────────────────────────────────────────
 * Shared inner-page hero:
 * • Full-bleed photo background with dark overlay (keeps white navbar text readable)
 * • Orange eyebrow tag, Literata title, optional subtitle + icon
 * • Animated entrance for text
 */

import type { ReactNode } from "react";
import { LENITY, SERIF, IMG } from "@/theme/lenity";

interface Props {
  tag?:      string;
  title:     string;
  subtitle?: string;
  icon?:     ReactNode;
  /** background photo url — defaults to community image */
  image?:    string;
  /** kept for backwards-compat with existing call sites; unused in light theme */
  waveFill?: string;
}

export default function PageHero({ tag, title, subtitle, icon, image = IMG.community }: Props) {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      {/* photo bg */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      {/* dark overlay for readable white text */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(15,10,5,0.82) 0%, rgba(15,10,5,0.62) 60%, rgba(15,10,5,0.72) 100%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {icon && (
          <div className="hero-enter-0 flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: LENITY.accent, boxShadow: "0 10px 30px rgba(232,69,35,0.4)" }}>
              {icon}
            </div>
          </div>
        )}

        {tag && (
          <div className="hero-enter-0 mb-4">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white"
              style={{ background: LENITY.accent }}>
              {tag}
            </span>
          </div>
        )}

        <h1 className="hero-enter-1 text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
          style={{ fontFamily: SERIF }}>
          {title}
        </h1>

        {subtitle && (
          <p className="hero-enter-2 text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
