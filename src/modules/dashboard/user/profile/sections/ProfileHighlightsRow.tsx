"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { ProfileHighlights } from "../types";

type Bucket = "cuisine" | "diet" | "meal";

type HighlightItem = {
  key: string;
  label: string;
  bucket: Bucket;
  emoji: string;
};

type Props = {
  highlights: ProfileHighlights;
  onAdd: () => void;
};

// Curated emoji map for common values. Anything unmapped falls back to a
// bucket-default — never a meaningless cog icon.
const CUISINE_EMOJI: Record<string, string> = {
  italian: "🍝",
  japanese: "🍣",
  chinese: "🥡",
  indian: "🍛",
  mexican: "🌮",
  thai: "🍜",
  french: "🥐",
  mediterranean: "🥙",
  korean: "🍱",
  vietnamese: "🍲",
  american: "🍔",
  spanish: "🥘",
  greek: "🥗",
  turkish: "🥙",
  lebanese: "🧆",
  bbq: "🍖",
  seafood: "🦐",
  pizza: "🍕",
  burger: "🍔",
  sushi: "🍣",
  desserts: "🍰",
};

const DIET_EMOJI: Record<string, string> = {
  vegetarian: "🥦",
  vegan: "🌱",
  "gluten-free": "🌾",
  glutenfree: "🌾",
  halal: "🕌",
  kosher: "✡️",
  pescatarian: "🐟",
  keto: "🥑",
  paleo: "🍖",
  "nut-free": "🥜",
  "dairy-free": "🥛",
};

const MEAL_EMOJI: Record<string, string> = {
  breakfast: "🍳",
  brunch: "🥞",
  lunch: "🥗",
  dinner: "🍽️",
  snack: "🍪",
  dessert: "🍰",
  drinks: "🍹",
  late: "🌙",
};

const BUCKET_FALLBACK: Record<Bucket, string> = {
  cuisine: "🍽️",
  diet: "🌿",
  meal: "🕒",
};

const BUCKET_LABEL: Record<Bucket, string> = {
  cuisine: "Cuisine",
  diet: "Diet",
  meal: "Meal time",
};

// CLAUDE.md rule: primary is the only accent. Buckets differentiate via
// emoji + label, not hue.
const BUCKET_STYLE: Record<Bucket, string> = {
  cuisine: "bg-primary/10 ring-primary/15",
  diet: "bg-primary/5 ring-primary/10",
  meal: "bg-silk-with-hover ring-zinc-200/40 dark:ring-white/[0.04]",
};

function pickEmoji(value: string, bucket: Bucket): string {
  const key = value.trim().toLowerCase();
  if (bucket === "cuisine") return CUISINE_EMOJI[key] ?? BUCKET_FALLBACK.cuisine;
  if (bucket === "diet") return DIET_EMOJI[key] ?? BUCKET_FALLBACK.diet;
  return MEAL_EMOJI[key] ?? BUCKET_FALLBACK.meal;
}

export function ProfileHighlightsRow(props: Props) {
  const { highlights, onAdd } = props;

  const items: HighlightItem[] = [
    ...(highlights?.cuisinePreferences ?? []).map<HighlightItem>((label) => ({
      key: `c-${label}`,
      label,
      bucket: "cuisine",
      emoji: pickEmoji(label, "cuisine"),
    })),
    ...(highlights?.dietaryRestrictions ?? []).map<HighlightItem>((label) => ({
      key: `d-${label}`,
      label,
      bucket: "diet",
      emoji: pickEmoji(label, "diet"),
    })),
    ...(highlights?.preferredMealTimes ?? []).map<HighlightItem>((label) => ({
      key: `m-${label}`,
      label,
      bucket: "meal",
      emoji: pickEmoji(label, "meal"),
    })),
  ];

  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">Tastes</h2>
          <span className="text-[11px] text-muted-foreground tabular-nums">· {items.length}</span>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          <Icon icon="solar:pen-2-linear" className="size-3.5" />
          Edit
        </button>
      </div>

      <ShowIf condition={items.length === 0}>
        <EmptyHighlights onAdd={onAdd} />
      </ShowIf>

      <ShowIf condition={items.length > 0}>
        <div className="flex gap-2.5 overflow-x-auto overflow-y-hidden pb-0.5 -mx-1 px-1 scrollbar-hidden">
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
    <div
      className="flex flex-col items-center gap-1 shrink-0 w-[62px]"
      title={`${BUCKET_LABEL[item.bucket]} · ${item.label}`}
    >
      <div
        className={`size-14 rounded-full ${BUCKET_STYLE[item.bucket]} ring-2 flex items-center justify-center text-2xl leading-none`}
      >
        <span className="block translate-y-px">{item.emoji}</span>
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
      className="flex flex-col items-center gap-1 shrink-0 w-[62px] cursor-pointer group"
    >
      <div className="size-14 rounded-full bg-silk-with-hover ring-2 ring-zinc-200/50 dark:ring-white/[0.04] flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:ring-primary/20 transition-colors">
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
      className="w-full rounded-xl bg-silk-with-hover py-4 px-3 flex items-center justify-center gap-2 text-center hover:bg-primary/5 transition-colors cursor-pointer group"
    >
      <Icon
        icon="solar:add-circle-linear"
        className="size-4 text-muted-foreground group-hover:text-primary transition-colors"
      />
      <p className="text-xs font-medium text-foreground/80">Add cuisines, diet & meal times</p>
    </button>
  );
}
