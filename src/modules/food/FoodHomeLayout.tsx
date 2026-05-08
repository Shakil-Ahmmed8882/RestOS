import { Container } from "@/components/layouts/Container";
import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodHeroSection } from "@/modules/food/sections/food-list/FoodHeroSection";
import { FoodFiltersBar } from "@/modules/food/sections/food-list/FoodFiltersBar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";
import { FoodPagination } from "@/modules/food/sections/food-list/FoodPagination";

export function FoodHomeLayout() {
  return (
    <div className="overflow-hidden">
      <FoodFilterProvider>
        <FoodHeroSection />
        <Container className="py-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <FoodFiltersBar />
              <FoodGrid />
            </div>
            <FoodPagination />
          </div>
        </Container>
      </FoodFilterProvider>
    </div>
  );
}
