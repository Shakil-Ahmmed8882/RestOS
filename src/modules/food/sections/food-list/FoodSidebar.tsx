"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { useGetFoodFilterOptionsQuery } from "@/redux/featureApi/foodApi";
import { BaseSelect } from "@/components/rest-os-ui/forms";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest", icon: "solar:clock-circle-linear" },
  { label: "Price: Low → High", value: "price-asc", icon: "solar:sort-from-bottom-to-top-linear" },
  { label: "Price: High → Low", value: "price-desc", icon: "solar:sort-from-top-to-bottom-linear" },
  { label: "Top rated", value: "rating", icon: "solar:star-bold" },
  { label: "Fastest prep", value: "fastest", icon: "solar:bolt-linear" },
] as const;

const DIETARY = [
  { key: "isVeg", label: "Vegetarian", icon: "solar:leaf-linear" },
  { key: "isSpicy", label: "Spicy", icon: "solar:fire-linear" },
  { key: "isGlutenFree", label: "Gluten-free", icon: "solar:wheat-linear" },
] as const;

const AVAILABILITY = [
  { key: "inStock", label: "In stock", icon: "solar:box-linear" },
  { key: "hasDiscount", label: "Has discount", icon: "solar:tag-price-linear" },
  { key: "bestseller", label: "Bestseller", icon: "solar:medal-star-linear" },
] as const;

const RATING_STEPS = [4.5, 4, 3.5, 3] as const;

/**
 * Renders the inner panel — used by both the desktop aside and the
 * mobile drawer.
 */
