"use client";

import { Icon } from "@iconify/react";
import { useGlobalSearchSelector } from "../context/GlobalSearchContext";

type Props = {
  variant?: "icon" | "pill";
};

export function SearchTriggerButton(props: Props) {
  const { variant = "pill" } = props;
  const { open } = useGlobalSearchSelector();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={open}
        aria-label="Open search"
        className="h-9 w-9 rounded-full flex items-center justify-center text-foreground/70 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors"
      >
        <Icon icon="solar:magnifer-linear" className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open search"
      className="group hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full bg-zinc-100/70 dark:bg-white/[0.04] hover:bg-zinc-200/70 dark:hover:bg-white/[0.08] text-sm text-muted-foreground transition-colors min-w-[220px]"
    >
      <Icon icon="solar:magnifer-linear" className="h-4 w-4" />
      <span className="flex-1 text-left text-xs">Search anything...</span>
      <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground/70 px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <span className="text-[11px]">⌘</span>K
      </kbd>
    </button>
  );
}
