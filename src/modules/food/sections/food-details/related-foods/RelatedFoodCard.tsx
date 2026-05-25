"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { BaseImage } from "@/components/common/BaseImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { useAuthGuard } from "@/modules/food/components/AuthGuard";
import type { FoodItem } from "@/modules/food/types/food.types";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop";

export function RelatedFoodCard({ food }: { food: FoodItem }) {
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuthGuard();

  const displayName = food.foodName || food.name || "Untitled";
  const displayImage = food?.foodImage || food.image || DEFAULT_IMAGE;
  const displayRating = food.averageRating || food.rating || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requireAuth()) return;
    dispatch(addToCart({
      id: food._id,
      name: food.foodName,
      price: food.price,
      image: food?.foodImage,
      quantity: 1,
    }));
    toast.success(`${food.foodName} added to cart`);
  };

  return (
    <Link href={`/food-details/${food._id}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-card">
        {/* Image */}
        <div className="relative block overflow-hidden rounded-2xl">
          <BaseImage
            src={displayImage}
            alt={displayName}
            fill
            containerClassName="h-40 w-full rounded-2xl"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 space-y-2">
            {food?.discountPercent && food.discountPercent > 0 && (
              <Badge variant="destructive" className="text-xs">
                {food.discountPercent}% OFF
              </Badge>
            )}
            {food?.isVeg && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 text-xs">
                <Icon icon="solar:leaf-linear" className="mr-1 h-3 w-3" />
                Veg
              </Badge>
            )}
            {food?.isSpicy && (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 text-xs">
                <Icon icon="solar:fire-linear" className="mr-1 h-3 w-3" />
              </Badge>
            )}
          </div>

        </div>

        {/* Content */}
        <div className="space-y-2 p-3">
          <div>
            <h3 className="truncate font-bold text-sm md:text-base">{displayName}</h3>
            <p className="text-xs text-muted-foreground">{food.foodCategory || "Uncategorized"}</p>
          </div>

          {/* Rating */}
          {displayRating > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Icon icon="solar:star-bold" className="h-3 w-3 text-yellow-500" />
              <span className="font-semibold">{displayRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({food.orders || 0})</span>
            </div>
          )}

          {/* Price + Add to Cart */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-baseline gap-2">
              <span className="font-bold">৳{food.price.toFixed(2)}</span>
              {food.discountPercent > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  ৳{(food.price / (1 - food.discountPercent / 100)).toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="h-8 px-3 bg-primary text-primary-foreground"
            >
              <Icon icon="solar:bag-3-linear" className="h-4 w-4" />
            </Button>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            {food.preparationTime && (
              <span className="flex items-center gap-1">
                <Icon icon="solar:clock-circle-linear" className="h-3 w-3" />
                {food.preparationTime}m
              </span>
            )}
            {food.quantity > 0 && (
              <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
