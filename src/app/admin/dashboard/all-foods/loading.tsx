import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { FoodGridSkeleton } from "@/modules/dashboard/admin/food/all-foods/loading/placeholder/FoodGridCardSkeleton";
import { FoodStatsSkeleton } from "@/modules/dashboard/admin/food/all-foods/loading/placeholder/FoodStatsSkeleton";
import { TopSellingStripSkeleton } from "@/modules/dashboard/admin/food/all-foods/loading/placeholder/TopSellingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <BaseSkeleton className="h-8 w-40" />
        <BaseSkeleton className="h-4 w-72" />
      </div>
      <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-5 sm:p-6">
        <div className="space-y-1.5 mb-4">
          <BaseSkeleton className="h-4 w-24" />
          <BaseSkeleton className="h-3 w-56" />
        </div>
        <TopSellingStripSkeleton count={6} />
      </div>
      <FoodStatsSkeleton />
      <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-5 sm:p-6 space-y-3">
        <BaseSkeleton className="h-4 w-32" />
        <BaseSkeleton className="h-56 w-full rounded-xl" />
      </div>
      <FoodGridSkeleton count={8} />
    </div>
  );
}
