"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import SubmissionTable, { Column } from "./SubmissionTable";
import { LENITY } from "@/theme/lenity";

type Model = "contactSubmission" | "donationSubmission" | "volunteerSubmission" | "internshipSubmission" | "marriageRegistration";

interface Props {
  model: Model;
  columns: Column[];
  rows: Record<string, unknown>[];
  exportName: string;
  statusOptions?: string[];
  defaultSearch?: string;
}

export default function SortableTable({ model, columns, rows, exportName, statusOptions, defaultSearch = "" }: Props) {
  const [search, setSearch] = useState(defaultSearch);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const processed = useMemo(() => {
    let result = rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        columns.some(c => String(r[c.key] ?? "").toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const va = String(a[sortKey] ?? "");
        const vb = String(b[sortKey] ?? "");
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
    return result;
  }, [rows, search, sortKey, sortDir, columns]);

  return (
    <div>
      {/* Search + sort header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: LENITY.adminMuted }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg focus:outline-none"
            style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}`, color: LENITY.adminInk }}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {columns.slice(0, 4).map(c => (
            <button key={c.key} onClick={() => toggleSort(c.key)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors"
              style={{
                background: sortKey === c.key ? "rgba(99,102,241,0.15)" : LENITY.adminSoft,
                color: sortKey === c.key ? "#818cf8" : LENITY.adminMuted,
                border: `1px solid ${LENITY.adminLine}`,
              }}>
              {c.label}
              {sortKey === c.key
                ? sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                : null}
            </button>
          ))}
        </div>
      </div>

      <SubmissionTable
        model={model}
        columns={columns}
        rows={processed}
        exportName={exportName}
        statusOptions={statusOptions}
      />
    </div>
  );
}
