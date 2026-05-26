"use client";

import { Icon } from "@iconify/react";
import type { useMyBlogs } from "@/modules/dashboard/user/my-blogs/hooks/useMyBlogs";

type Props = { blogs: ReturnType<typeof useMyBlogs> };

export function MyBlogsStatsRow({ blogs }: Props) {
  const { counts, isCountsLoading } = blogs;
  const ready = !isCountsLoading;

  const stats = [
    {
      icon: "solar:document-text-bold-duotone",
      label: "Total",
      value: ready ? String(counts.all ?? 0) : "—",
    },
    {
      icon: "solar:check-circle-bold-duotone",
      label: "Approved",
      value: ready ? String(counts.approved ?? 0) : "—",
    },
    {
      icon: "solar:clock-circle-bold-duotone",
      label: "Pending",
      value: ready ? String(counts.pending ?? 0) : "—",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <Icon icon={stat.icon} className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
