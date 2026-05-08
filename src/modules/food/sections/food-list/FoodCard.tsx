"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/common/BaseImage";
import type { FoodItem } from "@/modules/food/types/food.types";

const DEFAULT_FOOD_IMAGE = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop";

export function FoodCard({ food }: { food: FoodItem }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const displayName = food.name || food.foodName || "Untitled Dish";
  const displayImage = food.image || food.foodImage || DEFAULT_FOOD_IMAGE;
  const displayRating = food.averageRating || food.rating || 0;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="group relative flex flex-col gap-3">
      {/* Image Container */}
      <Link href={`/food-details/${food._id}`} className="relative block overflow-hidden rounded-3xl">
        <BaseImage
          src={displayImage}
          alt={displayName}
          fill
          containerClassName="h-40 w-full rounded-3xl"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-90"
        >
          <Icon
            icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
            className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-gray-900"}`}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-col px-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-xl font-bold text-gray-900">
            {displayName} — <span className="font-medium text-gray-700">{food.location ?? "Gulshan"}</span>
          </h3>
          <div className="flex items-center gap-1">
            <Icon icon="solar:star-bold" className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-bold text-gray-800">{displayRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({food.orders ?? '2000+'})</span>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <span>{food.preparationTime || "35-55"} min</span>
          <span>•</span>
          <span className="flex text-lg leading-none">৳৳৳</span>
          <span>•</span>
          <span>{food.category || "Chinese"}</span>
        </div>

        {/* Promo Badges */}
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-pink-600">
             <Icon icon="solar:delivery-bold" className="h-4 w-4" />
             <span className="line-through text-gray-400">Tk 51</span>
             <span>Free for first order</span>
          </div>
          
          <div className="w-fit rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
            <Icon icon="solar:ticket-bold" className="mr-1 inline h-3 w-3" />
            Tk. 150 off Tk. 600: ...
          </div>
        </div>
      </div>
    </div>
  );
}