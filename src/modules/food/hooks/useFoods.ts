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
  fastest: "preparationTime",
  distance: "distance",
};

export function useFoods() {
  const { filters } = useFoodFilter();
  const debouncedSearch = useDebounce(filters.search, 300);

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

  return useGetAllFoodsQuery(queryArgs);
}
