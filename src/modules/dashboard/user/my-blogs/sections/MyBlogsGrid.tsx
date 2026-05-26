"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/ShowIf";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { MyBlogCard } from "@/modules/dashboard/user/my-blogs/sections/MyBlogCard";
import { MyBlogsGridSkeleton } from "@/modules/dashboard/user/my-blogs/skeletons/MyBlogsSkeleton";
import type { useMyBlogs } from "@/modules/dashboard/user/my-blogs/hooks/useMyBlogs";

type Props = { blogs: ReturnType<typeof useMyBlogs> };

export function MyBlogsGrid({ blogs }: Props) {
  const { rows, page, setPage, tab, search, total, totalPage, showSkeleton } = blogs;

  if (showSkeleton) {
    return <MyBlogsGridSkeleton />;
  }

  const empty = (() => {
    if (search) {
      return {
        title: "No matching blogs",
        description: "Try a different search term.",
      };
    }
    if (tab === "approved") {
      return {
        title: "Nothing approved yet",
        description: "Once a blog is approved it'll show up here.",
      };
    }
    if (tab === "pending") {
      return {
        title: "No pending blogs",
        description: "Blogs waiting on review will appear here.",
      };
    }
    return {
      title: "You haven't written any blogs yet",
      description: "Start sharing your stories and recipes with the community.",
    };
  })();

  return (
    <div className="space-y-5">
      <NoResultFoundWrapper data={rows} title={empty.title} description={empty.description}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map((blog) => {
            if (!blog?._id) return null;
            return <MyBlogCard key={blog._id} blog={blog} />;
          })}
        </div>
      </NoResultFoundWrapper>

      <ShowIf condition={totalPage > 1}>
        <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-3 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPage}
            {total ? ` · ${total} ${total === 1 ? "blog" : "blogs"}` : ""}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(Math.max(1, page - 1))}
              className="h-7 gap-1 px-2 text-xs"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPage}
              onClick={() => setPage(Math.min(totalPage, page + 1))}
              className="h-7 gap-1 px-2 text-xs"
            >
              Next
              <Icon icon="solar:alt-arrow-right-linear" className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </ShowIf>
    </div>
  );
}
