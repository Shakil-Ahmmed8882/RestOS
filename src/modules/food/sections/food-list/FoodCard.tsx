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
  const [isFavorite, setIsFavorite] = useState(false);
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

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const discountedPrice = food.discountPercent
    ? displayPrice * (1 - (food.discountPercent || 0) / 100)
    : displayPrice;

  return (
    <div className="rounded-lg border border-gray-200 bg-white group overflow-hidden transition-all duration-300 ">
      <Link href={`/food-details/${food._id}`} className="block overflow-hidden">
        <div
          className="relative aspect-square w-full bg-gray-100"
        >
          <BaseImage
            src={displayImage ?? null}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            containerClassName="h-full w-full"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${!displayImage ? "p-4" : ""}`}
          />

          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Icon icon="solar:eye-bold" className="h-8 w-8 text-white" />
                <span className="text-xs font-semibold text-white">View Details</span>
              </div>
            </div>
          )}

          {food.discountPercent ? (
            <div className="absolute left-2 top-2 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
              ₹{Math.round(displayPrice * (food.discountPercent / 100))} off
            </div>
          ) : null}

          <button
            onClick={handleFavorite}
            className="absolute right-2 top-2 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors"
          >
            <Icon
              icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
              className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>
      </Link>

      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{displayName}</h3>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Icon icon="solar:star-bold" className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-xs font-semibold text-gray-700">{displayRating.toFixed(1)}</span>
            {food.orders && food.orders > 100 && (
              <span className="text-xs text-gray-500">({Math.floor(food.orders / 100)}00+)</span>
            )}
          </div>
          {food.preparationTime && (
            <span className="text-xs text-gray-500">{food.preparationTime}m</span>
          )}
        </div>

        <div className="mt-2 space-y-1">
          {food.discountPercent ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-gray-400 line-through">₹{displayPrice.toFixed(0)}</span>
              <span className="text-base font-bold text-gray-900">₹{discountedPrice.toFixed(0)}</span>
            </div>
          ) : (
            <span className="text-base font-bold text-gray-900">₹{displayPrice.toFixed(0)}</span>
          )}
        </div>

        {food.isVeg && (
          <div className="mt-2 flex items-center gap-1">
            <div className="h-2 w-2 border-2 border-green-600" />
            <span className="text-xs text-green-600 font-medium">Veg</span>
          </div>
        )}
      </div>
    </div>
  );
}
