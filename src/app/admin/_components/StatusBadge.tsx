export default function StatusBadge({ status }: { status: string }) {
  const s = (status ?? "").toLowerCase();
  let bg = "rgba(100,116,139,0.12)";
  let color = "#64748b";

  if (["confirmed", "active", "completed", "approved"].some(k => s.includes(k))) {
    bg = "rgba(34,197,94,0.12)"; color = "#16a34a";
  } else if (["pending", "new", "submitted"].some(k => s.includes(k))) {
    bg = "rgba(245,158,11,0.12)"; color = "#d97706";
  } else if (["replied", "read", "reviewed"].some(k => s.includes(k))) {
    bg = "rgba(59,130,246,0.12)"; color = "#2563eb";
  } else if (["rejected", "cancelled", "failed"].some(k => s.includes(k))) {
    bg = "rgba(239,68,68,0.12)"; color = "#dc2626";
  }

  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize whitespace-nowrap"
      style={{ background: bg, color }}
    >
      {status}
    </span>
  );
}
