import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function SavedCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <BaseSkeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <BaseSkeleton className="h-4 w-11/12" />
        <BaseSkeleton className="h-3 w-2/3" />
        <div className="flex items-center justify-between pt-1">
          <BaseSkeleton className="h-3 w-16" />
          <BaseSkeleton className="h-7 w-24 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function SavedGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SavedCardSkeleton key={i} />
      ))}
    </div>
  );
}

function SavedStatCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-center justify-between">
        <BaseSkeleton className="h-3 w-16" />
        <BaseSkeleton className="h-4 w-4 rounded-full" />
      </div>
      <BaseSkeleton className="mt-3 h-7 w-12" />
    </div>
  );
}

export function SavedItemsSkeleton() {
  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SavedStatCardSkeleton key={i} />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <BaseSkeleton className="h-9 w-28 rounded-full" />
        <BaseSkeleton className="h-9 w-28 rounded-full" />
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between">
        <BaseSkeleton className="h-9 w-64 rounded-xl" />
        <BaseSkeleton className="h-3 w-24" />
      </div>

      {/* Grid */}
      <SavedGridSkeleton />
    </div>
  );
}
