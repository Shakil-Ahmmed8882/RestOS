"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useGetMySavesQuery,
  useGetSaveCountsQuery,
} from "@/redux/featureApi/saveApi";
import type { SavedTabKey } from "@/modules/dashboard/user/saved/types";

const LIMIT = 12;
const STORAGE_KEY = "user-saved:tab";

const isValidTab = (v: unknown): v is SavedTabKey => v === "blog" || v === "food";

function readInitialTab(): SavedTabKey {
  if (typeof window === "undefined") return "blog";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isValidTab(raw) ? raw : "blog";
  } catch {
    return "blog";
  }
}

export function useMySaves() {
  const [tab, setTab] = useState<SavedTabKey>("blog");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTab(readInitialTab());
  }, []);

  const handleTabChange = useCallback((next: SavedTabKey) => {
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

  const listQuery = useGetMySavesQuery(
    {
      type: tab,
      searchTerm: debouncedSearch || undefined,
      page,
      limit: LIMIT,
      sort: "-createdAt",
    },
    { refetchOnMountOrArgChange: true },
  );

  const countsQuery = useGetSaveCountsQuery();

  const rows = listQuery.currentData?.data ?? listQuery.data?.data ?? [];
  const meta = listQuery.currentData?.meta ?? listQuery.data?.meta;
  const counts = countsQuery.data?.data;

  // Skeleton shows for the FIRST load and whenever the user navigates to a
  // set of args we don't have cached data for yet (tab change, new debounced
  // search, new page). Background refetches with cached data stay silent.
  const showSkeleton = listQuery.isFetching && !listQuery.currentData;

  return {
    tab,
    search,
    page,
    rows,
    meta,
    counts,
    handleTabChange,
    handleSearchChange,
    setPage,
    isLoading: listQuery.isLoading,
    isFetching: listQuery.isFetching,
    showSkeleton,
    isError: listQuery.isError,
    refetch: listQuery.refetch,
    isCountsLoading: countsQuery.isLoading,
  };
}

export type UseMySavesReturn = ReturnType<typeof useMySaves>;
