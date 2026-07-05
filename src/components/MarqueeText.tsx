"use client";

import { useRef } from "react";

interface MarqueeTextProps {
  texts: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export default function MarqueeText({
  texts,
  speed = 50,
  direction = "left",
  className = "",
  textClassName = "",
}: MarqueeTextProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {/* First set of texts */}
        {texts.map((text, index) => (
          <span
            key={`first-${index}`}
            className={`inline-block px-8 ${textClassName}`}
          >
            {text}
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {texts.map((text, index) => (
          <span
            key={`second-${index}`}
            className={`inline-block px-8 ${textClassName}`}
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
