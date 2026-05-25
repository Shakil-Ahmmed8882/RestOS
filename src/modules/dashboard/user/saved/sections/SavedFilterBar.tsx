"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import type { useMySaves } from "@/modules/dashboard/user/saved/hooks/useMySaves";

type Props = { saves: ReturnType<typeof useMySaves> };

export function SavedFilterBar({ saves }: Props) {
  const { search, handleSearchChange, tab, meta } = saves;
  const noun = tab === "blog" ? "blogs" : "foods";
  const total = meta?.total ?? 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Icon
          icon="solar:magnifer-linear"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={`Search saved ${noun}…`}
          className="h-9 w-full rounded-xl border-0 bg-zinc-100 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-zinc-800/60"
        />
        <ShowIf condition={search.length > 0}>
          <button
            type="button"
            onClick={() => handleSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
          </button>
        </ShowIf>
      </div>

      <p className="text-xs text-muted-foreground">
        {total} saved {noun}
      </p>
    </div>
  );
}
