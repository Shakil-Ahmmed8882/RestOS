"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";
import { DragScrollRow } from "@/components/rest-os-ui/scroll/DragScrollRow";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { BlogItem } from "@/modules/blog/types/blog.types";

/**
 * Editorial CTA strip on the food browse page that surfaces the blog.
 *
 * - Click "Read the blog" → /blog (full blog index).
 * - Click any preview card → /blog/{_id}.
 * - Card images degrade through BaseImage so missing assets don't break
 *   layout.
 */
export function FoodBlogCtaSection() {
  const router = useRouter();
  const { data, isLoading } = useGetAllBlogsQuery([
    { name: "limit", value: "6" },
    { name: "sort", value: "-createdAt" },
  ]);

  const list = (data as any)?.data;
  const items: BlogItem[] = Array.isArray(list) ? list : [];

  // Don't render at all on a true empty server response — the strip would
  // feel like dead weight. Loading shows skeletons instead.
  if (!isLoading && items.length === 0) return null;

  return (
    <section className="rounded-2xl bg-silk-with-hover p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-semibold">
            <Icon icon="solar:notebook-bookmark-bold" className="h-3.5 w-3.5" />
            From the blog
          </span>
          <h2 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Insights, recipes &amp; the craft behind the food
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-xl">
            Quick reads from the kitchen — hand-picked stories you can finish
            with your coffee.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="shrink-0 inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-sm font-semibold shadow-sm shadow-primary/30 hover:bg-primary/90 transition-colors"
        >
          Read the blog
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </button>
      </div>

      <DragScrollRow>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <CtaPreviewSkeleton key={i} />
            ))
          : items.map((b) =>
              b?._id ? (
                <CtaPreviewCard
                  key={b._id}
                  blog={b}
                  onClick={() => router.push(`/blog/${b._id}`)}
                />
              ) : null,
            )}
      </DragScrollRow>
    </section>
  );
}

function CtaPreviewCard({
  blog,
  onClick,
}: {
  blog: BlogItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group shrink-0 w-[220px] sm:w-[240px] rounded-2xl bg-white dark:bg-zinc-900/70 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden text-left transition-all hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
    >
      <div className="relative h-[120px] overflow-hidden">
        <BaseImage
          src={blog?.image}
          alt={blog?.title}
          className="h-full w-full"
          imgClass="transition-transform duration-300 group-hover:scale-105"
          sizes="240px"
        />
        {blog?.category && (
          <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold !text-white">
            {blog.category}
          </span>
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-sm font-semibold text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {blog?.title ?? "Untitled"}
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
          Read more
          <Icon icon="solar:arrow-right-linear" className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

function CtaPreviewSkeleton() {
  return (
    <div className="shrink-0 w-[220px] sm:w-[240px] rounded-2xl bg-white dark:bg-zinc-900/70 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] overflow-hidden">
      <div className="h-[120px] w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-4/5 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-3 w-3/5 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  );
}
