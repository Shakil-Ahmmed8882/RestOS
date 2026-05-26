"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/common/BaseImage";
import { SaveButton } from "@/modules/saves";
import type { FoodItem } from "@/modules/food/types/food.types";

const DEFAULT_FOOD_IMAGE =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop";

export function FoodCard({ food }: { food: FoodItem }) {
  if (!food) return null;

  const displayName = food?.name || food?.foodName || "Untitled Dish";
  const displayImage = food?.image || food?.foodImage || DEFAULT_FOOD_IMAGE;
  const displayRating = Number(food?.averageRating ?? food?.rating ?? 0);
  const orders = food?.orders;
  const category = food?.category || food?.foodCategory;
  const prepTime = food?.preparationTime;
  const price = food?.price ?? 0;
  const discountPercent = food?.discountPercent ?? 0;
  const discountedPrice =
    discountPercent > 0
      ? Math.round(price - (price * discountPercent) / 100)
      : price;
  const detailHref = `/food-details/${food?._id ?? ""}`;

  return (
    <div className="group relative">
      <Link
        href={detailHref}
        aria-label={displayName}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />

      <div className="relative flex flex-col gap-3">
        <div className="relative overflow-hidden rounded-3xl">
          <BaseImage
            src={displayImage}
            alt={displayName}
            fill
            containerClassName="h-40 w-full rounded-3xl"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {discountPercent > 0 && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
              <Icon icon="solar:tag-price-bold" className="h-3 w-3" />
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4 z-20">
          <SaveButton type="food" itemId={food?._id ?? ""} variant="icon" size="md" />
        </div>

        <div className="flex flex-col px-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {displayName}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-bold text-foreground">
                {displayRating.toFixed(1)}
              </span>
              {typeof orders === "number" && (
                <span className="text-xs text-muted-foreground">({orders})</span>
              )}
            </div>
          </div>

          {/* Meta row — only renders fields the server actually returned */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {typeof prepTime === "number" && prepTime > 0 && (
              <span className="inline-flex items-center gap-1">
                <Icon icon="solar:clock-circle-linear" className="h-3.5 w-3.5" />
                {prepTime} min
              </span>
            )}
            {category && (
              <>
                {typeof prepTime === "number" && prepTime > 0 && <span>•</span>}
                <span className="inline-flex items-center gap-1">
                  <Icon icon="solar:hamburger-menu-linear" className="h-3.5 w-3.5" />
                  {category}
                </span>
              </>
            )}
            {food?.isVeg && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-500">
                  <Icon icon="solar:leaf-bold" className="h-3.5 w-3.5" />
                  Veg
                </span>
              </>
            )}
          </div>

          {/* Price — dynamic. Shows discounted + struck-through original when applicable */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              ৳{discountedPrice}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                ৳{price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
