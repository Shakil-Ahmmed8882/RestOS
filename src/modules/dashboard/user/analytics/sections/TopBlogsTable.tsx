"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import type { TopBlog } from "@/modules/dashboard/user/analytics/types";
import { fmtCount } from "@/modules/dashboard/user/analytics/utils/format";

type Props = { rows: TopBlog[] | null | undefined };

export function TopBlogsTable({ rows }: Props) {
  const items = rows ?? [];

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Top blogs</h3>
          <p className="text-xs text-muted-foreground">Most engaging posts you wrote</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon icon="solar:document-text-bold-duotone" className="h-4 w-4" />
        </span>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Icon icon="solar:notebook-bold-duotone" className="h-8 w-8 text-primary/60" />
          <p className="text-xs">No blogs published yet.</p>
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-zinc-100 dark:divide-white/[0.04]">
          {items.map((b, idx) => {
            if (!b?.blogId) return null;
            return (
              <li key={b.blogId} className="py-2.5">
                <Link
                  href={`/blog-details/${b.blogId}`}
                  className="group flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span className="truncate font-medium text-foreground group-hover:text-primary">
                      {b.title ?? "Untitled"}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-[11px] tabular-nums text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5">
                      <Icon icon="solar:arrow-up-bold" className="h-3 w-3 text-emerald-500" />
                      {fmtCount(b.upvotes ?? 0)}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Icon icon="solar:chat-round-bold" className="h-3 w-3 text-primary" />
                      {fmtCount(b.commentsCount ?? 0)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
