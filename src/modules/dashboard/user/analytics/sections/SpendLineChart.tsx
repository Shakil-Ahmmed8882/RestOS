"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { Icon } from "@iconify/react";
import type { SpendDailyPoint } from "@/modules/dashboard/user/analytics/types";
import { fmtBDT, fmtShortDate } from "@/modules/dashboard/user/analytics/utils/format";

type Props = { data: SpendDailyPoint[] | null | undefined };

export function SpendLineChart({ data }: Props) {
  const rows = data ?? [];
  const hasData = rows.some((r) => (r?.amount ?? 0) > 0);

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Spending</h3>
          <p className="text-xs text-muted-foreground">Last {rows.length} days</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon icon="solar:graph-up-bold-duotone" className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 h-64 text-primary">
        {!hasData ? (
          <EmptyChart message="No spending in this range yet." icon="solar:wallet-money-bold-duotone" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(v: unknown) => [fmtBDT(Number(v)), "Spent"] as [string, string]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="currentColor"
                strokeWidth={2}
                fill="url(#spendFill)"
              />
              <Line type="monotone" dataKey="amount" stroke="currentColor" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function EmptyChart({ message, icon }: { message: string; icon: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
      <Icon icon={icon} className="h-8 w-8 text-primary/60" />
      <p className="text-xs">{message}</p>
    </div>
  );
}
