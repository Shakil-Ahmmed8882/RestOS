"use client";

import { useCallback } from "react";
import {
  FoodActionsProvider,
  FoodActionsModalLayout,
} from "@/modules/dashboard/admin/food/sections/FoodActionsModal";
import { useAdminFoods } from "./hooks/useAdminFoods";
import { FoodStatsSection } from "./sections/FoodStatsSection";
import { RevenueGrowthSection } from "./sections/RevenueGrowthSection";
import { FoodsGridSection } from "./sections/FoodsGridSection";
import { TopSellingStripSection } from "./sections/TopSellingStripSection";
import type { FoodCacheRow } from "@/redux/featureApi/optimistic/food";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

function asFoodItem(row: FoodCacheRow): FoodItem {
  return {
    _id: row?._id,
    foodName: row?.foodName,
    name: row?.name,
    foodImage: row?.foodImage,
    image: row?.image,
    foodCategory: row?.foodCategory,
    category: row?.category,
    price: row?.price ?? 0,
    quantity: row?.quantity,
    orders: row?.orders,
    preparationTime: row?.preparationTime,
    averageRating: row?.averageRating,
    description: row?.description,
    made_by: row?.made_by,
    food_origin: row?.food_origin,
    createdAt: row?.createdAt,
    updatedAt: row?.updatedAt,
  };
}

export function AllFoodsHomeLayout() {
  const foods = useAdminFoods();
  const { prependItem, replaceItem, removeItem } = foods;

  const onCreated = useCallback(
    (row: FoodCacheRow) => prependItem(asFoodItem(row)),
    [prependItem],
  );
  const onUpdated = useCallback(
    (row: FoodCacheRow) =>
      replaceItem((f) => f._id === row?._id, asFoodItem(row)),
    [replaceItem],
  );
  const onDeleted = useCallback(
    (id: string) => removeItem((f) => f._id === id),
    [removeItem],
  );

  return (
    <FoodActionsProvider mutators={{ onCreated, onUpdated, onDeleted }}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            All foods
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Menu, orders and revenue at a glance.
          </p>
        </div>

        <TopSellingStripSection />
        <FoodStatsSection foods={foods.items} />
        <RevenueGrowthSection foods={foods.items} />
        <FoodsGridSection foods={foods} />
      </div>
      <FoodActionsModalLayout />
    </FoodActionsProvider>
  );
}
