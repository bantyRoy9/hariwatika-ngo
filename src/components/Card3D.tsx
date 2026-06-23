"use client";

/**
 * Card3D
 * ─────────────────────────────────────────────────────────────
 * Drop-in replacement for any card container.
 * Features:
 * • perspective tilt follows mouse within the card
 * • radial specular highlight chases cursor
 * • subtle scale + shadow lift on hover
 * • smooth spring-back on mouse-leave
 * • respects prefers-reduced-motion
 */

import { useRef, type ReactNode, type CSSProperties } from "react";

interface Props {
  children:   ReactNode;
  className?: string;
  style?:     CSSProperties;
  /** tilt intensity — degrees. Default 12 */
  intensity?: number;
  /** disable tilt (e.g. on mobile) */
  disabled?:  boolean;
}

export default function Card3D({
  children,
  className = "",
  style,
  intensity = 12,
  disabled  = false,
}: Props) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const r   = card.getBoundingClientRect();
      const x   = (e.clientX - r.left)  / r.width  - 0.5;   // -0.5 → 0.5
      const y   = (e.clientY - r.top)   / r.height - 0.5;

      card.style.transform =
        `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * (intensity * 0.75)}deg) scale3d(1.025,1.025,1.025)`;

      /* specular shine */
      const shine = shineRef.current;
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 55%)`;
        shine.style.opacity = "1";
      }
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (card) card.style.transform = "";
    const shine = shineRef.current;
    if (shine) shine.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transformStyle:  "preserve-3d",
        transition:      "transform 0.18s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease",
        willChange:      "transform",
        position:        "relative",
        overflow:        "hidden",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Specular shine overlay */}
      <div
        ref={shineRef}
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          borderRadius:  "inherit",
          pointerEvents: "none",
          opacity:       0,
          transition:    "opacity 0.25s ease",
          zIndex:        10,
        }}
      />
      {children}
    </div>
  );
}
