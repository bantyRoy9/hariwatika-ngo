"use client";

import { LENITY, SERIF } from "@/theme/lenity";
import { ChevronDown } from "lucide-react";

interface Stat {
  value: string;
  /** ReactNode so admins can pass an <EditableText> for inline editing. */
  label: React.ReactNode;
}

interface PremiumHeroProps {
  /** ReactNode so admins can pass an <EditableText> for inline editing. */
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  stats?: Stat[];
  breadcrumbs?: { label: React.ReactNode; href?: string }[];
  overlay?: "gradient" | "solid" | "pattern";
  height?: "small" | "medium" | "large";
}

export default function PremiumHero({
  title,
  subtitle,
  description,
  image = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80",
  stats,
  breadcrumbs,
  overlay = "gradient",
  height = "medium",
}: PremiumHeroProps) {
  const heightClasses = {
    small: "py-20 md:py-24",
    medium: "py-24 md:py-32",
    large: "py-32 md:py-40",
  };

  const overlayStyles = {
    gradient: "linear-gradient(135deg, rgba(232,69,35,0.92) 0%, rgba(26,26,26,0.92) 100%)",
    solid: "rgba(232,69,35,0.95)",
    pattern:
      "linear-gradient(135deg, rgba(232,69,35,0.90) 0%, rgba(26,26,26,0.88) 100%)",
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${image})`,
          transform: "scale(1.1)",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: overlayStyles[overlay],
          }}
        />

        {/* Pattern Overlay */}
        {overlay === "pattern" && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: LENITY.yellow, animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: LENITY.accent,
            animationDuration: "6s",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Content */}
      <div className={`relative ${heightClasses[height]}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6 animate-fade-in">
              <ol className="flex items-center gap-2 text-sm text-white/80">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {crumb.href ? (
                      <a
                        href={crumb.href}
                        className="hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-white font-semibold">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-white/60">/</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="max-w-4xl">
            {/* Subtitle/Eyebrow */}
            {subtitle && (
              <div className="mb-6 hero-badge">
                <span
                  className="inline-flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-white"
                  style={{
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <span
                    className="inline-block w-12 h-0.5"
                    style={{ background: LENITY.yellow }}
                  />
                  {subtitle}
                </span>
              </div>
            )}

            {/* Main Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight hero-title"
              style={{
                fontFamily: SERIF,
                textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 hero-sub"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  textShadow: "0 2px 15px rgba(0,0,0,0.3)",
                  maxWidth: "800px",
                }}
              >
                {description}
              </p>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-10 hero-stats">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"
                      style={{ background: "white", filter: "blur(20px)" }}
                    />
                    <div className="relative">
                      <div
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                        style={{
                          fontFamily: SERIF,
                          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-wider"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hero-scroll">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  );
}
