import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function BlogListCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <BaseSkeleton className="h-44 sm:h-48 w-full rounded-none" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <BaseSkeleton className="h-5 w-24 rounded-full" />
          <BaseSkeleton className="h-5 w-10 rounded-full" />
        </div>
        <BaseSkeleton className="h-4 w-4/5" />
        <BaseSkeleton className="h-3 w-full" />
        <BaseSkeleton className="h-3 w-3/4" />
        <BaseSkeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BlogListCardSkeleton key={i} />
      ))}
    </div>
  );
}
