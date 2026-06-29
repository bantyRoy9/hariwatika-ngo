import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LENITY } from "@/theme/lenity";

const COLOR_MAP = {
  green:  { border: "#22c55e", bg: "rgba(34,197,94,0.10)",  text: "#22c55e" },
  amber:  { border: "#f59e0b", bg: "rgba(245,158,11,0.10)", text: "#d97706" },
  red:    { border: "#ef4444", bg: "rgba(239,68,68,0.10)",  text: "#dc2626" },
  blue:   { border: "#3b82f6", bg: "rgba(59,130,246,0.10)", text: "#2563eb" },
  cyan:   { border: "#06b6d4", bg: "rgba(6,182,212,0.10)",  text: "#0891b2" },
  orange: { border: "#E84523", bg: "rgba(232,69,35,0.10)",  text: "#E84523" },
};

interface Props {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  href: string;
  color?: keyof typeof COLOR_MAP;
  icon?: React.ReactNode;
}

export default function KpiCard({ label, value, trend, trendLabel, href, color = "blue", icon }: Props) {
  const c = COLOR_MAP[color];

  return (
    <Link href={href} className="block rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}`, borderLeft: `4px solid ${c.border}` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide mb-1 truncate" style={{ color: LENITY.adminMuted }}>
            {label}
          </p>
          <p className="text-2xl font-bold tabular-nums" style={{ color: LENITY.adminInk }}>{value}</p>
          {trend && trendLabel && (
            <div className="flex items-center gap-1 mt-1">
              {trend === "up"      && <TrendingUp   className="w-3 h-3" style={{ color: "#22c55e" }} />}
              {trend === "down"    && <TrendingDown  className="w-3 h-3" style={{ color: "#ef4444" }} />}
              {trend === "neutral" && <Minus         className="w-3 h-3" style={{ color: LENITY.adminMuted }} />}
              <span className="text-[11px]" style={{ color: trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : LENITY.adminMuted }}>
                {trendLabel}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: c.bg, color: c.text }}>
            {icon}
          </div>
        )}
      </div>
    </Link>
  );
}
