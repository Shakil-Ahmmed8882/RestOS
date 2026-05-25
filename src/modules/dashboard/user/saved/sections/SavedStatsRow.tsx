"use client";

import { Icon } from "@iconify/react";
import type { useMySaves } from "@/modules/dashboard/user/saved/hooks/useMySaves";

type Props = { saves: ReturnType<typeof useMySaves> };

export function SavedStatsRow({ saves }: Props) {
  const { counts, isCountsLoading } = saves;
  const ready = !isCountsLoading && !!counts;

  const stats = [
    {
      icon: "solar:bookmark-bold-duotone",
      label: "Total saved",
      value: ready ? String(counts?.total ?? 0) : "—",
    },
    {
      icon: "solar:document-text-bold-duotone",
      label: "Blogs",
      value: ready ? String(counts?.blog ?? 0) : "—",
    },
    {
      icon: "solar:chef-hat-bold-duotone",
      label: "Foods",
      value: ready ? String(counts?.food ?? 0) : "—",
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
