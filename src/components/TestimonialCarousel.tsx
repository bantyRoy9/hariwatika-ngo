"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, next, interval]);

  const testimonial = testimonials[current];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Testimonial */}
      <div className="relative min-h-[300px] flex items-center justify-center px-16">
        {testimonials.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === current
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-95 z-0"
            }`}
          >
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
              {/* Quote Icon */}
              <Quote
                className="w-16 h-16 mb-6"
                style={{ color: LENITY.yellow, opacity: 0.4 }}
              />

              {/* Quote Text */}
              <blockquote
                className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 italic"
                style={{ fontFamily: SERIF, color: LENITY.ink }}
              >
                "{item.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: LENITY.accent }}
                  >
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p
                    className="font-bold text-lg"
                    style={{ color: LENITY.ink }}
                  >
                    {item.name}
                  </p>
                  <p className="text-sm" style={{ color: LENITY.muted }}>
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "white", color: LENITY.accent }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "white", color: LENITY.accent }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current ? "w-8 h-2" : "w-2 h-2"
            }`}
            style={{
              background: index === current ? LENITY.accent : "#d1d5db",
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
