"use client";

import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { CardSkeletonV2List } from "@/components/rest-os-ui/placeholder/skeletons/CardSkeletons";
import { useGetSingleFoodQuery, useGetTopSellingFoodsQuery } from "@/redux/featureApi/foodApi";
import { RelatedFoodCard } from "./RelatedFoodCard";

export function RelatedFoodsSection({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleFoodQuery(id);
  const { data: topSellingData, isLoading: topSellingLoading } = useGetTopSellingFoodsQuery();

  const { foods, title } = useMemo(() => {
    const relatedFoods = data?.relatedFoods || [];
    const topSelling = topSellingData?.data || [];

    if (relatedFoods.length > 0) {
      return {
        foods: relatedFoods,
        title: data?.message || "Related Foods",
      };
    }

    if (topSelling.length > 0) {
      return {
        foods: topSelling,
        title: "Top Selling Foods",
      };
    }

    return {
      foods: [],
      title: "Recommended Foods",
    };
  }, [data?.relatedFoods, data?.message, topSellingData?.data]);

  const renderSkeleton = () => (
    <div className="space-y-6">
      <div className="h-8 w-1/4 bg-gray-100 dark:bg-[#171515] rounded-md animate-pulse" />
      <CardSkeletonV2List count={8} className="lg:grid-cols-4" />
    </div>
  );

  const isLoading_ = isLoading || topSellingLoading;

  return (
    <div className="space-y-6">
      <CustomSuspense isLoading={isLoading_} fallback={renderSkeleton()}>
        {foods && foods.length > 0 ? (
          <>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {foods.map((food) => (
                <RelatedFoodCard key={food._id} food={food} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-muted p-8 text-center">
            <Icon icon="solar:sad-smile-linear" className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-lg font-semibold text-muted-foreground">No foods available</p>
            <p className="text-sm text-muted-foreground mt-1">Come back later for more delicious options!</p>
          </div>
        )}
      </CustomSuspense>
    </div>
  );
}
