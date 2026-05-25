"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Icon } from "@iconify/react";
import type { UserAnalyticsTotals } from "@/modules/dashboard/user/analytics/types";

type Props = { activity: UserAnalyticsTotals["activity"] | null | undefined };

export function ActivityDonut({ activity }: Props) {
  const a = activity;
  const slices = [
    { name: "Comments", value: a?.commentsWritten ?? 0, fill: "hsl(var(--primary))" },
    { name: "Replies", value: a?.repliesWritten ?? 0, fill: "hsl(var(--primary) / 0.7)" },
    { name: "Upvotes", value: a?.votesCast?.upvote ?? 0, fill: "#10b981" },
    { name: "Downvotes", value: a?.votesCast?.downvote ?? 0, fill: "hsl(var(--primary) / 0.35)" },
    { name: "Saves", value: a?.savedBlogs ?? 0, fill: "hsl(var(--primary) / 0.5)" },
  ].filter((s) => s.value > 0);

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Your activity</h3>
          <p className="text-xs text-muted-foreground">Lifetime engagement split</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon icon="solar:pie-chart-2-bold-duotone" className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 h-64">
        {slices.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Icon icon="solar:chat-square-bold-duotone" className="h-8 w-8 text-primary/60" />
            <p className="text-xs">No activity yet — comment, vote, or save a blog.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                stroke="none"
              >
                {slices.map((s) => (
                  <Cell className="dark:!text-white" key={s.name} fill={s.fill} />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
