import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function ProfileHeaderSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-3 sm:gap-4">
      <div className="space-y-3 sm:space-y-4 min-w-0">
        {/* Identity card */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4 sm:p-5">
          <div className="flex gap-4 sm:gap-5 items-start">
            <BaseSkeleton className="size-24 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <BaseSkeleton className="h-5 w-40 rounded-md" />
                <BaseSkeleton className="h-8 w-20 rounded-full" />
              </div>
              <BaseSkeleton className="h-3 w-56 rounded-md" />
              <BaseSkeleton className="h-3 w-3/4 rounded-md" />
              <div className="flex gap-4 pt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <BaseSkeleton key={i} className="h-3 w-10 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tastes */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4">
          <BaseSkeleton className="h-3.5 w-16 rounded-md mb-3" />
          <div className="flex gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <BaseSkeleton key={i} className="size-14 rounded-full shrink-0" />
            ))}
          </div>
        </div>

        {/* Tabs panel */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4 sm:p-5">
          <div className="flex gap-3 border-b border-zinc-200/60 pb-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <BaseSkeleton key={i} className="h-7 w-24 rounded-md" />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <BaseSkeleton key={i} className="aspect-square w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-3 sm:space-y-4">
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4 space-y-2">
          <BaseSkeleton className="h-3.5 w-20 rounded-md mb-1" />
          {Array.from({ length: 4 }).map((_, i) => (
            <BaseSkeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </aside>
    </div>
  );
}
