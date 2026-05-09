"use client";

import { useState } from "react";
import { FoodStatsHeaderLayout } from "@/modules/dashboard/admin/food/sections/FoodStatsHeader/FoodStatsHeaderLayout";
import { TopSellingFoodsLayout } from "@/modules/dashboard/admin/food/sections/TopSellingFoodsSection/TopSellingFoodsLayout";
import { AllFoodsLayout } from "@/modules/dashboard/admin/food/sections/AllFoodsSection/AllFoodsLayout";
import { AddFoodModal } from "@/modules/dashboard/admin/food/sections/AddFoodModal/AddFoodModal";

export function FoodHomeLayout() {
  const [addFoodOpen, setAddFoodOpen] = useState(false);

  return (
    <>
      <div className="space-y-8">
        {/* Stats Header */}
        <FoodStatsHeaderLayout />

        {/* Top Selling Foods */}
        <TopSellingFoodsLayout />

        {/* All Foods */}
        <AllFoodsLayout />
      </div>

      {/* Add Food Modal */}
      <AddFoodModal isOpen={addFoodOpen} onOpenChange={setAddFoodOpen} />
    </>
  );
}
