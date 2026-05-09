import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";


export function FoodCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 ">
      {/* Main Image Shape - Large rounded corners like the SS */}
      <BaseSkeleton className="aspect-[1.6/1] w-full rounded-[2.2rem]" />

      <div className="flex flex-col gap-2.5 px-1">
        {/* Title and Rating Line */}
        <div className="flex items-center justify-between">
          <BaseSkeleton className="h-7 w-3/5 rounded-lg" />
          <BaseSkeleton className="h-5 w-20 rounded-lg" />
        </div>

        {/* Info Line (Time, Price, Category) */}
        <BaseSkeleton className="h-4 w-1/2 rounded-md" />

        {/* Offers Section */}
        <div className="mt-1 flex flex-col gap-2">
          <BaseSkeleton className="h-4 w-44 rounded-md" />
          <BaseSkeleton className="h-7 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export const CardSkeletonList = Array.from({ length: 6 }).map((_, i) => <FoodCardSkeleton key={i} />);