import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function FoodRowSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_90px_90px_120px_40px] sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_120px] gap-3 sm:gap-4 items-center px-3 sm:px-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-white/[0.02]">
      <div className="flex items-center gap-3 min-w-0">
        <BaseSkeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <BaseSkeleton className="h-3 w-3/5" />
          <BaseSkeleton className="h-2.5 w-2/5" />
        </div>
      </div>
      <BaseSkeleton className="hidden sm:block h-3 w-12" />
      <BaseSkeleton className="hidden sm:block h-3 w-8" />
      <BaseSkeleton className="hidden sm:block h-3 w-10" />
      <BaseSkeleton className="h-5 w-14 rounded-full" />
      <BaseSkeleton className="hidden sm:block h-3 w-16" />
      <div className="flex justify-end gap-1.5">
        <BaseSkeleton className="h-8 w-8 rounded-full" />
        <BaseSkeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export function FoodTableSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-3 sm:p-4 space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {Array.from({ length: count }).map((_, i) => (
        <FoodRowSkeleton key={i} />
      ))}
    </div>
  );
}
