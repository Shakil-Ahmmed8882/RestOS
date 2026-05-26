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
};

function buildFilterKey(params: Record<string, string>): string {
  const { page: _p, ...rest } = params;
  return Object.keys(rest)
    .sort()
    .map((k) => `${k}=${rest[k]}`)
    .join("&");
}

export function useFoods() {
  const { filters } = useFoodFilter();
  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedMinPrice = useDebounce(filters.minPrice, 300);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 300);
  const accumulatedRef = useRef<FoodItem[]>([]);
  const prevKeyRef = useRef<string>("");

  const queryArgs = useMemo(() => {
    const params: Record<string, string> = {
      page: String(filters.page),
      limit: String(filters.limit),
      sort: SORT_MAP[filters.sort] || "-createdAt",
    };
    if (debouncedSearch?.trim()) params.searchTerm = debouncedSearch.trim();
    if (filters.category && filters.category !== "all") params.foodCategory = filters.category;
    if (filters.cuisine && filters.cuisine !== "all") params.cuisine = filters.cuisine;
    if (debouncedMinPrice !== null && debouncedMinPrice !== undefined)
      params.minPrice = String(debouncedMinPrice);
    if (debouncedMaxPrice !== null && debouncedMaxPrice !== undefined)
      params.maxPrice = String(debouncedMaxPrice);
    if (filters.minRating) params.minRating = String(filters.minRating);
    if (filters.maxPrepTime) params.maxPrepTime = String(filters.maxPrepTime);
    if (filters.isVeg) params.isVeg = "true";
    if (filters.isSpicy) params.isSpicy = "true";
    if (filters.isGlutenFree) params.isGlutenFree = "true";
    if (filters.inStock) params.inStock = "true";
    if (filters.hasDiscount) params.hasDiscount = "true";
    if (filters.bestseller) params.bestseller = "true";
    return params;
  }, [
    filters.page,
    filters.limit,
    filters.sort,
    filters.category,
    filters.cuisine,
    filters.minRating,
    filters.maxPrepTime,
    filters.isVeg,
    filters.isSpicy,
    filters.isGlutenFree,
    filters.inStock,
    filters.hasDiscount,
    filters.bestseller,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
  ]);

  const query = useGetAllFoodsQuery(queryArgs);
  const { data } = query;

  const accumulate = useCallback(() => {
    const key = buildFilterKey(queryArgs);
    const filterChanged = prevKeyRef.current !== key;

    if (filterChanged) {
      accumulatedRef.current = [];
      prevKeyRef.current = key;
    }

    const currentPageData = (data?.data as FoodItem[]) ?? [];
    if (filters.page === 1) {
      accumulatedRef.current = currentPageData;
    } else {
      accumulatedRef.current = [...accumulatedRef.current, ...currentPageData];
    }

    return accumulatedRef.current;
  }, [data?.data, filters.page, queryArgs]);

  return { ...query, accumulate };
}
