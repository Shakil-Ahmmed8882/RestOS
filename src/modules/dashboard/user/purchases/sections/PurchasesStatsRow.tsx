"use client";

import { Icon } from "@iconify/react";
import type { usePurchasedList } from "@/modules/dashboard/user/purchases/hooks/usePurchasedList";

type Props = {
  purchases: ReturnType<typeof usePurchasedList>;
};

type Stat = {
  icon: string;
  label: string;
  value: string;
  hint?: string;
};

function formatBdt(value: number) {
  return new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(value);
}

export function PurchasesStatsRow(props: Props) {
  const { purchases } = props;
  const { summary, counts } = purchases;

  const summaryReady = !purchases.isSummaryLoading;

  const stats: Stat[] = [
    {
      icon: "solar:wallet-money-bold-duotone",
      label: "Lifetime spent",
      value: summaryReady ? `৳${formatBdt(summary.totalPurchasePrice)}` : "—",
      hint: summaryReady ? `${summary.totalPurchaseCount} confirmed` : undefined,
    },
    {
      icon: "solar:bag-check-bold-duotone",
      label: "Completed",
      value: String(counts.completed),
      hint: "Paid orders",
    },
    {
      icon: "solar:clock-circle-bold-duotone",
      label: "Awaiting payment",
      value: String(counts.pending),
      hint: "Resume below",
    },
    {
      icon: "solar:cart-large-2-bold-duotone",
      label: "Orders placed",
      value: summaryReady ? String(summary.totalOrderCount) : "—",
      hint: summaryReady ? `৳${formatBdt(summary.totalOrderPrice)} total` : undefined,
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
          {stat.hint ? (
            <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.hint}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
