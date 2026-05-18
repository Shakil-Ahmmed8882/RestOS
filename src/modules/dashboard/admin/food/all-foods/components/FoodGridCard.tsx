"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  food: FoodItem | null | undefined;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
};

/**
 * Small visual food card.
 *
 * - Image is the dominant element (h-44).
 * - Hover reveals two floating icon buttons (edit + delete) over the image
 *   so the card body stays clean.
 * - Click anywhere on the body navigates to /food-details/{_id}.
 * - Both action icons use `primary` color tokens — no red, per project
 *   visual rule that destructive UI uses primary tint, not a separate hue.
 */
export function FoodGridCard(props: Props) {
  const { food, onEdit, onDelete } = props;
  const router = useRouter();

  if (!food) return null;

  const name = food?.foodName ?? food?.name ?? "Untitled dish";
  const image = food?.foodImage ?? food?.image;
  const category = food?.foodCategory ?? food?.category;
  const description = food?.description;
  const price = food?.price ?? 0;
  const rating = food?.averageRating ?? 0;
  const orders = food?.orders ?? 0;

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
      {/* Image block */}
      <button
        type="button"
        onClick={() => router.push(`/food-details/${food?._id}`)}
        className="relative block w-full h-44 overflow-hidden text-left"
      >
        <BaseImage
          src={image}
          alt={name}
          className="h-full w-full"
          imgClass="transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {/* Rating chip top-left */}
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-white">
          <Icon icon="solar:star-bold" className="h-3 w-3 text-amber-300" />
          {rating.toFixed(1)}
        </span>
      </button>

      {/* Floating action icons — top-right of image, primary-tinted */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(food);
          }}
          title="Edit"
          className="h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:bg-primary/10 text-primary"
        >
          <Icon icon="solar:pen-2-bold" className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(food);
          }}
          title="Delete"
          className="h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:bg-primary/10 text-primary"
        >
          <Icon icon="solar:trash-bin-trash-bold" className="h-4 w-4" />
        </Button>
      </div>

      {/* Body */}
      <button
        type="button"
        onClick={() => router.push(`/food-details/${food?._id}`)}
        className="block w-full p-4 space-y-2 text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1">
            {name}
          </h3>
          <span className="text-sm font-bold text-primary whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 pt-1">
          <span className="line-clamp-1">{category ?? "—"}</span>
          <span className="inline-flex items-center gap-1">
            <Icon icon="solar:bag-3-linear" className="h-3 w-3" />
            {orders}
          </span>
        </div>
      </button>
    </div>
  );
}
