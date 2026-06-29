"use client";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import { LENITY } from "@/theme/lenity";

export type RecentRow = {
  id: number;
  type: "contact" | "donation" | "volunteer" | "internship" | "marriage";
  name: string;
  mobile?: string;
  date: string;
  status?: string;
  href: string;
};

const TYPE_LABELS: Record<RecentRow["type"], string> = {
  contact:    "Contact",
  donation:   "Donation",
  volunteer:  "Volunteer",
  internship: "Internship",
  marriage:   "Marriage",
};

const TYPE_COLORS: Record<RecentRow["type"], string> = {
  contact:    "#2563eb",
  donation:   "#22c55e",
  volunteer:  "#8b5cf6",
  internship: "#f59e0b",
  marriage:   "#ec4899",
};

export default function RecentSubmissionsTable({ rows }: { rows: RecentRow[] }) {
  const router = useRouter();
  if (!rows.length) {
    return (
      <div className="rounded-xl p-6 text-center"
        style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
        <p className="text-sm" style={{ color: LENITY.adminMuted }}>No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${LENITY.adminLine}` }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: LENITY.adminBg, borderBottom: `1px solid ${LENITY.adminLine}` }}>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: LENITY.adminMuted }}>Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: LENITY.adminMuted }}>Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide hidden sm:table-cell" style={{ color: LENITY.adminMuted }}>Mobile</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: LENITY.adminMuted }}>Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: LENITY.adminMuted }}>Status</th>
            </tr>
          </thead>
          <tbody style={{ background: LENITY.adminSoft }}>
            {rows.map((row) => (
              <tr
                key={`${row.type}-${row.id}`}
                className="cursor-pointer transition-colors hover:bg-white/5"
                style={{ borderTop: `1px solid ${LENITY.adminLine}` }}
                onClick={() => router.push(row.href)}
              >
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: `${TYPE_COLORS[row.type]}18`, color: TYPE_COLORS[row.type] }}>
                    {TYPE_LABELS[row.type]}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium truncate max-w-[120px]" style={{ color: LENITY.adminInk }}>{row.name}</td>
                <td className="px-4 py-3 hidden sm:table-cell" style={{ color: LENITY.adminMuted }}>{row.mobile ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: LENITY.adminMuted }}>
                  {new Date(row.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                </td>
                <td className="px-4 py-3">
                  {row.status ? <StatusBadge status={row.status} /> : <span style={{ color: LENITY.adminMuted }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
