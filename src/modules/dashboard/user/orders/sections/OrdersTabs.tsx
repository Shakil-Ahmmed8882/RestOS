"use client";

import { cn } from "@/lib/utils";
import type { useMyOrders } from "@/modules/dashboard/user/orders/hooks/useMyOrders";
import type { OrderStatusFilter } from "@/modules/dashboard/user/orders/types";

type Props = {
  orders: ReturnType<typeof useMyOrders>;
};

const TABS: { key: OrderStatusFilter; label: string }[] = [
  { key: "pending",   label: "Pending"   },
  { key: "confirmed", label: "Purchased" },
  { key: "canceled",  label: "Cancelled" },
  { key: "all",       label: "All"       },
];

function countFor(
  key: OrderStatusFilter,
  byStatus?: ReturnType<typeof useMyOrders>["summary"]["byStatus"],
  total?: number,
): number | undefined {
  if (!byStatus) return undefined;
  if (key === "pending")   return byStatus.pending.count;
  if (key === "confirmed") return byStatus.confirmed.count;
  if (key === "canceled")  return byStatus.canceled.count;
  return total;
}

export function OrdersTabs(props: Props) {
  const { orders } = props;
  const { tab, handleTabChange, summary } = orders;

  return (
    <div className="flex flex-wrap gap-1 border-b border-zinc-100 dark:border-white/[0.04]">
      {TABS.map((t) => {
        const active = t.key === tab;
        const n = countFor(t.key, summary?.byStatus, summary?.totalOrderCount);
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => handleTabChange(t.key)}
            className={cn(
              "relative -mb-px inline-flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {n !== undefined && (
              <span
                className={cn(
                  "inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                  active
                    ? "bg-primary/10 text-primary"
                    : "bg-zinc-100 text-muted-foreground dark:bg-white/[0.06]",
                )}
              >
                {n}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
