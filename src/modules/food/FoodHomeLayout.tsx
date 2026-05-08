import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodSearchBar } from "@/modules/food/sections/food-list/FoodSearchBar";
import { FoodSidebar } from "@/modules/food/sections/food-list/FoodSidebar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";
import { FoodPromoSection } from "@/modules/food/sections/FoodPromoSection";

export function FoodHomeLayout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground dark:bg-background">
        <FoodFilterProvider>
          <FoodSearchBar />
          <div className=" ">
            <div className="flex gap-4 -mx-4 sm:-mx-6 lg:-mx-8 items-start">
              <div className="w-72 flex-shrink-0  sticky top-14 self-start">
                <FoodSidebar />
              </div>
              <div className="flex-1 ">
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
