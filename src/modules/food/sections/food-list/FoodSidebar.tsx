"use client";

import {  useRef, useState } from "react";

import { Icon } from "@iconify/react";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { useGetAllFoodsCategoriesQuery } from "@/redux/featureApi/foodCategoryApi";

const SORT_OPTIONS = [
  { label: "Relevance", value: "newest", icon: "solar:sort-linear" },
  { label: "Fastest delivery", value: "fastest", icon: "solar:bolt-linear" },
  { label: "Distance", value: "distance", icon: "solar:map-linear" },
  { label: "Top rated", value: "rating", icon: "solar:star-bold" },
] as const;

const QUICK_FILTERS = [
  { label: "Ratings 4+", value: "rating-4", icon: "solar:star-linear" },
  { label: "Super restaurant", value: "super", icon: "solar:shield-check-linear" },
] as const;

const DIETARY_FILTERS = [
  { label: "Vegetarian", value: "vegetarian", icon: "solar:leaf-linear" },
  { label: "Gluten-free", value: "glutenfree", icon: "solar:wheat-linear" },
  { label: "Spicy", value: "spicy", icon: "solar:fire-linear" },
] as const;

const OFFERS = [
  { label: "Deals & Offers", value: "deals", icon: "solar:gift-linear" },
  { label: "Free delivery", value: "free-delivery", icon: "solar:car-linear" },
  { label: "Bestsellers", value: "bestseller", icon: "solar:star-bold" },
] as const;

export function FoodSidebar() {
  const { filters, setSort, setCategory, reset} = useFoodFilter();
  const { data } = useGetAllFoodsCategoriesQuery(undefined);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const categories = (data?.data as { _id: string; name: string }[]) ?? [];

  const hasActiveFilters = filters.search || filters.category !== "all" || filters.sort !== "newest";

  return (
    <aside
      ref={sidebarRef}
      className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-background dark:bg-background"
    >
      <div className="h-screen overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Sort Section Header with Reset Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">SORT BY</h3>
            {hasActiveFilters && (
              <button
                onClick={reset}
                className="text-xs font-medium text-primary hover:text-primary/80"
              >
                Reset
              </button>
            )}
          </div>
            <div className="space-y-2">
              {SORT_OPTIONS.map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-secondary/30 dark:hover:bg-secondary/20">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sort === option.value}
                    onChange={(e) => setSort(e.target.value as never)}
                    className="h-4 w-4 accent-primary"
                  />
                  <Icon icon={option.icon} className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-foreground">{option.label}</span>
                </label>
              ))}
            </div>

          <div className="border-t border-gray-200 dark:border-gray-800" />

          {/* Quick Filters Section */}
          {/* <div>
            <h3 className="mb-2 text-xs font-bold text-foreground uppercase">QUICK FILTERS</h3>
            <div className="space-y-1.5">
              {QUICK_FILTERS.map((filter) => (
                <label key={filter.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-secondary/30 dark:hover:bg-secondary/20">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <Icon icon={filter.icon} className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-foreground">{filter.label}</span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="border-t border-gray-200 dark:border-gray-800" />

          {/* Dietary Preferences */}
          {/* <div>
            <h3 className="mb-2 text-xs font-bold text-foreground uppercase">DIETARY</h3>
            <div className="space-y-1.5">
              {DIETARY_FILTERS.map((filter) => (
                <label key={filter.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-secondary/30 dark:hover:bg-secondary/20">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <Icon icon={filter.icon} className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-foreground">{filter.label}</span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="border-t border-gray-200 dark:border-gray-800" />

          {/* Offers Section */}
          {/* <div>
            <h3 className="mb-2 text-xs font-bold text-foreground uppercase">OFFERS</h3>
            <div className="space-y-1.5">
              {OFFERS.map((offer) => (
                <label key={offer.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-secondary/30 dark:hover:bg-secondary/20">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <Icon icon={offer.icon} className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-foreground">{offer.label}</span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="border-t border-gray-200 dark:border-gray-800" />

          {/* Cuisines Section */}
          {/* <div>
            <h3 className="mb-2 text-xs font-bold text-foreground uppercase">CUISINES</h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <label
                  key={cat._id}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-secondary/30 dark:hover:bg-secondary/20"
                >
                  <input
                    type="checkbox"
                    checked={filters.category === cat.name}
                    onChange={() => setCategory(cat.name)}
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <span className="text-xs text-foreground">{cat.name}</span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="border-t border-gray-200 dark:border-gray-800" />

          {/* Price Range */}
          {/* <div>
            <h3 className="mb-2 text-xs font-bold text-foreground uppercase">PRICE RANGE</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded border border-gray-200 dark:border-gray-800 bg-background px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground dark:bg-background"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded border border-gray-200 dark:border-gray-800 bg-background px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground dark:bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Under ₹100", "₹100-300", "₹300-600", "Over ₹600"].map((range) => (
                  <label key={range} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-secondary/30 dark:hover:bg-secondary/20 text-xs">
                    <input type="checkbox" className="h-3 w-3 rounded accent-primary" />
                    <span className="text-foreground">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div> */}

          {/* Reset Button at Bottom */}
          {/* {hasActiveFilters && (
            <button
              onClick={reset}
              className="w-full rounded border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Icon icon="solar:restart-linear" className="h-4 w-4" />
              Reset Filters
            </button>
          )} */}
        </div>
      </div>
    </aside>
  );
}
