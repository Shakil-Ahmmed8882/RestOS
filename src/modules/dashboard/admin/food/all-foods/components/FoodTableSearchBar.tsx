"use client";

import { Icon } from "@iconify/react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function FoodTableSearchBar(props: Props) {
  const { value, onChange } = props;
  return (
    <div className="relative w-full sm:max-w-xs">
      <Icon
        icon="solar:magnifer-linear"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search dishes..."
        className="w-full h-10 pl-10 pr-3 rounded-full bg-white dark:bg-zinc-900/60 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
