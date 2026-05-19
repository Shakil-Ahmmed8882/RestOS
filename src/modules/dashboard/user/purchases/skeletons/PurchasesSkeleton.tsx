import { Skeleton } from "@/components/ui/skeleton";

export function PurchasesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-3 h-6 w-20" />
          </div>
        ))}
      </div>
      <div className="space-y-2 rounded-2xl bg-white p-3 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl px-3 py-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3.5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
