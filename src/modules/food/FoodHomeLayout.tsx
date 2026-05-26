"use client";

import { useState } from "react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodSearchBar } from "@/modules/food/sections/food-list/FoodSearchBar";
import {
  FoodSidebar,
  FoodSidebarContent,
} from "@/modules/food/sections/food-list/FoodSidebar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";
import { FoodBlogCtaSection } from "@/modules/food/sections/FoodBlogCtaSection";
import { SideDrawer } from "@/components/rest-os-ui/drawer/SideDrawer";

export function FoodHomeLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground dark:bg-background scrollbar-thin">
        <FoodFilterProvider>
          <FoodSearchBar
            showFilterTrigger
            onOpenFilters={() => setDrawerOpen(true)}
          />

          <div className="flex gap-6 items-start pb-12">
            {/* Desktop sidebar — only at lg and up */}
            <div className="hidden lg:block sticky top-32 self-start z-20">
              <FoodSidebar />
            </div>

            <div className="flex-1 min-w-0">
              <div className="space-y-6 py-4 sm:py-6">
                <FoodBlogCtaSection />
                <FoodGrid />
              </div>
            </div>
          </div>

          {/* Mobile / tablet filter drawer */}
          <SideDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            title="Filters"
            description="Refine your food results"
            side="left"
            widthClass="max-w-sm"
          >
            <FoodSidebarContent onApply={() => setDrawerOpen(false)} />
          </SideDrawer>
        </FoodFilterProvider>
      </div>
    </ErrorBoundary>
  );
}