export function FoodSidebarContent({ onApply }: { onApply?: () => void }) {
  const {
    filters,
    setSort,
    setCategory,
    setCuisine,
    setPriceRange,
    setMinRating,
    toggleDietary,
    toggleAvailability,
    reset,
    hasActive,
  } = useFoodFilter();

  const { data: options } = useGetFoodFilterOptionsQuery();
  const categories = options?.categories ?? [];
  const cuisines = options?.cuisines ?? [];
  const priceBounds = useMemo(
    () => ({
      min: options?.price?.min ?? 0,
      max: options?.price?.max ?? 1000,
    }),
    [options?.price?.min, options?.price?.max],
  );

  const [minPriceLocal, setMinPriceLocal] = useState<string>("");
  const [maxPriceLocal, setMaxPriceLocal] = useState<string>("");

  useEffect(() => {
    setMinPriceLocal(filters.minPrice === null ? "" : String(filters.minPrice));
    setMaxPriceLocal(filters.maxPrice === null ? "" : String(filters.maxPrice));
  }, [filters.minPrice, filters.maxPrice]);

  const commitPrice = () => {
    const min = minPriceLocal === "" ? null : Number(minPriceLocal);
    const max = maxPriceLocal === "" ? null : Number(maxPriceLocal);
    setPriceRange(
      Number.isFinite(min as number) ? min : null,
      Number.isFinite(max as number) ? max : null,
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground tracking-wide">Filters</h3>
        {hasActive && (
          <button
            onClick={() => {
              reset();
              onApply?.();
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
          >
            <Icon icon="solar:restart-linear" className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Sort */}
      <Section title="Sort by" icon="solar:sort-vertical-linear">
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => {
            const active = filters.sort === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-silk-with-hover text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={active}
                  onChange={() => setSort(opt.value)}
                  className="h-3.5 w-3.5 accent-primary"
                />
                <Icon
                  icon={opt.icon}
                  className={`h-3.5 w-3.5 ${active ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="text-xs font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* Category — every available category is visible as a read-only chip.
          Tapping a chip applies it as a filter; nothing here mutates the
          category records themselves. */}
      {categories.length > 0 && (
        <Section title="Category" icon="solar:hamburger-menu-linear">
          <div className="flex flex-wrap gap-1.5">
            <CategoryChip
              label="All"
              icon="solar:widget-linear"
              active={filters.category === "all"}
              onClick={() => setCategory("all")}
            />
            {categories.map((name) => (
              <CategoryChip
                key={name}
                label={name}
                icon="solar:hamburger-menu-linear"
                active={filters.category === name}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Cuisine */}
      {cuisines.length > 0 && (
        <Section title="Cuisine" icon="solar:plate-linear">
          <BaseSelect
            value={filters.cuisine}
            onChange={setCuisine}
            options={[
              { value: "all", label: "All cuisines", icon: "solar:globus-linear" },
              ...cuisines.map((c) => ({
                value: c,
                label: c,
                icon: "solar:plate-linear",
              })),
            ]}
            placeholder="Select cuisine"
          />
        </Section>
      )}

      {/* Price */}
      <Section title="Price range" icon="solar:tag-price-linear">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={priceBounds.min}
              max={priceBounds.max}
              placeholder={`Min ${priceBounds.min}`}
              value={minPriceLocal}
              onChange={(e) => setMinPriceLocal(e.target.value)}
              onBlur={commitPrice}
              onKeyDown={(e) => e.key === "Enter" && commitPrice()}
              className="w-full h-10 px-3 rounded-xl bg-silk-with-hover text-sm text-foreground outline-none border-0 focus:ring-0"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <input
              type="number"
              inputMode="numeric"
              min={priceBounds.min}
              max={priceBounds.max}
              placeholder={`Max ${priceBounds.max}`}
              value={maxPriceLocal}
              onChange={(e) => setMaxPriceLocal(e.target.value)}
              onBlur={commitPrice}
              onKeyDown={(e) => e.key === "Enter" && commitPrice()}
              className="w-full h-10 px-3 rounded-xl bg-silk-with-hover text-sm text-foreground outline-none border-0 focus:ring-0"
            />
          </div>
          {priceBounds.max > 0 && (
            <p className="text-[11px] text-muted-foreground">
              Range: ৳{priceBounds.min} – ৳{priceBounds.max}
            </p>
          )}
        </div>
      </Section>

      {/* Dietary */}
      <Section title="Dietary" icon="solar:leaf-linear">
        <div className="grid grid-cols-2 gap-1.5">
          {DIETARY.map((d) => {
            const active = !!filters[d.key];
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => toggleDietary(d.key, !active)}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-silk-with-hover text-foreground"
                }`}
              >
                <Icon icon={d.icon} className="h-3.5 w-3.5" />
                {d.label}
              </button>
            );
          })}
        </div>
      </Section>


      {/* Rating */}
      <Section title="Minimum rating" icon="solar:star-bold">
        <div className="flex flex-wrap gap-1.5">
          {RATING_STEPS.map((r) => {
            const active = filters.minRating === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setMinRating(active ? null : r)}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-silk-with-hover text-foreground"
                }`}
              >
                <Icon icon="solar:star-bold" className="h-3.5 w-3.5" />
                {r}+
              </button>
            );
          })}
        </div>
      </Section>

    </div>
  );
}

type CategoryChipProps = {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
};

function CategoryChip(props: CategoryChipProps) {
  const { label, icon, active, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-silk-with-hover text-foreground"
      }`}
    >
      <Icon icon={icon} className="h-3.5 w-3.5" />
      <span className="max-w-[10rem] truncate">{label}</span>
    </button>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon icon={icon} className="h-3.5 w-3.5 text-muted-foreground" />
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

/**
 * Desktop sidebar — rendered as a sticky aside in the layout.
 * On medium/small devices the parent layout swaps this for a drawer
 * trigger, so the aside is only mounted at the lg breakpoint and up.
 */
export function FoodSidebar() {
  return (
    <aside className="w-72 flex-shrink-0 bg-background dark:bg-background">
      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 pb-6 scrollbar-thin">
        <FoodSidebarContent />
      </div>
    </aside>
  );
}
