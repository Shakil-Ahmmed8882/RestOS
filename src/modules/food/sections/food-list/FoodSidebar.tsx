"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
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
  const { filters, setSort, setCategory, reset, setRating, setVegetarian } = useFoodFilter();
  const { data } = useGetAllFoodsCategoriesQuery(undefined);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"all" | "filters">("all");
  const categories = (data?.data as { _id: string; name: string }[]) ?? [];

  const hasActiveFilters = filters.search || filters.category !== "all" || filters.sort !== "newest";

  return (
    <aside
      ref={sidebarRef}
      className="w-72 flex-shrink-0 border-r border-gray-200 bg-white"
    >
      <div className="h-screen overflow-y-auto scrollbar-hidden p-4">
        <div className="space-y-4">
          {/* Sort Section Header with Reset Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">SORT BY</h3>
            {hasActiveFilters && (
              <button
                onClick={reset}
                className="text-xs text-pink-600 hover:text-pink-700 font-medium"
              >
                Reset
              </button>
            )}
          </div>
            <div className="space-y-2">
              {SORT_OPTIONS.map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sort === option.value}
                    onChange={(e) => setSort(e.target.value as never)}
                    className="h-4 w-4 accent-pink-500"
                  />
                  <Icon icon={option.icon} className="h-3.5 w-3.5 text-gray-600" />
                  <span className="text-xs text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>

          <div className="border-t border-gray-200" />

          {/* Quick Filters Section */}
          <div>
            <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase">QUICK FILTERS</h3>
            <div className="space-y-1.5">
              {QUICK_FILTERS.map((filter) => (
                <label key={filter.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-pink-500"
                  />
                  <Icon icon={filter.icon} className="h-3.5 w-3.5 text-gray-600" />
                  <span className="text-xs text-gray-700">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Dietary Preferences */}
          <div>
            <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase">DIETARY</h3>
            <div className="space-y-1.5">
              {DIETARY_FILTERS.map((filter) => (
                <label key={filter.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-pink-500"
                  />
                  <Icon icon={filter.icon} className="h-3.5 w-3.5 text-gray-600" />
                  <span className="text-xs text-gray-700">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Offers Section */}
          <div>
            <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase">OFFERS</h3>
            <div className="space-y-1.5">
              {OFFERS.map((offer) => (
                <label key={offer.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-pink-500"
                  />
                  <Icon icon={offer.icon} className="h-3.5 w-3.5 text-gray-600" />
                  <span className="text-xs text-gray-700">{offer.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Cuisines Section */}
          <div>
            <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase">CUISINES</h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <label
                  key={cat._id}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={filters.category === cat.name}
                    onChange={() => setCategory(cat.name)}
                    className="h-4 w-4 rounded accent-pink-500"
                  />
                  <span className="text-xs text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Price Range */}
          <div>
            <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase">PRICE RANGE</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-xs"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Under ₹100", "₹100-300", "₹300-600", "Over ₹600"].map((range) => (
                  <label key={range} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-50 text-xs">
                    <input type="checkbox" className="h-3 w-3 rounded accent-pink-500" />
                    <span className="text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button at Bottom */}
          {hasActiveFilters && (
            <button
              onClick={reset}
              className="w-full rounded border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Icon icon="solar:restart-linear" className="h-4 w-4" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
