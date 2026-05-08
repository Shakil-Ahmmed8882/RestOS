import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodSearchBar } from "@/modules/food/sections/food-list/FoodSearchBar";
import { FoodSidebar } from "@/modules/food/sections/food-list/FoodSidebar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";
import { FoodPagination } from "@/modules/food/sections/food-list/FoodPagination";

export function FoodHomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FoodFilterProvider>
        <FoodSearchBar />
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-6">
            <FoodSidebar />
            <div className="flex-1">
              <div className="space-y-8 p-6">
                <FoodGrid />
                <FoodPagination />
              </div>
            </div>
          </div>
        </div>
      </FoodFilterProvider>
    </div>
  );
}
