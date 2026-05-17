"use client";

import { Icon } from "@iconify/react";
import { useGlobalSearchSelector } from "../context/GlobalSearchContext";

export function SearchIdleSection() {
  const { recents, selectRecent, clearRecents } = useGlobalSearchSelector();

  if (recents.length === 0) {
    return (
      <div className="px-5 py-12 flex flex-col items-center gap-3 text-center">
        <Icon
          icon="solar:magnifer-zoom-in-linear"
          className="h-10 w-10 text-muted-foreground/40"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Start typing to search
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Across foods, blogs and categories
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 py-2">
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Recent searches
        </p>
        <button
          type="button"
          onClick={clearRecents}
          className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-0.5">
        {recents.map((r) => (
          <button
            key={`${r.term}-${r.at}`}
            type="button"
            onClick={() => selectRecent(r.term)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-left hover:bg-zinc-50 dark:hover:bg-white/[0.03] transition-colors"
          >
            <Icon
              icon="solar:history-linear"
              className="h-4 w-4 text-muted-foreground/60"
            />
            <span className="text-sm text-foreground">{r.term}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
