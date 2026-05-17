import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function TopSellingCardSkeleton() {
  return (
    <div className="shrink-0 w-[220px] sm:w-[240px] rounded-2xl bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <BaseSkeleton className="h-[140px] w-full rounded-none" />
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <BaseSkeleton className="h-3 w-2/3" />
          <BaseSkeleton className="h-3 w-10" />
        </div>
        <div className="flex items-center justify-between">
          <BaseSkeleton className="h-2.5 w-1/3" />
          <BaseSkeleton className="h-2.5 w-8" />
        </div>
      </div>
    </div>
  );
}

export function TopSellingStripSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <TopSellingCardSkeleton key={i} />
      ))}
    </div>
  );
}
