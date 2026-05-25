"use client";

import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { TFlattenedRow, TSearchSource } from "../types";

type Props = {
  row: TFlattenedRow;
  isActive: boolean;
  onSelect: (row: TFlattenedRow) => void;
  onHover: () => void;
};

const SOURCE_META: Record<TSearchSource, { label: string; icon: string }> = {
  blogs: { label: "Blog", icon: "solar:document-text-linear" },
  foods: { label: "Food", icon: "solar:dish-linear" },
  foodCategories: { label: "Category", icon: "solar:folder-linear" },
};

export function SearchResultRow(props: Props) {
  const { row, isActive, onSelect, onHover } = props;
  const meta = SOURCE_META[row?.source];

  if (!row?.id) return null;

  return (
    <button
      type="button"
      onClick={() => onSelect(row)}
      onMouseEnter={onHover}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
        isActive
          ? "bg-primary/5 ring-1 ring-primary/20"
          : "hover:bg-zinc-50 dark:hover:bg-white/[0.03]"
      }`}
    >
      <div className="relative h-14 w-14 flex-shrink-0">
        <BaseImage
          src={row?.image}
          alt={row?.title ?? ""}
          className="h-14 w-14 rounded-xl"
          imgClass="rounded-xl"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground truncate">
            {row?.title ?? "Untitled"}
          </p>
        </div>
        {row?.subtitle && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {row.subtitle}
          </p>
        )}
      </div>
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
        <Icon icon={meta?.icon ?? "solar:tag-linear"} className="h-3 w-3" />
        {meta?.label ?? "Item"}
      </span>
      <Icon
        icon="solar:alt-arrow-right-linear"
        className="h-4 w-4 text-muted-foreground/50 flex-shrink-0"
      />
    </button>
  );
}
