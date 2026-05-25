"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import type { TopFood } from "@/modules/dashboard/user/analytics/types";
import { fmtBDT, fmtCount } from "@/modules/dashboard/user/analytics/utils/format";

type Props = { rows: TopFood[] | null | undefined };

export function TopFoodsTable({ rows }: Props) {
  const items = rows ?? [];

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Top foods</h3>
          <p className="text-xs text-muted-foreground">Your most-ordered dishes</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon icon="solar:chef-hat-bold-duotone" className="h-4 w-4" />
        </span>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Icon icon="solar:plate-bold-duotone" className="h-8 w-8 text-primary/60" />
          <p className="text-xs">No confirmed orders yet.</p>
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-zinc-100 dark:divide-white/[0.04]">
          {items.map((f, idx) => {
            if (!f?.foodId) return null;
            return (
              <li key={f.foodId} className="py-2.5">
                <Link
                  href={`/food-details/${f.foodId}`}
                  className="group flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span className="truncate font-medium text-foreground group-hover:text-primary">
                      {f.foodName ?? "Untitled"}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs tabular-nums text-muted-foreground">
                    <span>×{fmtCount(f.totalQuantity ?? 0)}</span>
                    <span className="font-semibold text-foreground">
                      {fmtBDT(f.totalSpent ?? 0)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
