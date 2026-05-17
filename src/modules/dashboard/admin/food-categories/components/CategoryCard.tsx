"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import type { TFoodCategory } from "../types";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";

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
    <div className="group relative rounded-2xl bg-silk-with-hover overflow-hidden bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
      <div className="relative w-full h-[200px] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {category.image ? (
          <BaseImage
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Icon
              icon="solar:folder-with-files-linear"
              className="h-12 w-12 text-muted-foreground/40"
            />
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(category)}
            className="h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:bg-white dark:hover:bg-zinc-900"
            title="Edit category"
          >
            <Icon icon="solar:pen-2-linear" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category)}
            className="h-8 w-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:bg-red-50 dark:hover:bg-red-500/20"
            title="Delete category"
          >
            <Icon
              icon="solar:trash-bin-trash-linear"
              className="h-4 w-4 text-red-500"
            />
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
        <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground/80">
          <span className="inline-flex items-center gap-1">
            <Icon icon="solar:calendar-linear" className="h-3.5 w-3.5" />
            {formatDate(category.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
