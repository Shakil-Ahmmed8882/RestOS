"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { FoodFilterState, FoodSortValue } from "@/modules/food/types/food.types";

interface FoodFilterContextValue {
  filters: FoodFilterState;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setCuisine: (value: string) => void;
  setSort: (value: FoodSortValue) => void;
  setPage: (value: number) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setMinRating: (value: number | null) => void;
  setMaxPrepTime: (value: number | null) => void;
  toggleDietary: (key: "isVeg" | "isSpicy" | "isGlutenFree", value: boolean) => void;
  toggleAvailability: (
    key: "inStock" | "hasDiscount" | "bestseller",
    value: boolean,
  ) => void;
  reset: () => void;
  hasActive: boolean;
}

const DEFAULT: FoodFilterState = {
  search: "",
  category: "all",
  cuisine: "all",
  sort: "newest",
  page: 1,
  limit: 12,
  minPrice: null,
  maxPrice: null,
  minRating: null,
  maxPrepTime: null,
  isVeg: false,
  isSpicy: false,
  isGlutenFree: false,
  inStock: false,
  hasDiscount: false,
  bestseller: false,
};

function computeHasActive(s: FoodFilterState) {
  return (
    !!s.search ||
    s.category !== "all" ||
    s.cuisine !== "all" ||
    s.sort !== "newest" ||
    s.minPrice !== null ||
    s.maxPrice !== null ||
    s.minRating !== null ||
    s.maxPrepTime !== null ||
    s.isVeg ||
    s.isSpicy ||
    s.isGlutenFree ||
    s.inStock ||
    s.hasDiscount ||
    s.bestseller
  );
}

const FoodFilterContext = createContext<FoodFilterContextValue | null>(null);

export function FoodFilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FoodFilterState>(DEFAULT);

  const value = useMemo<FoodFilterContextValue>(
    () => ({
      filters,
      setSearch: (search) => setFilters((p) => ({ ...p, search, page: 1 })),
      setCategory: (category) => setFilters((p) => ({ ...p, category, page: 1 })),
      setCuisine: (cuisine) => setFilters((p) => ({ ...p, cuisine, page: 1 })),
      setSort: (sort) => setFilters((p) => ({ ...p, sort, page: 1 })),
      setPage: (page) => setFilters((p) => ({ ...p, page })),
      setPriceRange: (minPrice, maxPrice) =>
        setFilters((p) => ({ ...p, minPrice, maxPrice, page: 1 })),
      setMinRating: (minRating) =>
        setFilters((p) => ({ ...p, minRating, page: 1 })),
      setMaxPrepTime: (maxPrepTime) =>
        setFilters((p) => ({ ...p, maxPrepTime, page: 1 })),
      toggleDietary: (key, value) =>
        setFilters((p) => ({ ...p, [key]: value, page: 1 })),
      toggleAvailability: (key, value) =>
        setFilters((p) => ({ ...p, [key]: value, page: 1 })),
      reset: () => setFilters(DEFAULT),
      hasActive: computeHasActive(filters),
    }),
    [filters],
  );

  return <FoodFilterContext.Provider value={value}>{children}</FoodFilterContext.Provider>;
}

export function useFoodFilter() {
  const ctx = useContext(FoodFilterContext);
  if (!ctx) throw new Error("useFoodFilter must be used inside FoodFilterProvider");
  return ctx;
}
