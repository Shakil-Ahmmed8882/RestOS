import { Skeleton } from "@/components/ui/skeleton";

export function FoodGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4 overflow-hidden rounded-lg border">
          <Skeleton className="aspect-[3/4] w-full rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-3 w-full" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-3 w-20" />
            <div className="space-y-2 border-t pt-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
