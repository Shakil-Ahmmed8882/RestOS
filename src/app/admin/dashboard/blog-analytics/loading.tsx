import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export default function Loading() {
  return (
    <>
      <PageHeader title="Blog analytics" description="Engagement, comments, and reach." />
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-zinc-900/60 p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <BaseSkeleton className="h-10 w-10 rounded-xl" />
                <BaseSkeleton className="h-3 w-24" />
              </div>
              <BaseSkeleton className="h-7 w-24" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 space-y-3">
          <BaseSkeleton className="h-4 w-40" />
          <BaseSkeleton className="h-3 w-24" />
          <BaseSkeleton className="h-56 w-full" />
        </div>
      </div>
    </>
  );
}
