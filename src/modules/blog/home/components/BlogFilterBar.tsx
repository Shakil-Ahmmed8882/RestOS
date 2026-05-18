"use client";

import { Icon } from "@iconify/react";
import { ALL_FILTER, type BlogFilter } from "../hooks/useBlogHome";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  filters: BlogFilter[];
  active: BlogFilter;
  onSelect: (f: BlogFilter) => void;
};

export function BlogFilterBar(props: Props) {
  const { search, onSearchChange, filters, active, onSelect } = props;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="relative w-full sm:w-72">
        <Icon
          icon="solar:magnifer-linear"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles..."
          className="w-full h-10 pl-10 pr-3 rounded-full bg-silk-with-hover text-sm text-foreground placeholder:text-muted-foreground/70 border-0 outline-none focus:ring-0"
        />
      </div>

      <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => onSelect(f)}
              className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "bg-silk-with-hover text-foreground hover:text-primary"
              }`}
            >
              {f === ALL_FILTER && (
                <Icon
                  icon="solar:widget-5-linear"
                  className="h-3.5 w-3.5"
                />
              )}
              {f}
            </button>
          );
        })}
      </div>
    </div>
  );
}
