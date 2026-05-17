"use client";

import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  food: FoodItem;
  rank?: number;
  onClick?: (food: FoodItem) => void;
};

export function TopSellingCard(props: Props) {
  const { food, rank, onClick } = props;
  const name = food.foodName ?? food.name ?? "Untitled dish";
  const image = food.foodImage ?? food.image;
  const category = food.foodCategory ?? food.category;
  const rating = food.averageRating ?? 0;
  const orders = food.orders ?? 0;
  const price = food.price ?? 0;

  return (
    <button
      type="button"
      onClick={() => onClick?.(food)}
      className="group relative shrink-0 w-[220px] sm:w-[240px] rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden text-left transition-all hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
    >
      <div className="relative h-[140px] overflow-hidden">
        <BaseImage
          src={image}
          alt={name}
          className="h-full w-full"
          imgClass="transition-transform duration-300 group-hover:scale-105"
          sizes="240px"
        />

        {typeof rank === "number" && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wide !text-white">
            <Icon icon="solar:crown-bold" className="h-3 w-3 !text-white" />
            <span className="!text-white">#{rank}</span>
          </span>
        )}
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-2 py-0.5 text-[10px] font-semibold !text-white">
          <Icon icon="solar:star-bold" className="h-3 w-3 text-amber-300" />
          {rating.toFixed(1)}
        </span>
      </div>

      <div className="p-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground line-clamp-1">
            {name}
          </p>
          <p className="text-sm font-bold text-primary whitespace-nowrap">
            ${price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="line-clamp-1">{category ?? "—"}</span>
          <span className="inline-flex items-center gap-1">
            <Icon icon="solar:bag-3-linear" className="h-3 w-3" />
            {orders}
          </span>
        </div>
      </div>
    </button>
  );
}
