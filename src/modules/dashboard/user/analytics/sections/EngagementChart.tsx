"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Icon } from "@iconify/react";
import type {
  BlogsDailyPoint,
  CommentsDailyPoint,
} from "@/modules/dashboard/user/analytics/types";
import { fmtShortDate } from "@/modules/dashboard/user/analytics/utils/format";

type Props = {
  blogs: BlogsDailyPoint[] | null | undefined;
  comments: CommentsDailyPoint[] | null | undefined;
};

export function EngagementChart({ blogs, comments }: Props) {
  const b = blogs ?? [];
  const c = comments ?? [];

  const merged = b.map((row, i) => ({
    date: row?.date ?? c[i]?.date ?? "",
    blogs: row?.count ?? 0,
    comments: c[i]?.count ?? 0,
  }));

  const hasData = merged.some((r) => (r.blogs ?? 0) + (r.comments ?? 0) > 0);

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Engagement</h3>
          <p className="text-xs text-muted-foreground">Blogs & comments per day</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon icon="solar:chat-square-like-bold-duotone" className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 h-64">
        {!hasData ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Icon icon="solar:chat-line-bold-duotone" className="h-8 w-8 text-primary/60" />
            <p className="text-xs">No engagement in this range yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={merged} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
              <Line
                type="monotone"
                dataKey="comments"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="blogs"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
