"use client";

import { Container } from "@/components/layouts/Container";
import { FoodDetailsMain } from "@/modules/food/sections/food-details/FoodDetailsMain";
import { RelatedFoodsSection } from "@/modules/food/sections/food-details/related-foods/RelatedFoodsSection";

export function FoodDetailsHomeLayout({ id }: { id: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background">
      <Container className="py-10 space-y-16">
        <FoodDetailsMain id={id} />
        <RelatedFoodsSection id={id} />
      </Container>
    </div>
  );
}
