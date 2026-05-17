"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { InfiniteScrollSentinel } from "@/components/rest-os-ui/infinite-scroll";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import type { useFoodCategories } from "../hooks/useFoodCategories";
import { CategoryCard } from "../components/CategoryCard";
import { CategorySearchBar } from "../components/CategorySearchBar";
import {
  CategoryCardSkeleton,
  CategoryGridSkeleton,
} from "../loading/placeholder/CategoryCardSkeleton";
import { useCategoryActionsSelector } from "./CategoryActionsModal";

type Props = {
  categories: ReturnType<typeof useFoodCategories>;
};

export function CategoryGridSection(props: Props) {
  const { openCreate, openEdit, openDelete } = useCategoryActionsSelector();
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
  } = props.categories;

  const isFirstLoad = status === "loading" && items.length === 0;
  const showInitialSkeleton = isFirstLoad || isSearchPending;

  const isLoadingMore =
    status === "loading" && items.length > 0 && !isSearchPending;
  const isEmpty =
    !showInitialSkeleton && status !== "loading" && items.length === 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Food categories
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Group dishes for easier browsing.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="rounded-full text-white whitespace-nowrap"
        >
          <Icon icon="solar:add-circle-linear" className="h-4 w-4 mr-1.5" />
          Add category
        </Button>
      </div>

      <CategorySearchBar value={search} onChange={setSearch} />

      {showInitialSkeleton && <CategoryGridSkeleton count={9} />}

      {isEmpty && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-12 text-center">
          <Icon
            icon="solar:folder-with-files-linear"
            className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-sm font-semibold text-foreground">
            No categories yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {search
              ? `No results for "${search}"`
              : "Create your first food category to group dishes."}
          </p>
          {!search && (
            <Button
              onClick={openCreate}
              className="mt-5 rounded-full text-white"
            >
              <Icon icon="solar:add-circle-linear" className="h-4 w-4 mr-1.5" />
              Add category
            </Button>
          )}
        </div>
      )}

      {!showInitialSkeleton && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((c) => (
            <CategoryCard
              key={c._id}
              category={c}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
          {isLoadingMore &&
            Array.from({ length: 3 }).map((_, i) => (
              <CategoryCardSkeleton key={`more-${i}`} />
            ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-red-600 dark:text-red-400">
            {(error as any)?.data?.message ?? "Failed to load categories."}
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
        <div className="flex items-center justify-center gap-3 py-3">
          <BaseSkeleton className="h-3 w-3 rounded-full" />
          <span className="text-xs text-muted-foreground">
            Loading more categories...
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
