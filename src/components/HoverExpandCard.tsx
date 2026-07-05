"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";
import Link from "next/link";

interface HoverExpandCardProps {
  number: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  link?: string;
  linkText?: React.ReactNode;
}

export default function HoverExpandCard({
  number,
  title,
  description,
  image,
  link = "#",
  linkText = "Read More",
}: HoverExpandCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 hover:shadow-2xl"
      style={{
        height: "320px",
        background: "#f5f5f5",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(232,69,35,0.95) 0%, rgba(26,26,26,0.95) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* Large Number (Always Visible) */}
      <div
        className="absolute top-6 right-6 text-white font-bold transition-all duration-500"
        style={{
          fontSize: isHovered ? "4rem" : "6rem",
          fontFamily: SERIF,
          opacity: isHovered ? 0.15 : 0.3,
          lineHeight: 1,
          transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        }}
      >
        {number}
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {/* Title (Always Visible) */}
        <h3
          className="text-white font-bold mb-2 transition-all duration-500"
          style={{
            fontFamily: SERIF,
            fontSize: isHovered ? "1.75rem" : "1.5rem",
            transform: isHovered ? "translateY(-10px)" : "translateY(0)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>

        {/* Description (Visible on Hover) */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "200px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <p
            className="text-white/90 text-sm leading-relaxed mb-4"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.5s ease 0.1s",
            }}
          >
            {description}
          </p>

          {/* Link Button (Visible on Hover) */}
          <Link
            href={link}
            className="inline-flex items-center gap-2 text-white font-semibold text-sm group/btn"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.5s ease 0.2s",
            }}
          >
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              style={{
                background: LENITY.yellow,
                color: LENITY.ink,
              }}
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <span className="uppercase tracking-wider">{linkText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
