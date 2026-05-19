"use client";

import { cn } from "@/lib/utils";
import type { usePurchasedList } from "@/modules/dashboard/user/purchases/hooks/usePurchasedList";
import type { PurchasesFilter } from "@/modules/dashboard/user/purchases/types";

type Props = {
  purchases: ReturnType<typeof usePurchasedList>;
};

const TABS: { key: PurchasesFilter; label: string }[] = [
  { key: "completed", label: "Purchased" },
  { key: "pending", label: "Awaiting payment" },
  { key: "all", label: "All attempts" },
];

export function PurchasesFilterTabs(props: Props) {
  const { purchases } = props;
  const { filter, setFilter, counts } = purchases;

  const countFor = (key: PurchasesFilter) => {
    if (key === "completed") return counts.completed;
    if (key === "pending") return counts.pending;
    return counts.all;
  };

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full bg-silk-with-hover p-1">
      {TABS.map((tab) => {
        const active = tab.key === filter;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-zinc-200/60 text-muted-foreground dark:bg-white/[0.06]",
              )}
            >
              {countFor(tab.key)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
