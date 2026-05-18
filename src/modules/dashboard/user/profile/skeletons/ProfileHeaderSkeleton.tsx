import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function ProfileHeaderSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6 lg:gap-10 items-start">
      <div className="flex flex-col items-center lg:items-start gap-4">
        <BaseSkeleton className="size-32 rounded-full" />
        <BaseSkeleton className="h-5 w-32 rounded-md" />
        <BaseSkeleton className="h-3 w-24 rounded-md" />
      </div>

      <div className="space-y-3">
        <BaseSkeleton className="h-6 w-56 rounded-md" />
        <BaseSkeleton className="h-3 w-3/4 rounded-md" />
        <BaseSkeleton className="h-3 w-2/3 rounded-md" />
        <div className="flex gap-2 pt-2">
          <BaseSkeleton className="h-9 w-28 rounded-full" />
          <BaseSkeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>

      <div className="hidden lg:block space-y-3">
        <BaseSkeleton className="h-3 w-24 rounded-md" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <BaseSkeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
