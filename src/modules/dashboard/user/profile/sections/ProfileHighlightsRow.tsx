"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { ProfileHighlights } from "../types";

type HighlightItem = {
  key: string;
  label: string;
  icon: string;
};

type Props = {
  highlights: ProfileHighlights;
  onAdd: () => void;
};

const ICON_BY_BUCKET: Record<string, string> = {
  cuisine: "solar:chef-hat-linear",
  diet: "solar:leaf-linear",
  meal: "solar:fork-linear",
};

// Flattens the three preference buckets from the API into a single circle row
// — mirrors Instagram-style "Storys". A trailing "+ New" tile opens the editor.
export function ProfileHighlightsRow(props: Props) {
  const { highlights, onAdd } = props;

  const items: HighlightItem[] = [
    ...(highlights?.cuisinePreferences ?? []).map((label) => ({
      key: `cuisine-${label}`,
      label,
      icon: ICON_BY_BUCKET.cuisine,
    })),
    ...(highlights?.dietaryRestrictions ?? []).map((label) => ({
      key: `diet-${label}`,
      label,
      icon: ICON_BY_BUCKET.diet,
    })),
    ...(highlights?.preferredMealTimes ?? []).map((label) => ({
      key: `meal-${label}`,
      label,
      icon: ICON_BY_BUCKET.meal,
    })),
  ];

  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Highlights</h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>

      <ShowIf condition={items.length === 0}>
        <EmptyHighlights onAdd={onAdd} />
      </ShowIf>

      <ShowIf condition={items.length > 0}>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
          {items.map((item) => (
            <HighlightCircle key={item.key} item={item} />
          ))}
          <AddCircle onClick={onAdd} />
        </div>
      </ShowIf>
    </section>
  );
}

function HighlightCircle({ item }: { item: HighlightItem }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 w-[68px]">
      <div className="size-14 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center text-primary">
        <Icon icon={item.icon} className="size-5" />
      </div>
      <p className="text-[11px] text-foreground/80 leading-tight text-center truncate w-full">
        {item.label}
      </p>
    </div>
  );
}

function AddCircle({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 shrink-0 w-[68px] cursor-pointer group"
    >
      <div className="size-14 rounded-full bg-silk-with-hover flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
        <Icon icon="solar:add-circle-linear" className="size-5" />
      </div>
      <p className="text-[11px] text-muted-foreground leading-tight text-center">New</p>
    </button>
  );
}

function EmptyHighlights({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-full rounded-xl bg-silk-with-hover py-6 px-4 flex flex-col items-center justify-center gap-1.5 text-center hover:bg-primary/5 transition-colors cursor-pointer group"
    >
      <Icon
        icon="solar:add-circle-linear"
        className="size-6 text-muted-foreground group-hover:text-primary transition-colors"
      />
      <p className="text-sm font-medium text-foreground">Add your first highlight</p>
      <p className="text-xs text-muted-foreground">
        Cuisines, diet preferences and meal times appear here
      </p>
    </button>
  );
}
