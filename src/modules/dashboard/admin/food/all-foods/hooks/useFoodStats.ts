"use client";

import { useMemo } from "react";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Stats = {
  totalOrders: number;
  activeDishes: number;
  revenue: number;
  totalDelta: number; // % delta vs the older half of the dataset
  activeDelta: number;
  revenueDelta: number;
};

const sumDelta = (recent: number, older: number) => {
  if (older === 0) return recent > 0 ? 100 : 0;
  return Math.round(((recent - older) / older) * 100);
};

/**
 * Derive headline metrics from the loaded foods.
 *
 * Every field access is optional-chained: the server can return rows
 * with missing or null fields, and we never want a render to crash.
 */
export function useFoodStats(
  items: ReadonlyArray<FoodItem | null | undefined> | null | undefined,
): Stats {
  return useMemo(() => {
    const safeItems = (items ?? []).filter(
      (f): f is FoodItem => Boolean(f),
    );

    if (safeItems.length === 0) {
      return {
        totalOrders: 0,
        activeDishes: 0,
        revenue: 0,
        totalDelta: 0,
        activeDelta: 0,
        revenueDelta: 0,
      };
    }

    const sorted = [...safeItems].sort(
      (a, b) =>
        new Date(b?.createdAt ?? 0).getTime() -
        new Date(a?.createdAt ?? 0).getTime(),
    );
    const half = Math.max(1, Math.floor(sorted.length / 2));
    const recent = sorted.slice(0, half);
    const older = sorted.slice(half);

    const sumOrders = (arr: FoodItem[]) =>
      arr.reduce((s, f) => s + (f?.orders ?? 0), 0);
    const sumRevenue = (arr: FoodItem[]) =>
      arr.reduce((s, f) => s + (f?.orders ?? 0) * (f?.price ?? 0), 0);
    const countActive = (arr: FoodItem[]) =>
      arr.filter((f) => f?.isAvailable !== false).length;

    return {
      totalOrders: sumOrders(safeItems),
      activeDishes: countActive(safeItems),
      revenue: sumRevenue(safeItems),
      totalDelta: sumDelta(sumOrders(recent), sumOrders(older)),
      activeDelta: sumDelta(countActive(recent), countActive(older)),
      revenueDelta: sumDelta(sumRevenue(recent), sumRevenue(older)),
    };
  }, [items]);
}
