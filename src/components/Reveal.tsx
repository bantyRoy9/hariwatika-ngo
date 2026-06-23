"use client";

/**
 * Reveal — scroll-triggered entrance animation for individual elements.
 * Works independently of SectionWrapper.
 */

import { useEffect, useRef, type ReactNode } from "react";

type Animation = "slide-up" | "slide-left" | "slide-right" | "scale" | "fade";

interface Props {
  children:   ReactNode;
  className?: string;
  animation?: Animation;
  delay?:     number;   /* ms */
  duration?:  number;   /* ms */
  threshold?: number;   /* 0–1 */
}

const TRANSFORMS: Record<Animation, string> = {
  "slide-up":    "translateY(36px)",
  "slide-left":  "translateX(-36px)",
  "slide-right": "translateX(36px)",
  "scale":       "scale(0.88)",
  "fade":        "none",
};

export default function Reveal({
  children,
  className = "",
  animation = "slide-up",
  delay     = 0,
  duration  = 650,
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initial = TRANSFORMS[animation];
    el.style.opacity   = "0";
    el.style.transform = initial === "none" ? "" : initial;
    el.style.transition = `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity   = "1";
        el.style.transform = "";
        el.style.willChange = "auto";
        obs.unobserve(el);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animation, delay, duration, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
