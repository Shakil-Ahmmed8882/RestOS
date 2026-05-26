"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AuthInput } from "@/modules/auth/components/AuthInput";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";

type Props = {
  onOpenFilters?: () => void;
  /** Show the "Filters" trigger pill (mobile/tablet). */
  showFilterTrigger?: boolean;
};

/**
 * Scroll-aware search bar.
 *
 * - Initial state: lives in the normal document flow, directly below the
 *   navbar (sticky top = h-16 = 4rem).
 * - Once the user scrolls past the bar, it sticks to `top-16` (right below
 *   navbar) so it never overlaps the navbar.
 * - When the user scrolls DOWN it hides. When the user scrolls UP it
 *   slides back in, in the same place.
 * - The first ~120px of scroll keeps the bar visible (no jitter on small
 *   nudges).
 */
export function FoodSearchBar({ onOpenFilters, showFilterTrigger }: Props) {
  const { filters, setSearch, hasActive } = useFoodFilter();

  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const lastDir = useRef<"up" | "down">("up");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 120) {
        if (hidden) setHidden(false);
        lastY.current = y;
        return;
      }

      if (Math.abs(delta) < 6) return;

      if (delta > 0 && lastDir.current !== "down") {
        lastDir.current = "down";
        setHidden(true);
      } else if (delta < 0 && lastDir.current !== "up") {
        lastDir.current = "up";
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  return (
    <div
      className={`sticky top-16 z-30 w-full bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-[120%]" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-2 py-3 justify-end">
        {showFilterTrigger && (
          <button
            type="button"
            onClick={onOpenFilters}
            className={`relative shrink-0 inline-flex items-center gap-1.5 h-11 px-3 sm:px-4 rounded-full text-sm font-semibold transition-colors lg:hidden ${
              hasActive
                ? "bg-primary text-primary-foreground"
                : "bg-silk-with-hover text-foreground"
            }`}
            aria-label="Open filters"
          >
            <Icon icon="solar:filter-linear" className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActive && (
              <span className="ml-0.5 grid h-2 w-2 place-items-center rounded-full bg-white/90" />
            )}
          </button>
        )}

        <div className="relative flex-1 lg:flex-none lg:w-1/2">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <AuthInput
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes, cuisines, restaurants…"
            className="rounded-full bg-silk-with-hover border-0 pl-11 pr-4 h-11 text-sm focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
