"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useGetTopSellingFoodsQuery } from "@/redux/featureApi/foodApi";
import { DragScrollRow } from "@/components/rest-os-ui/scroll/DragScrollRow";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { TopSellingCard } from "../components/TopSellingCard";
import { TopSellingStripSkeleton } from "../loading/placeholder/TopSellingSkeleton";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

const fmtMoney = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function StripShell({
  count,
  totalRevenue,
  onViewAll,
  children,
}: {
  count: number;
  totalRevenue: number;
  onViewAll: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 rounded-full bg-primary/10 items-center justify-center">
              <Icon
                icon="solar:cup-star-bold"
                className="h-3.5 w-3.5 text-primary"
              />
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Top selling
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-9">
            Drag to scroll · {count} dishes ·{" "}
            <span className="text-foreground font-medium">
              {fmtMoney(totalRevenue)}
            </span>{" "}
            in tracked revenue
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all
          <Icon icon="solar:arrow-right-linear" className="h-3.5 w-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}

export function TopSellingStripSection() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetTopSellingFoodsQuery();

  // The top-selling endpoint can return either `data: Food[]` or
  // `data: { data: Food[], meta }`. We normalise defensively.
  const raw = (data as any)?.data;
  const foods: FoodItem[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : [];

  const totalRevenue = foods.reduce(
    (sum, f) => sum + (f?.orders ?? 0) * (f?.price ?? 0),
    0,
  );

  const onViewAll = () => router.push("/admin/dashboard/all-foods");

  return (
    <StripShell
      count={foods.length}
      totalRevenue={totalRevenue}
      onViewAll={onViewAll}
    >
      <DataBoundary
        isLoading={isLoading}
        isError={isError}
        onReset={() => refetch()}
        skeleton={<TopSellingStripSkeleton count={6} />}
      >
        {foods.length === 0 ? (
          <div className="py-10 text-center">
            <Icon
              icon="solar:dish-linear"
              className="h-10 w-10 mx-auto mb-2 text-muted-foreground/40"
            />
            <p className="text-xs text-muted-foreground">
              No top-selling data yet
            </p>
          </div>
        ) : (
          <DragScrollRow>
            {foods.map((food, idx) =>
              food?._id ? (
                <TopSellingCard
                  key={food._id}
                  food={food}
                  rank={idx + 1}
                  onClick={(f) => f?._id && router.push(`/food-details/${f._id}`)}
                />
              ) : null,
            )}
          </DragScrollRow>
        )}
      </DataBoundary>
    </StripShell>
  );
}
