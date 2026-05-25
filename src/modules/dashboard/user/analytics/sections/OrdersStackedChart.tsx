"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Icon } from "@iconify/react";
import type { OrdersDailyPoint } from "@/modules/dashboard/user/analytics/types";
import { fmtShortDate } from "@/modules/dashboard/user/analytics/utils/format";

type Props = { data: OrdersDailyPoint[] | null | undefined };

export function OrdersStackedChart({ data }: Props) {
  const rows = data ?? [];
  const hasData = rows.some(
    (r) => (r?.pending ?? 0) + (r?.confirmed ?? 0) + (r?.canceled ?? 0) > 0,
  );

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Orders per day</h3>
          <p className="text-xs text-muted-foreground">Confirmed, pending & cancelled</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon icon="solar:cart-large-2-bold-duotone" className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 h-64">
        {!hasData ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Icon icon="solar:cart-cross-bold-duotone" className="h-8 w-8 text-primary/60" />
            <p className="text-xs">No orders in this range yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickFormatter={fmtShortDate}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted-foreground) / 0.08)" }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="confirmed" stackId="s" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" stackId="s" fill="hsl(var(--primary))" fillOpacity={0.55} />
              <Bar dataKey="canceled" stackId="s" fill="hsl(var(--primary))" fillOpacity={0.2} radius={[0, 0, 2, 2]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
