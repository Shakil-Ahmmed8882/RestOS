import { Skeleton } from "@/components/ui/skeleton";

export function UserDetailsHomeSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-4 sm:gap-6">
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col items-center gap-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-40 w-40 sm:h-48 sm:w-48 rounded-full" />
        </div>

        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-44 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-5">
        <Skeleton className="h-4 w-28" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
              <div className="flex gap-1.5">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
