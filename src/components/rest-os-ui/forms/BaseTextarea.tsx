"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Borderless silky textarea — mirrors BaseInput visual contract.
 */
export const BaseTextarea = React.forwardRef<HTMLTextAreaElement, Props>(
  function BaseTextarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "w-full px-3.5 py-3 rounded-xl bg-silk-with-hover transition-colors",
          "text-sm text-zinc-900 dark:text-zinc-100",
          "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
          "border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0",
          "resize-none disabled:opacity-60 disabled:cursor-not-allowed",
          className,
        )}
      />
    );
  },
);
