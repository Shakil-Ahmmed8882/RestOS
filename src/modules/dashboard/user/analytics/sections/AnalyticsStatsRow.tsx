"use client";

import { Icon } from "@iconify/react";
import type { UserAnalytics } from "@/modules/dashboard/user/analytics/types";
import { fmtBDT, fmtCount } from "@/modules/dashboard/user/analytics/utils/format";

type Props = { analytics: UserAnalytics | null | undefined };

export function AnalyticsStatsRow({ analytics }: Props) {
  const totals = analytics?.totals;

  const stats = [
    {
      icon: "solar:wallet-money-bold-duotone",
      label: "Total spent",
      value: fmtBDT(totals?.payments?.totalSpent ?? 0),
      hint: `${fmtCount(totals?.payments?.successfulCount ?? 0)} payments`,
    },
    {
      icon: "solar:cart-large-2-bold-duotone",
      label: "Orders placed",
      value: fmtCount(totals?.orders?.all ?? 0),
      hint: `${fmtCount(totals?.orders?.byStatus?.pending?.count ?? 0)} still pending`,
    },
    {
      icon: "solar:document-text-bold-duotone",
      label: "Blogs published",
      value: fmtCount(totals?.blogs?.all ?? 0),
      hint: `${fmtCount(totals?.blogs?.upvotesReceived ?? 0)} upvotes received`,
    },
    {
      icon: "solar:bookmark-bold-duotone",
      label: "Saved blogs",
      value: fmtCount(totals?.activity?.savedBlogs ?? 0),
      hint: `${fmtCount(totals?.activity?.commentsWritten ?? 0)} comments written`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
          <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.hint}</p>
        </div>
      ))}
    </div>
  );
}
