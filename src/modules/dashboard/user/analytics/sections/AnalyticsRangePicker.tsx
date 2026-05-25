"use client";

import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (n: number) => void;
  isFetching?: boolean;
};

const OPTIONS = [
  { label: "7d", value: 7 },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
  { label: "1y", value: 365 },
];

export function AnalyticsRangePicker({ value, onChange, isFetching }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-silk-with-hover p-1 ring-1 ring-zinc-200/60 dark:ring-white/[0.04]",
        isFetching && "opacity-90",
      )}
      role="tablist"
      aria-label="Analytics date range"
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
