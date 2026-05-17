import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <BaseSkeleton className="h-[200px] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <BaseSkeleton className="h-4 w-3/5" />
        <BaseSkeleton className="h-3 w-4/5" />
        <div className="flex items-center justify-between pt-1">
          <BaseSkeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
