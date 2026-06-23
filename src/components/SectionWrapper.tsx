"use client";

/**
 * SectionWrapper
 * ─────────────────────────────────────────────────────────────
 * Wraps any page section and provides:
 *
 * • Scroll-driven fade-in + slide-up (IntersectionObserver)
 * • Optional floating blob decorations (depth layer)
 * • Optional grid/dot pattern overlay
 * • Optional parallax offset on the section background
 *
 * Usage:
 *   <SectionWrapper blobs pattern>
 *     … content …
 *   </SectionWrapper>
 */

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children:    ReactNode;
  className?:  string;
  /** Show ambient blob decorations */
  blobs?:      boolean;
  /** Show subtle dot-grid pattern */
  pattern?:    "dots" | "lines" | false;
  /** Slow scroll parallax on the section itself */
  parallax?:   boolean;
  /** stagger delay for child fade-ins (ms) */
  delay?:      number;
  id?:         string;
}

export default function SectionWrapper({
  children,
  className = "",
  blobs     = false,
  pattern   = false,
  parallax  = false,
  delay     = 0,
  id,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  /* Fade-in on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    /* Animate direct children with staggered delay */
    const children = Array.from(el.querySelectorAll<HTMLElement>(":scope > [data-reveal]"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const idx    = parseInt(target.dataset.idx ?? "0", 10);
          setTimeout(() => {
            target.style.opacity   = "1";
            target.style.transform = "translateY(0) scale(1)";
          }, delay + idx * 80);
          obs.unobserve(target);
        });
      },
      { threshold: 0.08 }
    );

    children.forEach((child, i) => {
      child.dataset.idx = String(i);
      child.style.opacity   = "0";
      child.style.transform = "translateY(28px) scale(0.98)";
      child.style.transition = "opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1)";
      obs.observe(child);
    });

    return () => obs.disconnect();
  }, [delay]);

  /* Parallax scroll offset */
  useEffect(() => {
    if (!parallax) return;
    const el = sectionRef.current;
    if (!el) return;
    const bg = el.querySelector<HTMLElement>(".section-parallax-bg");
    if (!bg) return;
    const fn = () => {
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      bg.style.transform = `translateY(${progress * 40}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [parallax]);

  const patternStyle =
    pattern === "dots"
      ? {
          backgroundImage:
            "radial-gradient(circle, rgba(133,83,0,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }
      : pattern === "lines"
      ? {
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(133,83,0,0.04) 0px, rgba(133,83,0,0.04) 1px, transparent 1px, transparent 40px)",
        }
      : undefined;

  return (
    <section ref={sectionRef} id={id} className={`relative overflow-hidden ${className}`}>
      {/* Pattern overlay */}
      {pattern && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={patternStyle}
          aria-hidden="true"
        />
      )}

      {/* Parallax bg layer */}
      {parallax && (
        <div
          className="section-parallax-bg absolute inset-0 -top-8 -bottom-8 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Ambient blob decorations */}
      {blobs && (
        <>
          <div
            className="absolute pointer-events-none hero-blob-1"
            aria-hidden="true"
            style={{
              top: "-10%", left: "-5%",
              width: 340, height: 340,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(133,83,0,0.08) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute pointer-events-none hero-blob-2"
            aria-hidden="true"
            style={{
              bottom: "-8%", right: "-4%",
              width: 400, height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(244,164,51,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
