"use client";

import { useMemo, useRef, useCallback } from "react";
import { useGetAllFoodsQuery } from "@/redux/featureApi/foodApi";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { useDebounce } from "@/hooks/useDebounce";
import type { FoodItem } from "@/modules/food/types/food.types";

const SORT_MAP: Record<string, string> = {
  newest: "-createdAt",
  "price-asc": "price",
  "price-desc": "-price",
  rating: "-averageRating",
  fastest: "preparationTime",
  distance: "distance",
};

export function useFoods() {
  const { filters } = useFoodFilter();
  const debouncedSearch = useDebounce(filters.search, 300);
  const accumulatedRef = useRef<FoodItem[]>([]);
  const prevFiltersRef = useRef({ search: debouncedSearch, category: filters.category, sort: filters.sort });

  const queryArgs = useMemo(() => {
    const params: Record<string, string> = {
      page: String(filters.page),
      limit: String(filters.limit),
      sort: SORT_MAP[filters.sort] || "-createdAt",
    };
    if (debouncedSearch?.trim()) params.searchTerm = debouncedSearch.trim();
    if (filters.category && filters.category !== "all") params.foodCategory = filters.category;
    if (filters.minRating) params.minRating = String(filters.minRating);
    if (filters.isVegetarian) params.isVegetarian = "true";
    return params;
  }, [filters.page, filters.limit, filters.sort, filters.category, filters.minRating, filters.isVegetarian, debouncedSearch]);

  const query = useGetAllFoodsQuery(queryArgs);
  const { data } = query;

  const accumulate = useCallback(() => {
    const filterChanged =
      prevFiltersRef.current.search !== debouncedSearch ||
      prevFiltersRef.current.category !== filters.category ||
      prevFiltersRef.current.sort !== filters.sort;

    if (filterChanged) {
      accumulatedRef.current = [];
      prevFiltersRef.current = { search: debouncedSearch, category: filters.category, sort: filters.sort };
    }

    const currentPageData = (data?.data as FoodItem[]) ?? [];
    if (filters.page === 1) {
      accumulatedRef.current = currentPageData;
    } else {
      accumulatedRef.current = [...accumulatedRef.current, ...currentPageData];
    }

    return accumulatedRef.current;
  }, [data?.data, filters.page, debouncedSearch, filters.category, filters.sort]);

  return { ...query, accumulate };
}
