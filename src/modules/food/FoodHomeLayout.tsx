import { Container } from "@/components/layouts/Container";
import { FoodFilterProvider } from "@/modules/food/providers/FoodFilterProvider";
import { FoodHeroSection } from "@/modules/food/sections/food-list/FoodHeroSection";
import { FoodFiltersBar } from "@/modules/food/sections/food-list/FoodFiltersBar";
import { FoodGrid } from "@/modules/food/sections/food-list/FoodGrid";

export function FoodHomeLayout() {
  return (
    <FoodFilterProvider>
      <FoodHeroSection />
      <Container className="py-8">
        <div className="space-y-6">
          <FoodFiltersBar />
          <FoodGrid />
        </div>
      </Container>
    </FoodFilterProvider>
  );
}
