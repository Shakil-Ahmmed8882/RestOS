"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { MY_BLOG_TABS } from "@/modules/dashboard/user/my-blogs/types";
import type { useMyBlogs } from "@/modules/dashboard/user/my-blogs/hooks/useMyBlogs";

type Props = { blogs: ReturnType<typeof useMyBlogs> };

export function MyBlogsTabs({ blogs }: Props) {
  const { tab, handleTabChange, counts } = blogs;

  return (
    <div className="flex flex-wrap gap-1 border-b border-zinc-100 dark:border-white/[0.04]">
      {MY_BLOG_TABS.map((t) => {
        const active = t.key === tab;
        const n = counts[t.key];
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => handleTabChange(t.key)}
            className={cn(
              "relative -mb-px inline-flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon icon={t.icon} className="h-4 w-4" />
            {t.label}
            {n !== undefined && (
              <span
                className={cn(
                  "inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                  active
                    ? "bg-primary/10 text-primary"
                    : "bg-zinc-100 text-muted-foreground dark:bg-white/[0.06]",
                )}
              >
                {n}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
