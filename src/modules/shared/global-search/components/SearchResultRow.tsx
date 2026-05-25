"use client";

import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { TFlattenedRow, TSearchSource } from "../types";

type Props = {
  row: TFlattenedRow;
  isActive?: boolean;
  onSelect: (row: TFlattenedRow) => void;
  onHover?: () => void;
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
      className={`group w-full text-left rounded-2xl overflow-hidden transition-all bg-silk-with-hover ${
        isActive ? "ring-1 ring-primary/40" : ""
      }`}
    >
      <div className="relative w-full aspect-[16/10]">
        <BaseImage
          src={row?.image}
          alt={row?.title ?? ""}
          className="absolute inset-0 h-full w-full"
          imgClass="object-cover"
        />
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-sm">
          <Icon icon={meta?.icon ?? "solar:tag-linear"} className="h-3 w-3" />
          {meta?.label ?? "Item"}
        </span>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-foreground line-clamp-1">
          {row?.title ?? "Untitled"}
        </p>
        {row?.subtitle && (
          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
            {row.subtitle}
          </p>
        )}
      </div>
    </button>
  );
}
