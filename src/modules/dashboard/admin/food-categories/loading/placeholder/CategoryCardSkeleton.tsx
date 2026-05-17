import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <BaseSkeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-2.5">
        <BaseSkeleton className="h-4 w-3/5" />
        <BaseSkeleton className="h-3 w-4/5" />
        <div className="pt-2 flex items-center justify-between">
          <BaseSkeleton className="h-3 w-16" />
          <BaseSkeleton className="h-7 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CategoryGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
