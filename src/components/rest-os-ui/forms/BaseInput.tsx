"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Borderless silky input.
 *
 * - No border, no outline, no ring on focus.
 * - Surface uses `bg-silk-with-hover` so it sits as a soft tinted block
 *   on top of cards instead of an outlined chip.
 * - Text + placeholder hard-coded to high-contrast zinc shades so the
 *   value stays readable in both themes regardless of inherited color.
 */
export const BaseInput = React.forwardRef<HTMLInputElement, Props>(
  function BaseInput({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full h-11 px-3.5 rounded-xl bg-silk-with-hover transition-colors",
          "text-sm text-zinc-900 dark:text-zinc-100",
          "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
          "border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className,
        )}
      />
    );
  },
);
