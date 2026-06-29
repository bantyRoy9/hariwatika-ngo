"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LENITY } from "@/theme/lenity";

export type MonthlyDonation = { month: string; total: number; confirmed: number };

interface Props {
  data: MonthlyDonation[];
}

export default function DonationTrendChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="rounded-xl p-5 flex items-center justify-center h-48"
        style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
        <p className="text-sm" style={{ color: LENITY.adminMuted }}>No donation data yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-5"
      style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
      <p className="text-sm font-semibold mb-4" style={{ color: LENITY.adminInk }}>Donation Trend (Last 6 Months)</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={LENITY.adminLine} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: LENITY.adminMuted }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: LENITY.adminMuted }} axisLine={false} tickLine={false}
            tickFormatter={(v: number) => v >= 1000 ? `₹${(v/1000).toFixed(0)}k` : `₹${v}`} />
          <Tooltip
            contentStyle={{ background: LENITY.adminBg, border: `1px solid ${LENITY.adminLine}`, borderRadius: 8, color: LENITY.adminInk, fontSize: 12 }}
            formatter={(v) => [`₹${typeof v === "number" ? v.toLocaleString("en-IN") : v}`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: LENITY.adminMuted }} />
          <Line type="monotone" dataKey="total" name="Total" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="confirmed" name="Confirmed" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
