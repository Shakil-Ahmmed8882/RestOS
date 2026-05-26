"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type BaseSelectOption = {
  value: string;
  label: string;
  icon?: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: BaseSelectOption[];
  placeholder?: string;
  searchable?: boolean;
  className?: string;
  /** Tailwind max-height class for the open panel list. */
  maxHeightClass?: string;
};

/**
 * Themed select that opens an inline `position: absolute` panel (no
 * portal, no body-scroll lock). Optional fuzzy-match search filter.
 *
 * - Click trigger to open. Click outside / Escape to close.
 * - Type to filter when `searchable` is true.
 * - Keyboard: ArrowDown/Up to move, Enter to select, Escape to close.
 *
 * Surface is `bg-silk-with-hover` so it sits in the theme without a
 * hard border. Active option is tinted with `primary`.
 */
export function BaseSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchable = true,
  className,
  maxHeightClass = "max-h-64",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIdx(0);
      return;
    }
    if (searchable) {
      // Focus on next tick so the panel is mounted.
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 10);
      return () => window.clearTimeout(id);
    }
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const commit = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[activeIdx];
      if (opt) commit(opt.value);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "w-full h-10 px-3 rounded-xl bg-silk-with-hover text-left text-sm text-foreground",
          "inline-flex items-center justify-between gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          "transition-colors",
        )}
      >
        <span className="inline-flex items-center gap-2 truncate">
          {selected?.icon && (
            <Icon icon={selected.icon} className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected?.label ?? placeholder}
          </span>
        </span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-1 z-30 rounded-xl bg-white dark:bg-zinc-900 ring-1 ring-zinc-200/60 dark:ring-white/[0.06] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] overflow-hidden"
          onKeyDown={onListKeyDown}
        >
          {searchable && (
            <div className="p-2 border-b border-zinc-100 dark:border-white/[0.04]">
              <div className="relative">
                <Icon
                  icon="solar:magnifer-linear"
                  className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIdx(0);
                  }}
                  placeholder="Search…"
                  className="w-full h-8 pl-8 pr-2 rounded-lg bg-silk-with-hover text-xs text-foreground placeholder:text-muted-foreground outline-none border-0 focus:ring-0"
                />
              </div>
            </div>
          )}

          <ul
            role="listbox"
            className={cn(
              "overflow-y-auto py-1 scrollbar-thin",
              maxHeightClass,
            )}
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-xs text-muted-foreground">
                No matches
              </li>
            )}
            {filtered.map((opt, i) => {
              const active = opt.value === value;
              const highlighted = i === activeIdx;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => commit(opt.value)}
                  className={cn(
                    "cursor-pointer px-3 py-2 text-sm flex items-center justify-between gap-2",
                    active && "bg-primary/10 text-primary",
                    !active && highlighted && "bg-silk-with-hover",
                    !active && !highlighted && "text-foreground",
                  )}
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    {opt.icon && (
                      <Icon
                        icon={opt.icon}
                        className={cn(
                          "h-3.5 w-3.5",
                          active ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    )}
                    <span className="truncate">{opt.label}</span>
                  </span>
                  {active && (
                    <Icon
                      icon="solar:check-circle-bold"
                      className="h-4 w-4 text-primary shrink-0"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
