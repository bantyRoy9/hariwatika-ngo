import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          bright: "var(--color-accent-bright)",
          green: "var(--color-accent-green)",
          "green-light": "var(--color-accent-green-light)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          soft: "var(--color-surface-soft)",
          muted: "var(--color-surface-muted)",
          elevated: "var(--color-surface-elevated)",
        },
        on: {
          surface: "var(--color-on-surface)",
          "surface-variant": "var(--color-on-surface-variant)",
        },
        admin: {
          bg: "#0f1117",
          soft: "#161b27",
          line: "rgba(255,255,255,0.08)",
          ink: "#e2e8f0",
          muted: "#64748b",
        },
        semantic: {
          green: "#22c55e",
          "green-soft": "rgba(34,197,94,0.12)",
          amber: "#f59e0b",
          "amber-soft": "rgba(245,158,11,0.12)",
          red: "#ef4444",
          "red-soft": "rgba(239,68,68,0.12)",
          blue: "#3b82f6",
          "blue-soft": "rgba(59,130,246,0.12)",
          cyan: "#06b6d4",
          "cyan-soft": "rgba(6,182,212,0.12)",
        },
      },
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        display: "var(--font-display)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        sm: "0 2px 8px var(--color-shadow-sm)",
        DEFAULT: "0 4px 16px var(--color-shadow-sm)",
        md: "0 8px 24px var(--color-shadow-md)",
        lg: "0 16px 48px var(--color-shadow-lg)",
        xl: "0 24px 64px var(--color-shadow-lg)",
        "premium-sm": "0 4px 12px rgba(139, 90, 43, 0.08), 0 2px 6px rgba(139, 90, 43, 0.04)",
        "premium-md": "0 8px 24px rgba(139, 90, 43, 0.12), 0 4px 12px rgba(139, 90, 43, 0.06)",
        "premium-lg": "0 16px 48px rgba(139, 90, 43, 0.15), 0 8px 24px rgba(139, 90, 43, 0.08)",
        "premium-xl": "0 24px 64px rgba(139, 90, 43, 0.20), 0 12px 32px rgba(139, 90, 43, 0.10)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease-smooth)",
        spring: "var(--ease-spring)",
        elegant: "var(--ease-elegant)",
      },
      animation: {
        "reveal-elegant": "reveal-elegant 0.9s var(--ease-elegant) both",
        "float-natural": "float-natural 6s var(--ease-smooth) infinite",
        "shimmer-elegant": "shimmer-elegant 3s linear infinite",
        "blob-organic": "blob-organic 16s ease-in-out infinite",
        "gradient-flow": "gradient-flow 8s ease infinite",
        "glow-dot": "glow-dot-elegant 2.5s ease-in-out infinite",
        "ring-pulse": "ring-pulse-elegant 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cursor-blink": "cursor-blink 1s steps(2) infinite",
      },
      spacing: {
        "section": "var(--section-padding)",
      },
      backdropBlur: {
        premium: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
