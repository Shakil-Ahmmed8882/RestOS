"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { InfiniteScrollSentinel } from "@/components/rest-os-ui/infinite-scroll";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { useFoodActionsSelector } from "@/modules/dashboard/admin/food/sections/FoodActionsModal";
import { FoodGridCard } from "../components/FoodGridCard";
import { FoodTableSearchBar } from "../components/FoodTableSearchBar";
import {
  FoodGridSkeleton,
  FoodGridCardSkeleton,
} from "../loading/placeholder/FoodGridCardSkeleton";
import type { useAdminFoods } from "../hooks/useAdminFoods";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  foods: ReturnType<typeof useAdminFoods>;
};

export function FoodsGridSection(props: Props) {
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

  const handleEdit = (food: FoodItem) => {
    if (!food?._id) return;
    openEdit({
      foodId: food._id,
      foodName: food?.foodName ?? food?.name ?? "Untitled",
    });
  };

  const handleDelete = (food: FoodItem) => {
    if (!food?._id) return;
    openDelete({
      foodId: food._id,
      foodName: food?.foodName ?? food?.name ?? "Untitled",
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
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
            <Icon icon="solar:add-circle-bold" className="h-5 w-5 mr-1.5" />
            Add food
          </Button>
        </div>
      </div>

      {showInitialSkeleton && <FoodGridSkeleton count={8} />}

      {isEmpty && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-12 text-center">
          <Icon
            icon="solar:dish-linear"
            className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-sm font-semibold text-foreground">No dishes yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            {search ? `No results for "${search}"` : "Add your first dish."}
          </p>
          {!search && (
            <Button
              onClick={openCreate}
              className="mt-5 rounded-full text-white"
            >
              <Icon icon="solar:add-circle-bold" className="h-5 w-5 mr-1.5" />
              Add food
            </Button>
          )}
        </div>
      )}

      {!showInitialSkeleton && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {items.map((food) =>
            food?._id ? (
              <FoodGridCard
                key={food._id}
                food={food}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : null,
          )}
          {isLoadingMore &&
            Array.from({ length: 4 }).map((_, i) => (
              <FoodGridCardSkeleton key={`more-${i}`} />
            ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl bg-primary/5 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-primary">
            {(error as any)?.data?.message ?? "Failed to load dishes."}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={retry}
            className="h-7 text-xs text-primary hover:bg-primary/10"
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

      <InfiniteScrollSentinel
        onIntersect={loadMore}
        enabled={hasMore && status === "idle" && !isSearchPending}
        observer={{ rootMargin: "300px" }}
      />
    </div>
  );
}
