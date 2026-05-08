"use client";

import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { FoodCard } from "@/modules/food/sections/food-list/FoodCard";
import { FoodGridSkeleton } from "@/modules/food/placeholder/FoodGridSkeleton";
import { useFoods } from "@/modules/food/hooks/useFoods";
import type { FoodItem } from "@/modules/food/types/food.types";

export function FoodGrid() {
  const { data, isLoading } = useFoods();
  const items = (data?.data as FoodItem[]) ?? [];

  return (
    <CustomSuspense isLoading={isLoading} fallback={<FoodGridSkeleton />}>
      <NoResultFoundWrapper data={items} title="No dishes match your filters" description="Try changing the search or category.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      </NoResultFoundWrapper>
    </CustomSuspense>
  );
}
