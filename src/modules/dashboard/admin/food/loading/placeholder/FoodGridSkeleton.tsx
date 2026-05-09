import { Skeleton } from "@/components/ui/skeleton";

export function FoodGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 h-full flex flex-col">
          {/* Image Skeleton - Fixed height 192px (h-48) */}
          <Skeleton className="h-48 w-full flex-shrink-0" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            {/* Name and Category */}
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-2/3" />
            </div>

            {/* Rating and Orders */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
