"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Users, TreePine, HandHeart } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

type Stat = { value: string; labelEn: string; labelHi: string };

interface Props {
  stats: Stat[];
  lang?: "en" | "hi";
}

const ICONS = [Heart, Users, TreePine, HandHeart];
const COLORS = [LENITY.accent, "#f59e0b", "#22c55e", "#2563eb"];

function AnimatedNumber({ target, started }: { target: string; started: boolean }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!started) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    let tick = 0;
    const total = 80;
    const id = setInterval(() => {
      tick++;
      setDisplay(Math.round((tick / total) * num) + suffix);
      if (tick >= total) { setDisplay(target); clearInterval(id); }
    }, 18);
    return () => clearInterval(id);
  }, [started, target]);

  return <span>{display}</span>;
}

export default function ImpactCounter({ stats, lang = "en" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayStats = stats.length > 0 ? stats : [
    { value: "25+",    labelEn: "Years of Service",      labelHi: "सेवा के वर्ष" },
    { value: "5000+",  labelEn: "Families Helped",       labelHi: "परिवारों की मदद" },
    { value: "10000+", labelEn: "Trees Planted",         labelHi: "वृक्ष लगाए" },
    { value: "200+",   labelEn: "Marriages Facilitated", labelHi: "विवाह सम्पन्न" },
  ];

  return (
    <section ref={ref} className="py-20" style={{ background: LENITY.soft }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: LENITY.accent }}>Our Impact</span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>
            25+ Years of Seva in Numbers
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.slice(0, 4).map((stat, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = COLORS[i % COLORS.length];
            return (
              <div
                key={i}
                className="rounded-2xl p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: "#fff", border: `1px solid rgba(232,69,35,0.12)` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${color}18` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="text-4xl font-bold mb-1 tabular-nums"
                  style={{ fontFamily: SERIF, color: LENITY.ink }}>
                  <AnimatedNumber target={stat.value} started={started} />
                </div>
                <div className="text-sm font-medium" style={{ color: LENITY.muted }}>
                  {lang === "hi" ? stat.labelHi : stat.labelEn}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
