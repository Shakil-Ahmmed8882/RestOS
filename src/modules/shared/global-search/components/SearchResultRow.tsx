"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TFlattenedRow, TSearchSource } from "../types";

type Props = {
  row: TFlattenedRow;
  isActive: boolean;
  onSelect: (row: TFlattenedRow) => void;
  onHover: () => void;
};

const SOURCE_META: Record<
  TSearchSource,
  { label: string; icon: string; chip: string }
> = {
  blogs: {
    label: "Blog",
    icon: "solar:document-text-linear",
    chip: "bg-violet-500/10 text-violet-500",
  },
  foods: {
    label: "Food",
    icon: "solar:dish-linear",
    chip: "bg-amber-500/10 text-amber-500",
  },
  foodCategories: {
    label: "Category",
    icon: "solar:folder-linear",
    chip: "bg-sky-500/10 text-sky-500",
  },
};

export function SearchResultRow(props: Props) {
  const { row, isActive, onSelect, onHover } = props;
  const meta = SOURCE_META[row.source];

  return (
    <button
      type="button"
      onClick={() => onSelect(row)}
      onMouseEnter={onHover}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors ${
        isActive
          ? "bg-zinc-100 dark:bg-white/[0.06]"
          : "hover:bg-zinc-50 dark:hover:bg-white/[0.03]"
      }`}
    >
      <Avatar className="h-9 w-9 rounded-lg flex-shrink-0">
        <AvatarImage src={row.image} alt={row.title} className="object-cover" />
        <AvatarFallback className="rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Icon icon={meta.icon} className="h-4 w-4 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {row.title}
        </p>
        {row.subtitle && (
          <p className="text-xs text-muted-foreground truncate">
            {row.subtitle}
          </p>
        )}
      </div>
      <span
        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.chip}`}
      >
        {meta.label}
      </span>
      <Icon
        icon="solar:alt-arrow-right-linear"
        className="h-4 w-4 text-muted-foreground/50 flex-shrink-0"
      />
    </button>
  );
}
