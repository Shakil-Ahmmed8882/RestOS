"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const categories = (data?.data as { _id: string; name: string }[]) ?? [];

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const hasActiveFilters = filters.search || filters.category !== "all" || filters.sort !== "newest";

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="sticky top-16 z-40 rounded-xl border bg-card/95 p-4 backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes, ingredients…"
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

          <Button
            variant={hasActiveFilters ? "default" : "ghost"}
            size="sm"
            onClick={reset}
            className="gap-2"
          >
            <Icon icon="solar:restart-linear" className="h-4 w-4" />
            <span className="hidden md:inline">Reset</span>
          </Button>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="gap-2">
                <Icon icon="solar:magnifer-linear" className="h-3 w-3" />
                {filters.search}
                <button
                  onClick={() => setSearch("")}
                  className="ml-1 hover:opacity-70"
                >
                  <Icon icon="solar:close-circle-linear" className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category !== "all" && (
              <Badge variant="secondary" className="gap-2">
                <Icon icon="solar:tag-linear" className="h-3 w-3" />
                {filters.category}
                <button
                  onClick={() => setCategory("all")}
                  className="ml-1 hover:opacity-70"
                >
                  <Icon icon="solar:close-circle-linear" className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.sort !== "newest" && (
              <Badge variant="secondary" className="gap-2">
                <Icon icon="solar:sort-linear" className="h-3 w-3" />
                {SORT_OPTIONS.find((o) => o.value === filters.sort)?.label}
                <button
                  onClick={() => setSort("newest")}
                  className="ml-1 hover:opacity-70"
                >
                  <Icon icon="solar:close-circle-linear" className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
