"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetSingleFoodQuery, useDeleteFoodMutation } from "@/redux/featureApi/foodApi";
import { AddReviewForm } from "./sections/AddReviewForm";
import { ReviewsList } from "./sections/ReviewsList";
import { RelatedFoodsGrid } from "./sections/RelatedFoodsGrid";
import { toast } from "sonner";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import type { FoodDetailResponse, FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  foodId: string;
};

function FoodDetailSkeleton() {
  return (
    <div className="space-y-8">
      <BaseSkeleton className="h-9 w-20 rounded-md" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BaseSkeleton className="h-80 w-full rounded-xl" />
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <BaseSkeleton className="h-8 w-2/3" />
                <BaseSkeleton className="h-4 w-1/3" />
              </div>
              <div className="text-right space-y-2">
                <BaseSkeleton className="h-8 w-20" />
                <BaseSkeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
            <BaseSkeleton className="h-4 w-3/4" />
            <BaseSkeleton className="h-4 w-2/3" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <BaseSkeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <BaseSkeleton className="h-11 w-full rounded-md" />
          <BaseSkeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function FoodDetailLayout(props: Props) {
  const { foodId } = props;
  const { data, isLoading, isError, refetch } = useGetSingleFoodQuery(foodId);
  return (
    <DataBoundary
      isLoading={isLoading}
      isError={isError}
      onReset={() => refetch()}
      skeleton={<FoodDetailSkeleton />}
    >
      <FoodDetailContent foodId={foodId} data={data} />
    </DataBoundary>
  );
}

function FoodDetailContent({
  foodId,
  data,
}: {
  foodId: string;
  data: unknown;
}) {
  const router = useRouter();
  const [deleteFood, { isLoading: deleting }] = useDeleteFoodMutation();

  const foodDetail = data as FoodDetailResponse | undefined;
  const food = foodDetail?.food;
  const relatedFoods = foodDetail?.relatedFoods ?? [];
  const reviews = food?.reviews ?? [];

  if (!food) {
    return (
      <div className="text-center py-12">
        <Icon icon="solar:bag-linear" className="h-16 w-16 mx-auto mb-3 opacity-40" />
        <p className="text-muted-foreground">Food not found</p>
      </div>
    );
  }

  const handleDelete = async () => {
    const ok = window.confirm("Delete this food item?");
    if (!ok) return;

    try {
      await deleteFood(foodId).unwrap();
      toast.success("Food deleted successfully");
      router.push("/admin/dashboard/foods");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete food");
    }
  };

  const foodName = food.foodName || food.name;
  const foodImage = food?.foodImage || food.image;
  const rating = food.averageRating || food.rating || 0;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2"
      >
        <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
        Back
      </Button>

      {/* Food Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image and Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl overflow-hidden h-80">
            {foodImage ? (
              <img src={foodImage} alt={foodName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon icon="solar:image-broken-linear" className="h-16 w-16 opacity-30" />
              </div>
            )}
          </div>

          {/* Food Name and Meta */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{foodName}</h1>
                <p className="text-muted-foreground mt-1">{food.foodCategory || food.category}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${food.price?.toFixed(2)}</div>
                <Badge variant={food.isAvailable === false ? "destructive" : "default"}>
                  {food.isAvailable === false ? "Unavailable" : "Available"}
                </Badge>
              </div>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Icon icon="solar:star-bold" className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
              <div className="text-muted-foreground">
                {food.orders || 0} orders
              </div>
            </div>

            {/* Description */}
            {food.description && (
              <div className="pt-4">
                <p className="text-muted-foreground">{food.description}</p>
              </div>
            )}

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {food.preparationTime && (
                <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Prep Time</p>
                  <p className="font-semibold">{food.preparationTime} min</p>
                </div>
              )}
              {food.cuisine && (
                <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Cuisine</p>
                  <p className="font-semibold">{food.cuisine}</p>
                </div>
              )}
              {food.isVeg !== undefined && (
                <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold">{food.isVeg ? "Vegetarian" : "Non-Veg"}</p>
                </div>
              )}
              {food.isSpicy !== undefined && (
                <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Spice Level</p>
                  <p className="font-semibold">{food.isSpicy ? "Spicy" : "Mild"}</p>
                </div>
              )}
            </div>

            {/* Tags */}
            {food.tags && food.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap pt-4">
                {food.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={() => router.push(`/admin/dashboard/foods/${foodId}/edit`)}
          >
            <Icon icon="solar:pen-2-linear" className="h-4 w-4 mr-2" />
            Edit Food
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            size="lg"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 mr-2" />
            Delete Food
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6 border-t pt-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <p className="text-muted-foreground">Customer feedback</p>
        </div>

        <AddReviewForm foodId={foodId} />

        {reviews.length > 0 ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-zinc-900/30 rounded-xl">
            <p className="text-muted-foreground">No reviews yet</p>
          </div>
        )}
      </div>

      {/* Related Foods */}
      {relatedFoods.length > 0 && (
        <div className="space-y-6 border-t pt-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Related Foods</h2>
            <p className="text-muted-foreground">{foodDetail?.message}</p>
          </div>
          <RelatedFoodsGrid foods={relatedFoods} />
        </div>
      )}
    </div>
  );
}
