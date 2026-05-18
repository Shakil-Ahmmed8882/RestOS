import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  foods: FoodItem[];
};

export function RelatedFoodsGrid(props: Props) {
  const { foods } = props;
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map((food) => {
        const foodName = food.foodName || food.name;
        const foodImage = food?.foodImage || food.image;
        const rating = food.averageRating || food.rating || 0;

        return (
          <div
            key={food._id}
            className="bg-white dark:bg-zinc-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition-shadow h-full flex flex-col"
          >
            {/* Image - Fixed height */}
            <div className="relative h-40 bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
              {foodImage ? (
                <img
                  src={foodImage}
                  alt={foodName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon icon="solar:image-broken-linear" className="h-8 w-8 opacity-30" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 space-y-2 flex-1 flex flex-col">
              <div className="flex-1">
                <h4 className="font-semibold text-sm truncate">{foodName}</h4>
                <p className="text-xs text-muted-foreground">{food.foodCategory || food.category}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
                <div>
                  <span className="font-semibold text-sm">${food.price?.toFixed(2)}</span>
                  {rating > 0 && (
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <Icon icon="solar:star-bold" className="h-3 w-3 text-yellow-500" />
                      <span>{rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push(`/admin/dashboard/foods/${food._id}`)}
                >
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
