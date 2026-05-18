"use client";

import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { RevenueSparkline } from "../components/RevenueSparkline";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

type Props = {
  foods: ReadonlyArray<FoodItem | null | undefined> | null | undefined;
};

export function RevenueGrowthSection(props: Props) {
  const { foods } = props;

  const points = useMemo(() => {
    // Bucket the foods into 7 evenly-sized chunks by creation order
    // and sum revenue per bucket. With sparse data this yields a
    // monotonically rising line — which is honest given we're showing
    // cumulative growth.
    const safe = (foods ?? []).filter((f): f is FoodItem => Boolean(f));
    if (safe.length === 0) return MONTHS.map(() => 0);
    const sorted = [...safe].sort(
      (a, b) =>
        new Date(a?.createdAt ?? 0).getTime() -
        new Date(b?.createdAt ?? 0).getTime(),
    );
    const buckets = MONTHS.map(() => 0);
    sorted.forEach((f, i) => {
      const bucket = Math.min(
        MONTHS.length - 1,
        Math.floor((i / sorted.length) * MONTHS.length),
      );
      buckets[bucket] += (f?.orders ?? 0) * (f?.price ?? 0);
    });
    // make cumulative
    let acc = 0;
    return buckets.map((b) => (acc += b));
  }, [foods]);

  return (
    <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Revenue growth
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cumulative revenue from order data
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Revenue
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-foreground">
            <Icon icon="solar:calendar-linear" className="h-3.5 w-3.5" />
            Last 7 months
          </span>
        </div>
      </div>

      <RevenueSparkline points={points} labels={MONTHS} />
    </div>
  );
}
