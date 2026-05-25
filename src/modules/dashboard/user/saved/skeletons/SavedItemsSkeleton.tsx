import { Skeleton } from "@/components/ui/skeleton";

export function SavedGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
          <Skeleton className="h-3.5 w-11/12 rounded-md" />
          <Skeleton className="h-3 w-2/3 rounded-md" />
          <div className="flex items-center justify-between pt-1">
            <Skeleton className="h-3 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SavedItemsSkeleton() {
  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-2.5 w-16 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-7 w-12 rounded-md" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-64 rounded-xl" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>

      {/* Grid */}
      <SavedGridSkeleton />
    </div>
  );
}
