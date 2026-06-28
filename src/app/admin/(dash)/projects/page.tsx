import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageTitle } from "../../_components/ui";
import { MapPin, ExternalLink } from "lucide-react";
import { LENITY, SERIF } from "@/theme/lenity";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  ongoing:   { bg: "rgba(232,69,35,0.10)",  color: "#E84523", label: "Ongoing" },
  completed: { bg: "rgba(34,197,94,0.10)",   color: "#16a34a", label: "Completed" },
  planned:   { bg: "rgba(245,158,11,0.10)",  color: "#d97706", label: "Planned" },
};

export default async function ProjectsBoardPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  const totalRaised = projects.reduce((s, p) => s + p.raised, 0);
  const totalGoal   = projects.reduce((s, p) => s + p.goal, 0);

  const groups = {
    ongoing:   projects.filter(p => p.status === "ongoing"),
    completed: projects.filter(p => p.status === "completed"),
    planned:   projects.filter(p => !["ongoing", "completed"].includes(p.status)),
  };

  const StatBadge = ({ value, label, color }: { value: string | number; label: string; color: string }) => (
    <div className="rounded-xl px-4 py-3 text-center" style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs" style={{ color: LENITY.adminMuted }}>{label}</div>
    </div>
  );

  return (
    <div style={{ color: LENITY.adminInk }}>
      <PageTitle
        title="Projects Board"
        subtitle="Live status of all NGO projects and programs."
        action={
          <Link href="/admin/content/projects" className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{ background: LENITY.adminSoft, color: LENITY.adminInk, border: `1px solid ${LENITY.adminLine}` }}>
            Edit Projects →
          </Link>
        }
      />

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatBadge value={projects.length} label="Total Projects" color="#3b82f6" />
        <StatBadge value={groups.ongoing.length} label="Ongoing" color="#E84523" />
        <StatBadge value={`₹${(totalRaised / 1000).toFixed(0)}k`} label="Total Raised" color="#22c55e" />
        <StatBadge value={`₹${(totalGoal / 1000).toFixed(0)}k`} label="Total Goal" color="#f59e0b" />
      </div>

      {/* 3-column status board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["ongoing", "completed", "planned"] as const).map(status => {
          const style = STATUS_STYLE[status] ?? STATUS_STYLE.ongoing;
          const group = groups[status];
          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: style.color }} />
                <h2 className="font-semibold text-sm" style={{ fontFamily: SERIF, color: LENITY.adminInk }}>
                  {style.label}
                </h2>
                <span className="ml-auto text-xs rounded-full px-2 py-0.5 font-semibold"
                  style={{ background: style.bg, color: style.color }}>
                  {group.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {group.length === 0 && (
                  <div className="rounded-xl p-4 text-center text-sm" style={{ background: LENITY.adminSoft, color: LENITY.adminMuted, border: `1px solid ${LENITY.adminLine}` }}>
                    No {status} projects
                  </div>
                )}
                {group.map(p => {
                  const pct = p.goal > 0 ? Math.min(100, Math.round((p.raised / p.goal) * 100)) : 0;
                  return (
                    <div key={p.id} className="rounded-xl p-4 transition-all hover:-translate-y-0.5"
                      style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm font-semibold leading-snug flex-1" style={{ color: LENITY.adminInk }}>{p.titleEn}</h3>
                        <Link href="/admin/content/projects" className="shrink-0 hover:opacity-70">
                          <ExternalLink className="w-3.5 h-3.5" style={{ color: LENITY.adminMuted }} />
                        </Link>
                      </div>
                      <div className="flex items-center gap-1 mb-2 text-[11px]" style={{ color: LENITY.adminMuted }}>
                        <MapPin className="w-3 h-3" />
                        {p.location}
                      </div>
                      {p.goal > 0 && (
                        <>
                          <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: "rgba(255,255,255,0.08)" }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: style.color }} />
                          </div>
                          <div className="flex justify-between text-[11px]" style={{ color: LENITY.adminMuted }}>
                            <span>₹{p.raised.toLocaleString("en-IN")} raised</span>
                            <span>{pct}%</span>
                          </div>
                        </>
                      )}
                      <div className="mt-2 text-[11px]" style={{ color: LENITY.adminMuted }}>
                        {p.beneficiaries}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
