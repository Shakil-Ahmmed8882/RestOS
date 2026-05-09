"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";
import { Input } from "@/components/ui/input";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { BlogCard } from "@/modules/blog/sections/blog-list/BlogCard";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";
import { useDebounce } from "@/hooks/useDebounce";
import type { BlogItem } from "@/modules/blog/types/blog.types";
import { CardSkeletonV2List } from "@/components/rest-os-ui/placeholder/skeletons/CardSkeletons";

export function BlogGrid() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 350);
  const args = debounced ? [{ name: "search", value: debounced }] : undefined;
  const { data, isLoading, isFetching } = useGetAllBlogsQuery(args);
  const items: BlogItem[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <ErrorBoundary>
      <Container className="py-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Blog</h1>
            <p className="mt-1 text-sm text-muted-foreground">Stories, tips, and recipes from the food community.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles…" className="pl-9" />
          </div>
        </div>

      <CustomSuspense
        isLoading={isLoading   || isFetching}
        fallback={<CardSkeletonV2List count={6} />}
      >
        <NoResultFoundWrapper data={items} title="No posts yet">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((b) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </div>
        </NoResultFoundWrapper>
      </CustomSuspense>
      </Container>
    </ErrorBoundary>
  );
}
