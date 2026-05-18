"use client";

import { StatCard } from "../components/StatCard";
import { useFoodStats } from "../hooks/useFoodStats";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

const fmtCurrency = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

type Props = {
  foods: ReadonlyArray<FoodItem | null | undefined> | null | undefined;
};

export function FoodStatsSection(props: Props) {
  const stats = useFoodStats(props.foods);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon="solar:bag-3-linear"
        label="Total orders"
        value={stats.totalOrders.toLocaleString()}
        delta={stats.totalDelta}
      />
      <StatCard
        icon="solar:dish-linear"
        label="Active dishes"
        value={stats.activeDishes.toLocaleString()}
        delta={stats.activeDelta}
      />
      <StatCard
        icon="solar:dollar-minimalistic-linear"
        label="Revenue"
        value={fmtCurrency(stats.revenue)}
        delta={stats.revenueDelta}
      />
    </div>
  );
}
