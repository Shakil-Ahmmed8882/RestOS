"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import type { FoodItem } from "@/modules/food/types/food.types";

export function FoodCard({ food }: { food: FoodItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useAppDispatch();

  const displayName = food.name || food.foodName || "Untitled Dish";
  const displayImage = food.image || food.foodImage;
  const displayPrice = food.price || 0;
  const displayRating = food.averageRating || food.rating || 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      dispatch(addToCart({ id: food._id, name: displayName, price: displayPrice, image: displayImage }));
      toast.success(`Added ${displayName} to cart`);
    } finally {
      setIsAdding(false);
    }
  };

  const discountedPrice = food.discountPercent
    ? displayPrice * (1 - (food.discountPercent || 0) / 100)
    : displayPrice;

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link href={`/food-details/${food._id}`} className="block overflow-hidden">
        <div
          className="relative aspect-[3/4] w-full bg-muted"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BaseImage
            src={displayImage ?? null}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            containerClassName="h-full w-full"
            className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Icon icon="solar:eye-bold" className="h-8 w-8 text-white" />
                <span className="text-sm font-semibold text-white">View Details</span>
              </div>
            </div>
          )}

          {food.discountPercent ? (
            <Badge className="absolute right-2 top-2 bg-red-500 text-white hover:bg-red-600">
              -{food.discountPercent}%
            </Badge>
          ) : null}

          {food.isVeg && (
            <Badge className="absolute left-2 top-2 bg-green-600 text-white hover:bg-green-700">
              <Icon icon="solar:leaf-bold" className="mr-1 h-3 w-3" /> Veg
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-2 font-bold tracking-tight">{displayName}</h3>
          {food.description ? (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{food.description}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {food.isVeg && (
            <Badge variant="outline" className="gap-1 border-green-500/30 bg-green-500/10 text-xs">
              <Icon icon="solar:leaf-2-bold" className="h-3 w-3 text-green-600" />
              Vegetarian
            </Badge>
          )}
          {food.preparationTime ? (
            <Badge variant="outline" className="gap-1 border-blue-500/30 bg-blue-500/10 text-xs">
              <Icon icon="solar:clock-circle-linear" className="h-3 w-3 text-blue-600" />
              {food.preparationTime}m
            </Badge>
          ) : null}
          {food.orders && food.orders > 100 ? (
            <Badge variant="outline" className="gap-1 border-orange-500/30 bg-orange-500/10 text-xs">
              <Icon icon="solar:fire-bold" className="h-3 w-3 text-orange-600" />
              {Math.floor(food.orders / 100)}00+ orders
            </Badge>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {displayRating > 0 ? (
              <div className="flex items-center gap-1">
                <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold">{displayRating.toFixed(1)}</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">No ratings</span>
            )}
          </div>
        </div>

        <div className="mt-auto space-y-2 border-t pt-3">
          <div className="flex items-baseline justify-between">
            {food.discountPercent ? (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-xl font-bold text-red-600">
                  ${discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">${displayPrice.toFixed(2)}</span>
            )}
          </div>

          <Button
            onClick={handleAdd}
            disabled={isAdding}
            className="w-full gap-2"
            size="sm"
          >
            <Icon
              icon={isAdding ? "solar:hourglass-linear" : "solar:add-circle-linear"}
              className="h-4 w-4"
            />
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
