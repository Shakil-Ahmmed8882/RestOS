"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/ShowIf";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { SavedBlogCard } from "@/modules/dashboard/user/saved/sections/SavedBlogCard";
import { SavedFoodCard } from "@/modules/dashboard/user/saved/sections/SavedFoodCard";
import { SavedTombstoneCard } from "@/modules/dashboard/user/saved/sections/SavedTombstoneCard";
import { SavedGridSkeleton } from "@/modules/dashboard/user/saved/skeletons/SavedItemsSkeleton";
import type { useMySaves } from "@/modules/dashboard/user/saved/hooks/useMySaves";

type Props = { saves: ReturnType<typeof useMySaves> };

export function SavedGrid({ saves }: Props) {
  const { rows, meta, page, setPage, tab, search, showSkeleton } = saves;

  if (showSkeleton) {
    return <SavedGridSkeleton />;
  }
  const totalPages = meta?.totalPage ?? 1;
  const empty =
    tab === "blog"
      ? {
          title: search ? "No matching blogs" : "No saved blogs yet",
          description: search
            ? "Try a different search term."
            : "Tap the bookmark on any blog to add it here.",
        }
      : {
          title: search ? "No matching foods" : "No saved foods yet",
          description: search
            ? "Try a different search term."
            : "Tap the bookmark on any dish to add it here.",
        };

  const isBackgroundFetch = saves.isFetching && !showSkeleton;

  return (
    <div className="space-y-5">
      <NoResultFoundWrapper data={rows} title={empty.title} description={empty.description}>
        <div
          className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
            isBackgroundFetch ? "opacity-70" : "opacity-100"
          }`}
        >
          {rows.map((row) => {
            if (!row?._id) return null;
            if (row.resourceDeleted || !row.resource) {
              return (
                <SavedTombstoneCard
                  key={row._id}
                  name={row.name ?? ""}
                  type={row.type}
                  itemId={row.itemId}
                />
              );
            }
            if (row.type === "blog") return <SavedBlogCard key={row._id} row={row} />;
            if (row.type === "food") return <SavedFoodCard key={row._id} row={row} />;
            return null;
          })}
        </div>
      </NoResultFoundWrapper>

      <ShowIf condition={totalPages > 1}>
        <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-3 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
            {meta?.total ? ` · ${meta.total} saved` : ""}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(Math.max(1, page - 1))}
              className="h-7 gap-1 px-2 text-xs"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className="h-7 gap-1 px-2 text-xs"
            >
              Next
              <Icon icon="solar:alt-arrow-right-linear" className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </ShowIf>
    </div>
  );
}

