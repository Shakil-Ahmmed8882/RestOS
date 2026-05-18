"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
};

const STATUS_PILL: Record<string, string> = {
  available: "bg-emerald-500/10 text-emerald-500",
  unavailable: "bg-zinc-500/10 text-zinc-500",
  hidden: "bg-amber-500/10 text-amber-500",
};

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function FoodRow(props: Props) {
  const { food, onEdit, onDelete } = props;
  const name = food.foodName ?? food.name ?? "Untitled dish";
  const image = food?.foodImage ?? food.image;
  const category = food.foodCategory ?? food.category;
  const status = (food.status ?? "available").toLowerCase();
  const statusCls = STATUS_PILL[status] ?? STATUS_PILL.available;

  return (
    <div className="grid grid-cols-[1fr_90px_90px_120px_40px] sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_120px] gap-3 sm:gap-4 items-center px-3 sm:px-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-white/[0.02] hover:bg-zinc-100/70 dark:hover:bg-white/[0.04] transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-10 w-10 rounded-lg flex-shrink-0">
          <AvatarImage src={image} alt={name} className="object-cover object-top" />
          <AvatarFallback className="rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Icon
              icon="solar:dish-linear"
              className="h-4 w-4 text-muted-foreground"
            />
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {category ?? "—"}
          </p>
        </div>
      </div>

      <div className="hidden sm:block text-sm font-semibold text-foreground">
        ${(food.price ?? 0).toFixed(2)}
      </div>

      <div className="hidden sm:block text-sm text-muted-foreground">
        {food.orders ?? 0}
      </div>

      <div className="hidden sm:flex items-center gap-1 text-sm text-foreground">
        <Icon icon="solar:star-bold" className="h-3.5 w-3.5 text-amber-400" />
        {(food.averageRating ?? 0).toFixed(1)}
      </div>

      <div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusCls}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status === "available" ? "Live" : status}
        </span>
      </div>

      <div className="hidden sm:block text-xs text-muted-foreground">
        {timeAgo(food.updatedAt ?? food.createdAt)}
      </div>

      <div className="flex items-center justify-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
          onClick={() => onEdit(food)}
          title="Edit"
        >
          <Icon icon="solar:pen-2-linear" className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
          onClick={() => onDelete(food)}
          title="Delete"
        >
          <Icon
            icon="solar:trash-bin-trash-linear"
            className="h-4 w-4 text-red-500"
          />
        </Button>
      </div>
    </div>
  );
}
