import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export default function Loading() {
  return (
    <>
      <PageHeader title="All users" description="Manage every user account on the platform." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white dark:bg-zinc-900/50 px-4 py-3 flex items-center gap-3"
          >
            <BaseSkeleton className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <BaseSkeleton className="h-2.5 w-16" />
              <BaseSkeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-6">
        <BaseSkeleton className="h-9 w-28 rounded-full" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl bg-white dark:bg-zinc-900/60 px-4 py-3"
          >
            <BaseSkeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <BaseSkeleton className="h-3.5 w-40" />
              <BaseSkeleton className="h-3 w-56" />
            </div>
            <BaseSkeleton className="h-7 w-20 rounded-md" />
            <BaseSkeleton className="h-3 w-16" />
            <div className="flex gap-1">
              <BaseSkeleton className="h-8 w-8 rounded-md" />
              <BaseSkeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
