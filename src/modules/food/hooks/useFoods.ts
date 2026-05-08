"use client";

import { useMemo } from "react";
import { useGetAllFoodsQuery } from "@/redux/featureApi/foodApi";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { useDebounce } from "@/hooks/useDebounce";

const SORT_MAP: Record<string, string> = {
  newest: "-createdAt",
  "price-asc": "price",
  "price-desc": "-price",
  rating: "-averageRating",
};

export function useFoods() {
  const { filters } = useFoodFilter();
  const debouncedSearch = useDebounce(filters.search, 350);

  const queryArgs = useMemo(() => {
    const args: { name: string; value: string }[] = [
      { name: "page", value: String(filters.page) },
      { name: "limit", value: String(filters.limit) },
      { name: "sort", value: SORT_MAP[filters.sort] || "-createdAt" },
    ];
    if (debouncedSearch) args.push({ name: "searchTerm", value: debouncedSearch });
    if (filters.category && filters.category !== "all") args.push({ name: "foodCategory", value: filters.category });
    return args;
  }, [filters.page, filters.limit, filters.sort, filters.category, debouncedSearch]);

  return useGetAllFoodsQuery(queryArgs);
}
