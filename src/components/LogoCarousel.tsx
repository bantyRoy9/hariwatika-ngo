"use client";

import { useRef, useEffect } from "react";

interface Logo {
  id: number;
  name: string;
  image: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number;
}

export default function LogoCarousel({
  logos,
  direction = "left",
  speed = 30,
}: LogoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    // Duplicate logos for seamless loop
    const clone = scroll.innerHTML;
    scroll.innerHTML = clone + clone;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      if (direction === "left") {
        scrollPosition += 0.5;
        if (scrollPosition >= scroll.scrollWidth / 2) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= 0.5;
        if (scrollPosition <= -scroll.scrollWidth / 2) {
          scrollPosition = 0;
        }
      }
      scroll.style.transform = `translateX(${-scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [direction]);

  return (
    <div className="overflow-hidden relative">
      <div
        ref={scrollRef}
        className="flex gap-12 items-center"
        style={{ willChange: "transform" }}
      >
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
