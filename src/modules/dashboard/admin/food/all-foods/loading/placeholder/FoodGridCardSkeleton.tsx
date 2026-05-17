import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function FoodGridCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <BaseSkeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <BaseSkeleton className="h-4 w-3/5" />
          <BaseSkeleton className="h-4 w-12" />
        </div>
        <BaseSkeleton className="h-3 w-full" />
        <BaseSkeleton className="h-3 w-4/5" />
        <div className="flex items-center justify-between pt-1">
          <BaseSkeleton className="h-2.5 w-16" />
          <BaseSkeleton className="h-2.5 w-8" />
        </div>
      </div>
    </div>
  );
}

export function FoodGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <FoodGridCardSkeleton key={i} />
      ))}
    </div>
  );
}
