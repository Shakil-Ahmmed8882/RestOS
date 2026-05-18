import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <BaseSkeleton className="h-9 w-20 rounded-md" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BaseSkeleton className="h-80 w-full rounded-xl" />
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <BaseSkeleton className="h-8 w-2/3" />
                <BaseSkeleton className="h-4 w-1/3" />
              </div>
              <div className="text-right space-y-2">
                <BaseSkeleton className="h-8 w-20" />
                <BaseSkeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
            <BaseSkeleton className="h-4 w-3/4" />
            <BaseSkeleton className="h-4 w-2/3" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <BaseSkeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <BaseSkeleton className="h-11 w-full rounded-md" />
          <BaseSkeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
