"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { LENITY } from "@/theme/lenity";
import { Btn, ConfirmDelete } from "./ui";
import { deleteSubmission, updateSubmissionStatus } from "@/app/actions/content";

export type Column = { key: string; label: string };

type Model = "contactSubmission" | "donationSubmission" | "volunteerSubmission" | "internshipSubmission" | "marriageRegistration";

export default function SubmissionTable({
  model,
  columns,
  rows,
  exportName,
  statusOptions,
}: {
  model: Model;
  columns: Column[];
  rows: Record<string, unknown>[];
  exportName: string;
  statusOptions?: string[];
}) {
  const [list, setList] = useState(rows);

  const exportExcel = () => {
    const data = list.map((r) => {
      const o: Record<string, unknown> = {};
      for (const c of columns) o[c.label] = r[c.key];
      return o;
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, exportName);
    XLSX.writeFile(wb, `${exportName}.xlsx`);
  };

  const remove = async (id: number) => {
    await deleteSubmission(model, id);
    setList((l) => l.filter((r) => Number(r.id) !== id));
  };

  const setStatus = async (id: number, status: string) => {
    if (model !== "contactSubmission" && model !== "donationSubmission") return;
    await updateSubmissionStatus(model, id, status);
    setList((l) => l.map((r) => (Number(r.id) === id ? { ...r, status } : r)));
  };

  const fmt = (v: unknown): string => {
    if (v == null) return "";
    if (typeof v === "string" && v.startsWith("[")) {
      try { return (JSON.parse(v) as string[]).join(", "); } catch { return v; }
    }
    if (v instanceof Date) return v.toLocaleString();
    return String(v);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm" style={{ color: LENITY.muted }}>{list.length} record(s)</p>
        <Btn onClick={exportExcel}>Export Excel</Btn>
      </div>
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: LENITY.line }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: LENITY.soft }}>
              {columns.map((c) => (
                <th key={c.key} className="text-left px-3 py-2 font-semibold whitespace-nowrap" style={{ color: LENITY.ink }}>
                  {c.label}
                </th>
              ))}
              {statusOptions && <th className="px-3 py-2 text-left font-semibold" style={{ color: LENITY.ink }}>Status</th>}
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={columns.length + 2} className="px-3 py-6 text-center" style={{ color: LENITY.muted }}>No submissions yet.</td></tr>
            )}
            {list.map((r) => (
              <tr key={String(r.id)} className="border-t" style={{ borderColor: LENITY.line }}>
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-2 align-top" style={{ color: LENITY.ink }}>{fmt(r[c.key])}</td>
                ))}
                {statusOptions && (
                  <td className="px-3 py-2">
                    <select
                      value={String(r.status ?? "")}
                      onChange={(e) => setStatus(Number(r.id), e.target.value)}
                      className="border rounded px-2 py-1 text-xs"
                      style={{ borderColor: LENITY.line }}
                    >
                      {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                )}
                <td className="px-3 py-2 text-right">
                  <ConfirmDelete onConfirm={() => remove(Number(r.id))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
