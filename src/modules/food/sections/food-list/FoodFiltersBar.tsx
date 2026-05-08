"use client";

import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { useGetAllFoodsCategoriesQuery } from "@/redux/featureApi/foodCategoryApi";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top rated", value: "rating" },
] as const;

export function FoodFiltersBar() {
  const { filters, setSearch, setCategory, setSort, reset } = useFoodFilter();
  const { data } = useGetAllFoodsCategoriesQuery(undefined);
  const categories = (data?.data as { _id: string; name: string }[]) ?? [];

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes…"
          className="pl-9"
        />
      </div>
      <select
        value={filters.category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={filters.sort}
        onChange={(e) => setSort(e.target.value as never)}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Button variant="ghost" size="sm" onClick={reset}>
        <Icon icon="solar:restart-linear" className="h-4 w-4" /> Reset
      </Button>
    </div>
  );
}
