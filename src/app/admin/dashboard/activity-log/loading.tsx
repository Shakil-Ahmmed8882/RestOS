import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export default function Loading() {
  return (
    <>
      <PageHeader title="Activity log" description="System and user activity over time." />
      <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 space-y-3">
        <BaseSkeleton className="h-4 w-32 mb-2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 pb-3">
            <BaseSkeleton className="mt-1 h-4 w-4 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <BaseSkeleton className="h-3.5 w-3/5" />
              <BaseSkeleton className="h-2.5 w-2/5" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
