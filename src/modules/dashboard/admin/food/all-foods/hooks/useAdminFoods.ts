"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { baseApi } from "@/redux/featureApi/baseApi";
import { useAppDispatch } from "@/redux/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useInfiniteScrollController,
  type FetchPage,
} from "@/components/rest-os-ui/infinite-scroll";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

const PAGE_LIMIT = 10;

export function useAdminFoods() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 350);

  const fetchPage: FetchPage<FoodItem> = useCallback(
    async (page) => {
      const params: Record<string, string> = {
        page: String(page),
        limit: String(PAGE_LIMIT),
        sort: "-createdAt",
      };
      if (debounced.trim()) params.searchTerm = debounced.trim();

      // Use baseApi.endpoints to trigger via the existing getAllFoods query.
      const result: any = await dispatch(
        (baseApi.endpoints as any).getAllFoods.initiate(params, {
          forceRefetch: true,
        }),
      ).unwrap();

      const items: FoodItem[] = Array.isArray(result?.data)
        ? (result.data as FoodItem[])
        : [];
      const meta = result?.meta as
        | { total?: number; page?: number; limit?: number }
        | undefined;
      const hasMore = meta?.total
        ? page * PAGE_LIMIT < meta.total
        : items.length === PAGE_LIMIT;

      return { items, hasMore };
    },
    [dispatch, debounced],
  );

  const controller = useInfiniteScrollController<FoodItem>({ fetchPage });

  // Reset when the debounced search changes (skip initial mount).
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    controller.reset(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const isSearchPending = search.trim() !== debounced.trim();

  return {
    search,
    setSearch,
    isSearchPending,
    ...controller,
  };
}
