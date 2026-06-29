"use client";

import { useState } from "react";
import { LENITY, SERIF } from "@/theme/lenity";

type Project = {
  titleEn: string;
  titleHi: string;
  location: string;
  beneficiaries: string;
  status: string;
};

interface Props {
  projects: Project[];
  lang?: "en" | "hi";
}

/* Approximate SVG coordinates for Bihar districts (viewBox 0 0 400 320) */
const DISTRICT_COORDS: Record<string, [number, number]> = {
  "west champaran": [60, 55],
  "bettiah":        [65, 60],
  "east champaran": [120, 58],
  "sitamarhi":      [155, 48],
  "muzaffarpur":    [160, 90],
  "gopalganj":      [75, 105],
  "siwan":          [80, 140],
  "saran":          [115, 148],
  "vaishali":       [170, 115],
  "darbhanga":      [195, 72],
  "madhubani":      [215, 58],
  "samastipur":     [200, 105],
  "begusarai":      [230, 105],
  "khagaria":       [240, 90],
  "supaul":         [250, 65],
  "madhepura":      [265, 75],
  "saharsa":        [255, 90],
  "purnia":         [295, 68],
  "katihar":        [320, 85],
  "araria":         [285, 55],
  "kishanganj":     [310, 45],
  "sheikhpura":     [235, 135],
  "nalanda":        [195, 155],
  "patna":          [175, 148],
  "bhojpur":        [130, 165],
  "buxar":          [100, 170],
  "rohtas":         [120, 195],
  "kaimur":         [90, 200],
  "aurangabad":     [160, 200],
  "gaya":           [185, 200],
  "jehanabad":      [185, 175],
  "arwal":          [175, 185],
  "nawada":         [210, 195],
  "lakhisarai":     [230, 130],
  "munger":         [245, 130],
  "jamui":          [255, 155],
  "banka":          [275, 155],
  "bhagalpur":      [290, 135],
  "default":        [65, 60],  /* fallback: West Champaran HQ */
};

function matchDistrict(location: string): [number, number] {
  const loc = location.toLowerCase();
  for (const [key, coords] of Object.entries(DISTRICT_COORDS)) {
    if (key !== "default" && loc.includes(key)) return coords;
  }
  return DISTRICT_COORDS["default"];
}

const STATUS_COLOR: Record<string, string> = {
  ongoing:   "#E84523",
  completed: "#22c55e",
  planned:   "#f59e0b",
};

export default function ProjectMap({ projects, lang = "en" }: Props) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; project: Project } | null>(null);

  const dots = projects.map((p) => ({
    project: p,
    coords: matchDistrict(p.location),
    color: STATUS_COLOR[p.status] ?? STATUS_COLOR.ongoing,
  }));

  return (
    <section className="py-16" style={{ background: LENITY.soft }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: LENITY.accent }}>Where We Work</span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: SERIF, color: LENITY.ink }}>
            Our Projects Across Bihar
          </h2>
        </div>

        <div className="relative bg-white rounded-3xl shadow-sm border overflow-hidden"
          style={{ borderColor: "rgba(232,69,35,0.12)" }}>
          {/* Bihar SVG outline — simplified polygon approximation */}
          <svg viewBox="0 0 400 280" className="w-full" style={{ maxHeight: 420 }}
            aria-label="Map of Bihar showing project locations">
            {/* State outline — simplified Bihar silhouette */}
            <path
              d="M 40 80 L 50 40 L 90 25 L 150 20 L 200 18 L 260 22 L 310 30 L 345 50 L 360 80 L 358 110 L 345 140 L 330 160 L 310 175 L 280 190 L 255 215 L 220 235 L 190 245 L 160 240 L 130 235 L 100 230 L 70 220 L 50 200 L 38 175 L 35 150 L 38 120 Z"
              fill="rgba(232,69,35,0.06)"
              stroke="rgba(232,69,35,0.25)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* District grid lines (subtle) */}
            {[80, 120, 160, 200].map(y => (
              <line key={y} x1="35" y1={y} x2="365" y2={y} stroke="rgba(232,69,35,0.06)" strokeWidth="1" />
            ))}
            {[100, 160, 220, 280, 340].map(x => (
              <line key={x} x1={x} y1="20" x2={x} y2="248" stroke="rgba(232,69,35,0.06)" strokeWidth="1" />
            ))}

            {/* Project location dots */}
            {dots.map(({ project, coords, color }, i) => (
              <g key={i}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
                  setTooltip({ x: coords[0], y: coords[1], project });
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => setTooltip(tooltip?.project === project ? null : { x: coords[0], y: coords[1], project })}
              >
                {/* Pulse ring */}
                <circle cx={coords[0]} cy={coords[1]} r="10" fill={color} opacity="0.2">
                  <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Main dot */}
                <circle cx={coords[0]} cy={coords[1]} r="5" fill={color} stroke="white" strokeWidth="1.5" />
              </g>
            ))}

            {/* Tooltip */}
            {tooltip && (() => {
              const tx = Math.min(tooltip.x + 10, 270);
              const ty = Math.max(tooltip.y - 50, 5);
              return (
                <g>
                  <rect x={tx} y={ty} width="120" height="50" rx="6" fill="white"
                    stroke="rgba(232,69,35,0.3)" strokeWidth="1"
                    style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))" }} />
                  <text x={tx + 8} y={ty + 16} fontSize="8" fontWeight="700" fill="#1a1a1a">
                    {(lang === "hi" ? tooltip.project.titleHi : tooltip.project.titleEn).slice(0, 22)}
                  </text>
                  <text x={tx + 8} y={ty + 28} fontSize="7" fill="#6b7280">{tooltip.project.location.slice(0, 24)}</text>
                  <text x={tx + 8} y={ty + 40} fontSize="7" fill="#6b7280">{tooltip.project.beneficiaries.slice(0, 24)}</text>
                </g>
              );
            })()}
          </svg>

          {/* Legend */}
          <div className="px-6 pb-5 flex flex-wrap gap-5 text-xs font-medium" style={{ color: LENITY.muted }}>
            {Object.entries(STATUS_COLOR).map(([status, color]) => (
              <span key={status} className="flex items-center gap-1.5 capitalize">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: color }} />
                {status}
              </span>
            ))}
            <span className="ml-auto">{projects.length} projects mapped</span>
          </div>
        </div>
      </div>
    </section>
  );
}
