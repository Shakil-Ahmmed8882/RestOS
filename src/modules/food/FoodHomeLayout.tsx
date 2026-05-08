import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodSearchBar } from "@/modules/food/sections/food-list/FoodSearchBar";
import { FoodSidebar } from "@/modules/food/sections/food-list/FoodSidebar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";

export function FoodHomeLayout() {
  return (
    <div className="min-h-screen ">
      <FoodFilterProvider>
        <FoodSearchBar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 -mx-4 sm:-mx-6 lg:-mx-8 items-start">
            <div className="w-72 flex-shrink-0 px-4 sm:px-6 lg:px-8 sticky top-0 self-start">
              <FoodSidebar />
            </div>
            <div className="flex-1 px-4 sm:px-6 lg:px-8">
              <div className="space-y-6 py-6">
                <FoodGrid />
              </div>
            </div>
          </div>
        </div>
      </FoodFilterProvider>
    </div>
  );
}
