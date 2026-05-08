"use client";

import { useMemo } from "react";
import { useGetAllFoodsQuery } from "@/redux/featureApi/foodApi";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { useDebounce } from "@/hooks/useDebounce";

export function useFoods() {
  const { filters } = useFoodFilter();
  const debouncedSearch = useDebounce(filters.search, 350);

  const queryArgs = useMemo(() => {
    const args: { name: string; value: string }[] = [
      { name: "page", value: String(filters.page) },
      { name: "limit", value: String(filters.limit) },
      { name: "sort", value: filters.sort },
    ];
    if (debouncedSearch) args.push({ name: "search", value: debouncedSearch });
    if (filters.category && filters.category !== "all") args.push({ name: "category", value: filters.category });
    return args;
  }, [filters.page, filters.limit, filters.sort, filters.category, debouncedSearch]);

  return useGetAllFoodsQuery(queryArgs);
}
