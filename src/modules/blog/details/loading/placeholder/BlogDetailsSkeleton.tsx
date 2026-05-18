import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function BlogDetailsSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="flex items-center gap-3">
        <BaseSkeleton className="h-6 w-20 rounded-full" />
        <BaseSkeleton className="h-3 w-24" />
      </div>
      <BaseSkeleton className="h-10 w-3/4" />
      <BaseSkeleton className="h-3 w-2/4" />

      <BaseSkeleton className="h-72 w-full rounded-2xl" />

      <div className="space-y-2.5 pt-2">
        <BaseSkeleton className="h-3 w-full" />
        <BaseSkeleton className="h-3 w-11/12" />
        <BaseSkeleton className="h-3 w-10/12" />
        <BaseSkeleton className="h-3 w-9/12" />
      </div>

      <div className="pt-6 space-y-4">
        <BaseSkeleton className="h-6 w-40" />
        <BaseSkeleton className="h-12 w-full rounded-2xl" />
        <div className="space-y-4 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <BaseSkeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <BaseSkeleton className="h-3 w-24" />
                <BaseSkeleton className="h-3 w-full" />
                <BaseSkeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
