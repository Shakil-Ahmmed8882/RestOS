"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetMyBlogsQuery } from "@/redux/featureApi/blogApi";
import { useAppSelector } from "@/redux/hooks";
import type { BlogItem } from "@/modules/blog/types/blog.types";
import type { MyBlogTabKey } from "@/modules/dashboard/user/my-blogs/types";

const LIMIT = 12;
const STORAGE_KEY = "user-my-blogs:tab";

const VALID_TABS: MyBlogTabKey[] = ["all", "approved", "pending"];
const isValidTab = (v: unknown): v is MyBlogTabKey =>
  typeof v === "string" && (VALID_TABS as string[]).includes(v);

function readInitialTab(): MyBlogTabKey {
  if (typeof window === "undefined") return "all";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isValidTab(raw) ? raw : "all";
  } catch {
    return "all";
  }
}

export function useMyBlogs() {
  const user = useAppSelector((s) => s.auth.user);
  const userId = user?.id ?? "";

  const [tab, setTab] = useState<MyBlogTabKey>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTab(readInitialTab());
  }, []);

  const handleTabChange = useCallback((next: MyBlogTabKey) => {
    setTab(next);
    setPage(1);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore quota / private-mode
    }
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300);
  }, []);

  const listQuery = useGetMyBlogsQuery(
    {
      user: userId,
      searchTerm: debouncedSearch || undefined,
      status: tab,
      page,
      limit: LIMIT,
      sort: "-createdAt",
    },
    { skip: !userId, refetchOnMountOrArgChange: true },
  );

  const rows: BlogItem[] = useMemo(
    () => listQuery.currentData?.data ?? listQuery.data?.data ?? [],
    [listQuery.currentData, listQuery.data],
  );
  const meta = listQuery.currentData?.meta ?? listQuery.data?.meta;
  const total = meta?.total ?? 0;
  const totalPage =
    meta && meta.limit ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  // Counts come from the same endpoint without status filter — fetch once with
  // a generous limit just to compute aggregates. Cheap because RTK-Q caches it.
  const allMineQuery = useGetMyBlogsQuery(
    { user: userId, limit: 200, sort: "-createdAt" },
    { skip: !userId },
  );
  const allMine: BlogItem[] = allMineQuery.data?.data ?? [];
  const counts = useMemo(() => {
    let approved = 0;
    let pending = 0;
    let testApproved = 0;
    for (const b of allMine) {
      if (b?.status === "approved") approved += 1;
      else if (b?.status === "pending") pending += 1;
      else if (b?.status === "test-approved") testApproved += 1;
    }
    return {
      all: allMine.length,
      approved,
      pending,
      "test-approved": testApproved,
    } as Record<MyBlogTabKey, number>;
  }, [allMine]);

  const showSkeleton = listQuery.isFetching && !listQuery.currentData;

  return {
    userId,
    tab,
    search,
    page,
    rows,
    meta,
    total,
    totalPage,
    counts,
    handleTabChange,
    handleSearchChange,
    setPage,
    isLoading: listQuery.isLoading,
    isFetching: listQuery.isFetching,
    showSkeleton,
    isError: listQuery.isError,
    refetch: listQuery.refetch,
    isCountsLoading: allMineQuery.isLoading,
  };
}

export type UseMyBlogsReturn = ReturnType<typeof useMyBlogs>;
