"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useGetTopSellingFoodsQuery } from "@/redux/featureApi/foodApi";
import { FoodCard } from "./sections/FoodCard";
import { FoodGridSkeleton } from "@/modules/dashboard/admin/food/loading/placeholder/FoodGridSkeleton";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

export function TopSellingFoodsLayout() {
  const router = useRouter();
  const { data, isLoading } = useGetTopSellingFoodsQuery();

  const topFoods: FoodItem[] = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Top Selling Foods</h3>
        <FoodGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Top Selling Foods</h3>
        {topFoods.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/dashboard/foods")}
          >
            View All
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {topFoods.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900/50 rounded-xl p-8 text-center">
          <Icon icon="solar:bag-linear" className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground">No foods available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFoods.slice(0, 6).map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              onViewDetails={() => router.push(`/admin/dashboard/foods/${food._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
