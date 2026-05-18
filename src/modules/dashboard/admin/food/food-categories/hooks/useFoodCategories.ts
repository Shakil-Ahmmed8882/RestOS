"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetAllFoodsCategoriesQuery } from "@/redux/featureApi/foodCategoryApi";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useInfiniteScrollController,
  type FetchPage,
} from "@/components/rest-os-ui/infinite-scroll";
import type { TFoodCategory } from "../types";

const PAGE_LIMIT = 12;

export function useFoodCategories() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 350);
  const [triggerFetch] = useLazyGetAllFoodsCategoriesQuery();

  const fetchPage: FetchPage<TFoodCategory> = useCallback(
    async (page) => {
      const args = [
        { name: "page", value: String(page) },
        { name: "limit", value: String(PAGE_LIMIT) },
        ...(debounced.trim()
          ? [{ name: "search", value: debounced.trim() }]
          : []),
      ];

      const response = await triggerFetch(args, false).unwrap();

      const items = (response?.data ?? []) as TFoodCategory[];
      const meta = response?.meta as
        | { totalPage?: number; total?: number; page?: number }
        | undefined;

      const hasMore =
        typeof meta?.totalPage === "number"
          ? page < meta.totalPage
          : items.length === PAGE_LIMIT;

      return { items, hasMore };
    },
    [debounced, triggerFetch],
  );

  const controller = useInfiniteScrollController<TFoodCategory>({
    fetchPage,
  });

  // Reset + refetch from page 1 whenever the debounced search changes.
  // Skip the initial mount — the controller already auto-loads page 1.
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    controller.reset(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  // Surface a "user is typing / search is pending" signal so the UI can
  // show a skeleton even before the controller flips to "loading".
  const isSearchPending = search.trim() !== debounced.trim();

  return {
    search,
    setSearch,
    debouncedSearch: debounced,
    isSearchPending,
    ...controller,
  };
}
