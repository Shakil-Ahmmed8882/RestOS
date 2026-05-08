"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Input } from "@/components/ui/input";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";

export function FoodSearchBar() {
  const { filters, setSearch } = useFoodFilter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchRef.current) return;
    gsap.from(searchRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={searchRef} className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for restaurants, cuisines, and dishes"
            className="border-gray-200 pl-12 pr-4 py-3 text-base focus-visible:ring-pink-500"
          />
        </div>
      </div>
    </div>
  );
}
