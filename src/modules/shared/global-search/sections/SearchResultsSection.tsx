"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGlobalSearchSelector } from "../context/GlobalSearchContext";
import { SearchResultRow } from "../components/SearchResultRow";
import { SearchResultSkeleton } from "../components/SearchResultSkeleton";
import { useIntersection } from "@/components/rest-os-ui/infinite-scroll/hooks/useIntersection";
import type { TFlattenedRow, TSearchSource } from "../types";

const GROUP_TITLE: Record<TSearchSource, string> = {
  blogs: "Blogs",
  foods: "Foods",
  foodCategories: "Categories",
};

function groupRows(rows: TFlattenedRow[]) {
  const blogs = rows.filter((r) => r?.source === "blogs");
  const foods = rows.filter((r) => r?.source === "foods");
  const categories = rows.filter((r) => r?.source === "foodCategories");
  return [
    { source: "blogs" as const, rows: blogs },
    { source: "foods" as const, rows: foods },
    { source: "foodCategories" as const, rows: categories },
  ].filter((g) => g.rows.length > 0);
}

export function SearchResultsSection() {
  const {
    rows,
    highlight,
    setHighlight,
    selectRow,
    status,
    isFetching,
    hasMore,
    loadMore,
  } = useGlobalSearchSelector();

  // Sentinel for infinite scroll inside the modal's own scroll container
  const { ref: sentinelRef, isIntersecting } = useIntersection<HTMLDivElement>(
    { rootMargin: "240px" },
    status === "results" && hasMore && !isFetching,
  );

  useEffect(() => {
    if (isIntersecting) loadMore();
  }, [isIntersecting, loadMore]);

  if (status === "searching") {
    return (
      <div className="max-h-[60vh] overflow-y-auto py-2">
        <SearchResultSkeleton count={5} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="px-5 py-12 flex flex-col items-center gap-3">
        <Icon
          icon="solar:danger-circle-linear"
          className="h-8 w-8 text-primary/70"
        />
        <p className="text-sm text-muted-foreground">
          Search failed. Try again.
        </p>
      </div>
    );
  }

  if (status === "no-results") {
    return (
      <div className="px-5 py-12 flex flex-col items-center gap-3 text-center">
        <Icon
          icon="solar:ghost-linear"
          className="h-10 w-10 text-muted-foreground/40"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Nothing matches
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Try a different keyword
          </p>
        </div>
      </div>
    );
  }

  const groups = groupRows(rows);
  let flatIndex = 0;

  return (
    <div className="px-2 py-2 space-y-3 max-h-[60vh] overflow-y-auto">
      {groups.map((group) => (
        <div key={group.source} className="space-y-0.5">
          <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            {GROUP_TITLE[group.source]}
          </p>
          {group.rows.map((row) => {
            const currentIndex = flatIndex++;
            return (
              <SearchResultRow
                key={row?.key ?? currentIndex}
                row={row}
                isActive={highlight === currentIndex}
                onSelect={selectRow}
                onHover={() => setHighlight(currentIndex)}
              />
            );
          })}
        </div>
      ))}

      {/* Infinite-scroll: rebound skeleton + sentinel */}
      {hasMore && (
        <div>
          {isFetching && <SearchResultSkeleton count={2} />}
          <div ref={sentinelRef} className="h-1" aria-hidden="true" />
        </div>
      )}

      {!hasMore && rows.length > 0 && (
        <p className="text-center text-[11px] text-muted-foreground/60 py-3">
          End of results
        </p>
      )}
    </div>
  );
}
