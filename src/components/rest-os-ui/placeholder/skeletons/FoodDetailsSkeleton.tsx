import { BaseSkeleton } from "./BaseSkeleton";

export const FoodDetailsSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image Skeleton */}
      <div className="space-y-4">
        <BaseSkeleton className="aspect-square rounded-2xl w-full" />
        <div className="flex gap-3">
          <BaseSkeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="space-y-6">
        {/* Category Badge */}
        <div className="space-y-3">
          <BaseSkeleton className="h-6 w-24 rounded-full" />
          <BaseSkeleton className="h-10 w-3/4 rounded-lg" />
        </div>

        {/* Rating Section */}
        <div className="space-y-2 pb-4 border-b">
          <BaseSkeleton className="h-4 w-1/2" />
          <BaseSkeleton className="h-4 w-2/3" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <BaseSkeleton className="h-4 w-full" />
          <BaseSkeleton className="h-4 w-5/6" />
        </div>

        {/* Tags/Info */}
        <div className="space-y-3">
          <BaseSkeleton className="h-4 w-1/4" />
          <div className="flex gap-2">
            <BaseSkeleton className="h-6 w-16 rounded-full" />
            <BaseSkeleton className="h-6 w-20 rounded-full" />
            <BaseSkeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* Dietary Info */}
        <div className="flex gap-2">
          <BaseSkeleton className="h-6 w-24 rounded-full" />
          <BaseSkeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Price and Actions */}
        <div className="space-y-4 pt-4 border-t">
          <BaseSkeleton className="h-8 w-1/3" />

          {/* Quantity Selector */}
          <BaseSkeleton className="h-12 w-40 rounded-lg" />

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <BaseSkeleton className="h-12 rounded-lg" />
            <BaseSkeleton className="h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
