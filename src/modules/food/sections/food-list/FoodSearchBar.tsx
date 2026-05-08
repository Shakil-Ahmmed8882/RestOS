"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Input } from "@/components/ui/input";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";

const TABS = [
  { label: "Delivery", icon: "solar:delivery-linear", value: "delivery" },
  { label: "Pick-up", icon: "solar:running-2-linear", value: "pickup" },
  { label: "pandamart", icon: "solar:bag-2-linear", value: "pandamart" },
  { label: "Shops", icon: "solar:shop-2-linear", value: "shops" },
] as const;

export function FoodSearchBar() {
  const { filters, setSearch } = useFoodFilter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup" | "pandamart" | "shops">("delivery");

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
    <div ref={searchRef} className="sticky top-0 z-50 bg-background dark:bg-background">
      {/* Tabs and Search in Same Row */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="">
          <div className="flex items-center gap-8">
            {/* Tabs */}
            <div className="flex items-center gap-8">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-2 px-2 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab.value
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon icon={tab.icon} className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Icon
                  icon="solar:magnifer-linear"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  value={filters.search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for restaurants, cuisines, and dishes"
                  className="border-gray-200 dark:border-gray-800 bg-background pl-12 pr-4 py-2.5 text-sm focus-visible:ring-primary dark:bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
