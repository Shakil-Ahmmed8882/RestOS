"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { CommentsDrawer } from "@/modules/blog/comments";
import { BlogFilterBar } from "../components/BlogFilterBar";
import { BlogListCard } from "../components/BlogListCard";
import { BlogListSkeleton } from "../loading/placeholder/BlogListSkeleton";
import { useBlogHome } from "../hooks/useBlogHome";
import { PendingBlogsStripSection } from "./PendingBlogsStripSection";
import type { BlogItem } from "@/modules/blog/types/blog.types";

export function AllBlogsSection() {
  const {
    items,
    isLoading,
    error,
    refetch,
    search,
    setSearch,
    isSearchPending,
    filter,
    setFilter,
    filters,
  } = useBlogHome();

  const [drawerBlog, setDrawerBlog] = useState<BlogItem | null>(null);

  const showSkeleton = (isLoading && items.length === 0) || isSearchPending;
  const isEmpty = !showSkeleton && items.length === 0 && !error;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            All Articles
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Find no-fail tools that will help designers build to last. Simplify
            design with our comprehensive and carefully vetted library from the
            start.
          </p>
        </div>
      </div>

      <BlogFilterBar
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        active={filter}
        onSelect={setFilter}
      />

      <PendingBlogsStripSection />

      <div className="mt-7">
        {showSkeleton && <BlogListSkeleton count={6} />}

        {error && (
          <div className="rounded-2xl bg-primary/5 px-5 py-4 flex items-center justify-between">
            <div className="text-sm text-primary">
              {(error as any)?.data?.message ?? "Couldn't load articles."}
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-12 text-center">
            <Icon
              icon="solar:document-text-linear"
              className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40"
            />
            <p className="text-sm font-semibold text-foreground">
              No articles found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {search
                ? `No results for "${search}"`
                : "Check back soon — new posts land here often."}
            </p>
          </div>
        )}

        {!showSkeleton && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {items.map((b) =>
              b?._id ? (
                <BlogListCard
                  key={b._id}
                  blog={b}
                  onOpenComments={(blog) => setDrawerBlog(blog)}
                />
              ) : null,
            )}
          </div>
        )}
      </div>

      <CommentsDrawer
        open={Boolean(drawerBlog?._id)}
        onOpenChange={(next) => {
          if (!next) setDrawerBlog(null);
        }}
        blogId={drawerBlog?._id ?? null}
        blogTitle={drawerBlog?.title}
      />
    </section>
  );
}
