"use client";

import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LENITY } from "@/theme/lenity";

export type PieSlice = { name: string; value: number; color: string; href: string };

interface Props {
  data: PieSlice[];
  title: string;
}

export default function MiniPieChart({ data, title }: Props) {
  const router = useRouter();

  if (!data.length) {
    return (
      <div className="rounded-xl p-5 h-full flex items-center justify-center"
        style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
        <p className="text-sm" style={{ color: LENITY.adminMuted }}>No data yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-5"
      style={{ background: LENITY.adminSoft, border: `1px solid ${LENITY.adminLine}` }}>
      <p className="text-sm font-semibold mb-4" style={{ color: LENITY.adminInk }}>{title}</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            cursor="pointer"
            onClick={(entry: { href?: string }) => entry.href && router.push(entry.href)}
          >
            {data.map((slice, i) => (
              <Cell key={i} fill={slice.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: LENITY.adminBg, border: `1px solid ${LENITY.adminLine}`, borderRadius: 8, color: LENITY.adminInk, fontSize: 12 }}
            formatter={(value) => [value, ""]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: LENITY.adminMuted }}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-[11px] mt-2 text-center" style={{ color: LENITY.adminMuted }}>Click a slice to filter</p>
    </div>
  );
}
