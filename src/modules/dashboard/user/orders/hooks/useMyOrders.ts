"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useGetMyOrdersQuery, useGetMyOrdersSummaryQuery } from "@/redux/featureApi/orderApi";
import type { OrderStatusFilter } from "@/modules/dashboard/user/orders/types";

const LIMIT = 10;

export function useMyOrders() {
  const [tab, setTab]       = useState<OrderStatusFilter>("pending");
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const debounceRef         = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300);
  }, []);

  const handleTabChange = useCallback((t: OrderStatusFilter) => {
    setTab(t);
    setPage(1);
  }, []);

  const listQuery = useGetMyOrdersQuery(
    {
      status: tab === "all" ? undefined : tab,
      searchTerm: debouncedSearch || undefined,
      page,
      limit: LIMIT,
      sort: "-createdAt",
    },
    // keepPreviousData so table never blanks between pages
    { refetchOnMountOrArgChange: true },
  );

  const summaryQuery = useGetMyOrdersSummaryQuery();

  const rows  = useMemo(() => listQuery.data?.data ?? [], [listQuery.data]);
  const meta  = listQuery.data?.meta;
  const summary = summaryQuery.data?.data;

  return {
    tab,
    search,
    page,
    rows,
    meta,
    summary,
    handleTabChange,
    handleSearchChange,
    setPage,
    isLoading:        listQuery.isLoading,
    isFetching:       listQuery.isFetching,
    isError:          listQuery.isError,
    refetch:          listQuery.refetch,
    isSummaryLoading: summaryQuery.isLoading,
  };
}
