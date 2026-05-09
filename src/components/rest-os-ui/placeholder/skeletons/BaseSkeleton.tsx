// ============================================
// BASE SKELETON COMPONENT
// ============================================

import { cn } from "@/lib/utils";

export function BaseSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md animate-pulse bg-gray-100 dark:bg-[#171515]",
        // The shimmer overlay
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}