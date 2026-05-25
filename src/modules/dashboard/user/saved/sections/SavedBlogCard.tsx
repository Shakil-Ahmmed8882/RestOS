"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { ShowIf } from "@/components/common/ShowIf";
import { useUnsave } from "@/modules/dashboard/user/saved/hooks/useUnsave";
import type { SaveRow, SavedBlogResource } from "@/modules/dashboard/user/saved/types";

type Props = { row: SaveRow };

export function SavedBlogCard({ row }: Props) {
  const unsave = useUnsave();
  if (!row) return null;

  const b = row.resource as SavedBlogResource | null;
  if (!b?._id) return null;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/60 transition-shadow hover:ring-primary/30 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <Link href={`/blogs/${b._id}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/40">
          <BaseImage
            src={b?.image ?? ""}
            alt={b?.title ?? "Saved blog"}
            className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
            <Icon icon="solar:document-text-bold" className="h-3 w-3" />
            {b?.category ?? "Blog"}
          </span>
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Link
          href={`/blogs/${b._id}`}
          className="line-clamp-2 block text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          {b?.title ?? "Untitled"}
        </Link>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Icon icon="solar:arrow-up-bold" className="h-3.5 w-3.5 text-emerald-500" />
              <span className="tabular-nums">{b?.upvotes ?? 0}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Icon icon="solar:chat-round-bold" className="h-3.5 w-3.5 text-primary" />
              <span className="tabular-nums">{b?.commentsCount ?? 0}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => unsave.remove("blog", row.itemId)}
            disabled={unsave.isLoading}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-60"
            aria-label="Remove from saved"
          >
            <ShowIf
              condition={unsave.isLoading}
              fallback={
                <>
                  <Icon icon="solar:bookmark-bold" className="h-3.5 w-3.5" />
                  Saved
                </>
              }
            >
              <Icon icon="svg-spinners:ring-resize" className="h-3.5 w-3.5" />
            </ShowIf>
          </button>
        </div>
      </div>
    </article>
  );
}
