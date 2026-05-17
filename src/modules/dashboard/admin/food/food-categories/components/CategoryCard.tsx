"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { TFoodCategory } from "../types";

type Props = {
  category: TFoodCategory;
  onEdit: (c: TFoodCategory) => void;
  onDelete: (c: TFoodCategory) => void;
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CategoryCard(props: Props) {
  const { category, onEdit, onDelete } = props;

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
      <div className="relative w-full h-[200px] overflow-hidden">
        <BaseImage
          src={category.image}
          alt={category.name}
          className="h-full w-full"
          imgClass="transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
        />

        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(category)}
            className="h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:bg-primary/10 text-primary"
            title="Edit category"
          >
            <Icon icon="solar:pen-2-bold" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category)}
            className="h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:bg-primary/10 text-primary"
            title="Delete category"
          >
            <Icon icon="solar:trash-bin-trash-bold" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {category.description}
          </p>
        )}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
          <span className="inline-flex items-center gap-1">
            <Icon icon="solar:calendar-linear" className="h-3.5 w-3.5" />
            {formatDate(category.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
