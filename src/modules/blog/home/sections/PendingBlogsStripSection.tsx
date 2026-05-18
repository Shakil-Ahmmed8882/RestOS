"use client";

import { Icon } from "@iconify/react";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { DragScrollRow } from "@/components/rest-os-ui/scroll/DragScrollRow";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { BlogItem } from "@/modules/blog/types/blog.types";
import { ShowIf } from "@/components/common/ShowIf";

/**
 * Shows the logged-in user's own pending submissions just below the
 * blog filter bar. Renders nothing when the user has none.
 *
 * The query filters by `user` (server rewrites to `author.user`) and
 * `status=pending`, so we never see other people's pending posts.
 */
export function PendingBlogsStripSection({search}: {search: string}) {
  const user = useAppSelector((s) => s?.auth?.user);

  const args = user?.id
    ? [
        { name: "status", value: "pending" },
        { name: "user", value: user.id },
        { name: "limit", value: "10" },
        { name: "sort", value: "-createdAt" },
      ]
    : undefined;

  const { data, isLoading } = useGetAllBlogsQuery(args, { skip: !user?.id });

  if (!user?.id) return null;

  const list = (data as any)?.data;
  const items: BlogItem[] = Array.isArray(list) ? list : [];

  if (!isLoading && items.length === 0) return null;

  return (

    <ShowIf condition={!search.trim()}>
    <section className="mt-6 rounded-2xl bg-primary/5 dark:bg-[#121212] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon
              icon="solar:hourglass-line-linear"
              className="h-3.5 w-3.5"
            />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Pending review
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Your stories show up here while an admin reviews them.
            </p>
          </div>
        </div>
        {items.length > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            {items.length} pending
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <PendingCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <DragScrollRow>
          {items.map((b) =>
            b?._id ? <PendingCard key={b._id} blog={b} /> : null,
          )}
        </DragScrollRow>
      )}
    </section>
    </ShowIf>
  );
}

function PendingCard({ blog }: { blog: BlogItem }) {
  return (
    <div className="group relative shrink-0 w-[260px] sm:w-[300px] rounded-2xl bg-theme ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="relative h-[110px] overflow-hidden">
        <BaseImage
          src={blog?.image}
          alt={blog?.title}
          className="h-full w-full"
          imgClass="transition-transform duration-300 group-hover:scale-105 object-cover !object-top"
          sizes="300px"
        />
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wide !text-white">
          <Icon icon="solar:hourglass-line-linear" className="h-3 w-3 !text-white" />
          Pending
        </span>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">
          {blog?.title ?? "Untitled"}
        </p>
        <p className="text-[11px] text-muted-foreground line-clamp-1">
          {blog?.category ?? "—"}
        </p>
      </div>
    </div>
  );
}

function PendingCardSkeleton() {
  return (
    <div className="shrink-0 w-[260px] sm:w-[300px] rounded-2xl bg-background ring-1 ring-zinc-200/60 dark:ring-white/[0.04] overflow-hidden">
      <div className="h-[110px] w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-4/5 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-3 w-3/5 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  );
}
