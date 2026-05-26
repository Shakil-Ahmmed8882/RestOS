"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { useMyBlogs } from "@/modules/dashboard/user/my-blogs/hooks/useMyBlogs";
import { MyBlogsStatsRow } from "@/modules/dashboard/user/my-blogs/sections/MyBlogsStatsRow";
import { MyBlogsTabs } from "@/modules/dashboard/user/my-blogs/sections/MyBlogsTabs";
import { MyBlogsFilterBar } from "@/modules/dashboard/user/my-blogs/sections/MyBlogsFilterBar";
import { MyBlogsGrid } from "@/modules/dashboard/user/my-blogs/sections/MyBlogsGrid";
import { MyBlogsSkeleton } from "@/modules/dashboard/user/my-blogs/skeletons/MyBlogsSkeleton";

export function MyBlogsHomeLayout() {
  const blogs = useMyBlogs();

  return (
    <>
      <PageHeader
        title="My blogs"
        description="Everything you've written — drafts, pending reviews, and published posts."
        action={
          <Link
            href="/blogs/create"
            className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Icon icon="solar:pen-new-square-bold" className="h-4 w-4" />
            Write a blog
          </Link>
        }
      />
      <DataBoundary
        isLoading={blogs.isLoading}
        isError={blogs.isError}
        onReset={() => blogs.refetch()}
        skeleton={<MyBlogsSkeleton />}
      >
        <div className="space-y-5">
          <MyBlogsStatsRow blogs={blogs} />
          <MyBlogsTabs blogs={blogs} />
          <MyBlogsFilterBar blogs={blogs} />
          <MyBlogsGrid blogs={blogs} />
        </div>
      </DataBoundary>
    </>
  );
}
