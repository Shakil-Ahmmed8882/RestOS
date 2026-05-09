"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { FoodFilterState } from "@/modules/food/types/food.types";

interface FoodFilterContextValue {
  filters: FoodFilterState;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (value: FoodFilterState["sort"]) => void;
  setPage: (value: number) => void;
  setRating: (value: number | null) => void;
  setVegetarian: (value: boolean) => void;
  reset: () => void;
}

const DEFAULT: FoodFilterState = {
  search: "",
  category: "all",
  sort: "newest",
  page: 1,
  limit: 12,
  minRating: null,
  isVegetarian: false,
};

const FoodFilterContext = createContext<FoodFilterContextValue | null>(null);

export function FoodFilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FoodFilterState>(DEFAULT);

  const value = useMemo<FoodFilterContextValue>(
    () => ({
      filters,
      setSearch: (search) => setFilters((p) => ({ ...p, search, page: 1 })),
      setCategory: (category) => setFilters((p) => ({ ...p, category, page: 1 })),
      setSort: (sort) => setFilters((p) => ({ ...p, sort, page: 1 })),
      setPage: (page) => setFilters((p) => ({ ...p, page })),
      setRating: (minRating) => setFilters((p) => ({ ...p, minRating, page: 1 })),
      setVegetarian: (isVegetarian) => setFilters((p) => ({ ...p, isVegetarian, page: 1 })),
      reset: () => setFilters(DEFAULT),
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
