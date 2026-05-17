"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { InfiniteScrollSentinel } from "@/components/rest-os-ui/infinite-scroll";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { useFoodActionsSelector } from "@/modules/dashboard/admin/food/sections/FoodActionsModal";
import { FoodRow } from "../components/FoodRow";
import { FoodTableSearchBar } from "../components/FoodTableSearchBar";
import { FoodTableSkeleton, FoodRowSkeleton } from "../loading/placeholder/FoodRowSkeleton";
import type { useAdminFoods } from "../hooks/useAdminFoods";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  foods: ReturnType<typeof useAdminFoods>;
};

const HEADERS: Array<{ label: string; hideOnMobile?: boolean }> = [
  { label: "Dish" },
  { label: "Price", hideOnMobile: true },
  { label: "Orders", hideOnMobile: true },
  { label: "Rating", hideOnMobile: true },
  { label: "Status" },
  { label: "Updated", hideOnMobile: true },
  { label: "" },
];

export function FoodsTableSection(props: Props) {
  const { openCreate, openEdit, openDelete } = useFoodActionsSelector();
  const {
    items,
    status,
    error,
    hasMore,
    loadMore,
    retry,
    search,
    setSearch,
    isSearchPending,
  } = props.foods;

  const isFirstLoad = status === "loading" && items.length === 0;
  const showInitialSkeleton = isFirstLoad || isSearchPending;
  const isLoadingMore =
    status === "loading" && items.length > 0 && !isSearchPending;
  const isEmpty =
    !showInitialSkeleton && status !== "loading" && items.length === 0;

  const handleEdit = (food: FoodItem) =>
    openEdit({
      foodId: food._id,
      foodName: food.foodName ?? food.name ?? "Untitled",
    });

  const handleDelete = (food: FoodItem) =>
    openDelete({
      foodId: food._id,
      foodName: food.foodName ?? food.name ?? "Untitled",
    });

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-3 flex-wrap p-4 sm:p-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Menu items</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage every dish on the menu
          </p>
        </div>
        <div className="flex items-center gap-2 flex-1 sm:flex-none sm:min-w-[420px] justify-end">
          <FoodTableSearchBar value={search} onChange={setSearch} />
          <Button
            onClick={openCreate}
            className="rounded-full text-white whitespace-nowrap"
          >
            <Icon icon="solar:add-circle-linear" className="h-4 w-4 mr-1.5" />
            Add food
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-2">
        <div className="grid grid-cols-[1fr_90px_90px_120px_40px] sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_120px] gap-3 sm:gap-4 px-3 sm:px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {HEADERS.map((h, i) => (
            <div
              key={i}
              className={h.hideOnMobile ? "hidden sm:block" : undefined}
            >
              {h.label}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-5 space-y-2">
        {showInitialSkeleton && (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <FoodRowSkeleton key={i} />
            ))}
          </div>
        )}

        {isEmpty && (
          <div className="px-4 py-12 text-center">
            <Icon
              icon="solar:dish-linear"
              className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40"
            />
            <p className="text-sm font-semibold text-foreground">
              No dishes yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {search ? `No results for "${search}"` : "Add your first dish."}
            </p>
            {!search && (
              <Button
                onClick={openCreate}
                className="mt-5 rounded-full text-white"
              >
                <Icon
                  icon="solar:add-circle-linear"
                  className="h-4 w-4 mr-1.5"
                />
                Add food
              </Button>
            )}
          </div>
        )}

        {!showInitialSkeleton &&
          items.map((food) => (
            <FoodRow
              key={food._id}
              food={food}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

        {isLoadingMore &&
          Array.from({ length: 3 }).map((_, i) => (
            <FoodRowSkeleton key={`more-${i}`} />
          ))}

        {status === "error" && (
          <div className="rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-red-600 dark:text-red-400">
              {(error as any)?.data?.message ?? "Failed to load dishes."}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={retry}
              className="h-7 text-xs text-red-600 dark:text-red-400"
            >
              Retry
            </Button>
          </div>
        )}

        {isLoadingMore && items.length > 0 && (
          <div className="flex items-center justify-center gap-3 py-2">
            <BaseSkeleton className="h-3 w-3 rounded-full" />
            <span className="text-xs text-muted-foreground">
              Loading more dishes...
            </span>
          </div>
        )}
      </div>

      <InfiniteScrollSentinel
        onIntersect={loadMore}
        enabled={hasMore && status === "idle" && !isSearchPending}
        observer={{ rootMargin: "300px" }}
      />
    </div>
  );
}

// Re-export for the loading state consumer
export { FoodTableSkeleton };
