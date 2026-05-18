import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { CategoryGridSkeleton } from "@/modules/dashboard/admin/food/food-categories/loading/placeholder/CategoryCardSkeleton";

export default function Loading() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="space-y-2">
          <BaseSkeleton className="h-8 w-56" />
          <BaseSkeleton className="h-4 w-72" />
        </div>
        <BaseSkeleton className="h-9 w-32 rounded-full" />
      </div>
      <BaseSkeleton className="h-11 w-full sm:max-w-md rounded-full" />
      <CategoryGridSkeleton count={8} />
    </div>
  );
}
