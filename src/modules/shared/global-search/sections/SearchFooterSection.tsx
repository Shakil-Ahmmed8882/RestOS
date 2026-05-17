"use client";

import { Icon } from "@iconify/react";
import { useGlobalSearchSelector } from "../context/GlobalSearchContext";

export function SearchFooterSection() {
  const { counts, status } = useGlobalSearchSelector();
  const total = counts.blogs + counts.foods + counts.foodCategories;

  return (
    <div className="px-5 py-2.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-muted-foreground/80">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-semibold">
            ↑
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-semibold">
            ↓
          </kbd>
          Navigate
        </span>
        <span className="inline-flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-semibold">
            ⏎
          </kbd>
          Select
        </span>
      </div>
      {status === "results" && (
        <span className="inline-flex items-center gap-1.5">
          <Icon icon="solar:check-circle-linear" className="h-3.5 w-3.5" />
          {total} result{total === 1 ? "" : "s"}
        </span>
      )}
    </div>
  );
}
