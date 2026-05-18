import { Skeleton } from "@/components/ui/skeleton";

export function AllBlogsSkeleton() {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-4 sm:p-6 space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50/70 dark:bg-white/[0.02]"
        >
          <Skeleton className="h-14 w-14 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
          <div className="flex gap-1.5">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
