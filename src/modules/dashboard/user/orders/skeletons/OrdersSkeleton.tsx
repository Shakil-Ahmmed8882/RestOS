import { Skeleton } from "@/components/ui/skeleton";

export function OrdersSkeleton() {
  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="mt-3 h-7 w-12" />
            <Skeleton className="mt-1.5 h-2.5 w-20" />
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 border-b border-zinc-100 pb-0 dark:border-white/[0.04]">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>

      {/* Table rows */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-zinc-200/60 dark:ring-white/[0.04]">
        <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3 dark:border-white/[0.04] dark:bg-zinc-900/40">
          <div className="flex gap-6">
            {[160, 40, 80, 80, 70, 70, 80].map((w, i) => (
              <Skeleton key={i} className={`h-3 w-[${w}px]`} />
            ))}
          </div>
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-zinc-100 px-5 py-4 last:border-0 dark:border-white/[0.04]"
          >
            <div className="flex items-center gap-3" style={{ width: 160 }}>
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
