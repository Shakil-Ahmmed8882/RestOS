"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGlobalSearchSelector } from "../context/GlobalSearchContext";

export function SearchInput() {
  const { term, setTerm, inputRef, onInputKeyDown, close, isOpen } =
    useGlobalSearchSelector();

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen, inputRef]);

  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
      <Icon
        icon="solar:magnifer-linear"
        className="h-5 w-5 text-muted-foreground flex-shrink-0"
      />
      <input
        ref={inputRef}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={onInputKeyDown}
        placeholder="Search foods, blogs, categories..."
        className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 outline-none"
      />
      {term && (
        <button
          type="button"
          onClick={() => setTerm("")}
          className="h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
          aria-label="Clear search"
        >
          <Icon icon="solar:close-circle-linear" className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={close}
        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground/80 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800"
        aria-label="Close search"
      >
        ESC
      </button>
    </div>
  );
}
