import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function FoodStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-5"
        >
          <div className="flex items-start justify-between">
            <BaseSkeleton className="h-9 w-9 rounded-xl" />
            <BaseSkeleton className="h-3 w-10" />
          </div>
          <div className="space-y-1.5">
            <BaseSkeleton className="h-3 w-20" />
            <BaseSkeleton className="h-7 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
