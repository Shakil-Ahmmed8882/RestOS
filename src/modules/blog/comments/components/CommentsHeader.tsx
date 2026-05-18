"use client";

import { Icon } from "@iconify/react";
import { useCommentsSelector } from "../context/CommentsContext";

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function CommentsHeader() {
  const { comments, sort, setSort } = useCommentsSelector();
  const total = comments?.length ?? 0;

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
        Comments ({formatCount(total)})
      </h2>
      <div className="inline-flex rounded-full bg-silk-with-hover p-1 text-xs">
        <button
          type="button"
          onClick={() => setSort("popular")}
          className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full transition-colors ${
            sort === "popular"
              ? "bg-white dark:bg-zinc-900 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              : "text-muted-foreground"
          }`}
        >
          <Icon icon="solar:graph-up-linear" className="h-3.5 w-3.5" />
          Popular
        </button>
        <button
          type="button"
          onClick={() => setSort("newest")}
          className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full transition-colors ${
            sort === "newest"
              ? "bg-white dark:bg-zinc-900 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              : "text-muted-foreground"
          }`}
        >
          <Icon icon="solar:notebook-bookmark-linear" className="h-3.5 w-3.5" />
          Newest
        </button>
      </div>
    </div>
  );
}
