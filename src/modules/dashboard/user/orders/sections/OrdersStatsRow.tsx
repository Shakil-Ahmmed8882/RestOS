"use client";

import { Icon } from "@iconify/react";
import type { useMyOrders } from "@/modules/dashboard/user/orders/hooks/useMyOrders";

type Props = {
  orders: ReturnType<typeof useMyOrders>;
};

function formatBdt(n: number) {
  return new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(n);
}

export function OrdersStatsRow(props: Props) {
  const { orders } = props;
  const { summary, isSummaryLoading } = orders;

  const ready = !isSummaryLoading && !!summary;

  const stats = [
    {
      icon: "solar:cart-large-2-bold-duotone",
      label: "Total orders",
      value: ready ? String(summary.totalOrderCount) : "—",
      hint:  ready ? `৳${formatBdt(summary.totalOrderPrice)}` : undefined,
    },
    {
      icon: "solar:bag-check-bold-duotone",
      label: "Purchased",
      value: ready ? String(summary.byStatus.confirmed.count) : "—",
      hint:  ready ? `৳${formatBdt(summary.byStatus.confirmed.totalPrice)}` : undefined,
    },
    {
      icon: "solar:clock-circle-bold-duotone",
      label: "Pending",
      value: ready ? String(summary.byStatus.pending.count) : "—",
      hint:  ready ? `৳${formatBdt(summary.byStatus.pending.totalPrice)}` : undefined,
    },
    {
      icon: "solar:close-circle-bold-duotone",
      label: "Cancelled",
      value: ready ? String(summary.byStatus.canceled.count) : "—",
      hint:  ready ? `৳${formatBdt(summary.byStatus.canceled.totalPrice)}` : undefined,
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
          {stat.hint && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.hint}</p>
          )}
        </div>
      ))}
    </div>
  );
}
