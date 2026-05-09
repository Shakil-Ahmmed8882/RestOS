import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodSearchBar } from "@/modules/food/sections/food-list/FoodSearchBar";
import { FoodSidebar } from "@/modules/food/sections/food-list/FoodSidebar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";
import { FoodPromoSection } from "@/modules/food/sections/FoodPromoSection";

export function FoodHomeLayout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground dark:bg-background scrollbar-thin">
        <FoodFilterProvider>
          <FoodSearchBar />
          <div className="">
            <div className="flex gap-4 items-start">
              <div className="w-72 flex-shrink-0 sticky top-[120px] self-start z-40">
                <FoodSidebar />
              </div>
              <div className="flex-1 min-w-0">
                <div className="space-y-6 py-6">
                  <FoodPromoSection />
                  <FoodGrid />
                </div>
              </div>
            </div>
          </div>
        </FoodFilterProvider>
      </div>
    </ErrorBoundary>
  );
}
