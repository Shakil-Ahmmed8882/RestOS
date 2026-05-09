"use client";


import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { AuthInput } from "@/modules/auth/components/AuthInput";



const TABS = [
  { label: "Trending", icon: "solar:fire-linear", value: "trending" },
  { label: "Offers", icon: "solar:sale-linear", value: "offers" },
  { label: "Explore All", icon: "solar:magnifer-linear", value: "all" },
] as const;

export function FoodSearchBar() {
  const { filters, setSearch } = useFoodFilter();
  
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup" | "pandamart" | "shops">("delivery");

  
  return (
    <div className="dark:bg-background w-full pb-8">
      {/* Tabs and Search in Same Row */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="">
          <div className="flex items-center gap-8 w-full justify-end">
            {/* Tabs */}
            {/* <div className="flex items-center gap-8">
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
            </div> */}

            {/* Search Bar */}
            <div className="w-1/2 py-4 ">
              <div className="relative ">
                <Icon
                  icon="solar:magnifer-linear"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                />
                <AuthInput
                  value={filters.search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for restaurants, cuisines, and dishes"
                  className="border-gray-200 rounded-full dark:border-gray-800 bg-background pl-12 pr-4 py-2.5 text-sm focus-visible:ring-primary dark:bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
