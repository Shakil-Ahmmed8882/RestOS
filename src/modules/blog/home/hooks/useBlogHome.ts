"use client";

import { useMemo, useState } from "react";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";
import { useDebounce } from "@/hooks/useDebounce";
import type { BlogItem } from "@/modules/blog/types/blog.types";

export type BlogFilter = string; // "All Articles" | category name

export const ALL_FILTER: BlogFilter = "All Articles";

export function useBlogHome() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BlogFilter>(ALL_FILTER);
  const debounced = useDebounce(search, 350);

  const args = useMemo(() => {
    const params: Array<{ name: string; value: string }> = [];
    params.push({ name: "status", value: "approved" });
    if (debounced.trim()) params.push({ name: "searchTerm", value: debounced.trim() });
    if (filter !== ALL_FILTER) params.push({ name: "category", value: filter });
    params.push({ name: "sort", value: "-createdAt" });
    return params;
  }, [debounced, filter]);

  const { data, isLoading, isFetching, error, refetch } =
    useGetAllBlogsQuery(args);

  const items: BlogItem[] = useMemo(() => {
    const list = (data as any)?.data;
    return Array.isArray(list) ? list : [];
  }, [data]);

  // Derive filter chips from the loaded blogs. Capped at top 5 by count.
  const filters: BlogFilter[] = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((b) => {
      const c = b?.category?.trim();
      if (!c) return;
      counts.set(c, (counts.get(c) ?? 0) + 1);
    });
    const sorted = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);
    return [ALL_FILTER, ...sorted];
  }, [items]);

  const isSearchPending = search.trim() !== debounced.trim();

  return {
    items,
    isLoading,
    isFetching,
    error,
    refetch,
    search,
    setSearch,
    isSearchPending,
    filter,
    setFilter,
    filters,
  };
}
