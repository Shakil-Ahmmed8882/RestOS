"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { PROFILE_TABS, type ProfileStats, type ProfileTabKey } from "../types";

type Props = {
  active: ProfileTabKey;
  stats: ProfileStats;
  onChange: (tab: ProfileTabKey) => void;
};

// Counts map keyed by tab id — mirrors the API stats names.
function countFor(tab: ProfileTabKey, stats: ProfileStats): number {
  switch (tab) {
    case "blogs":
      return stats?.blogsCount ?? 0;
    case "saved":
      return stats?.savedCount ?? 0;
    case "orders":
      return stats?.ordersCount ?? 0;
    case "comments":
      return stats?.commentsCount ?? 0;
  }
}

export function ProfileTabsStrip(props: Props) {
  const { active, stats, onChange } = props;

  return (
    <div className="border-b border-zinc-200/60 dark:border-white/[0.06]">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto -mx-1 px-1">
        {PROFILE_TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative inline-flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                icon={tab.icon}
                className={cn("size-4", isActive ? "text-primary" : "")}
              />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] h-5 text-[11px] font-semibold",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-silk-with-hover text-muted-foreground",
                )}
              >
                {countFor(tab.id, stats)}
              </span>
              <span
                className={cn(
                  "absolute left-2 right-2 -bottom-px h-[2px] rounded-full transition-opacity",
                  isActive ? "bg-primary opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
