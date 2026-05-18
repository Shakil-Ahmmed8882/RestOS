import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  food: FoodItem;
  onViewDetails: () => void;
};

export function FoodCard(props: Props) {
  const { food, onViewDetails } = props;
  const foodName = food.foodName || food.name || "Unknown";
  const foodImage = food?.foodImage || food.image;
  const rating = food.averageRating || food.rating || 0;
  const orderCount = food.orders || 0;

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-zinc-800 h-full flex flex-col">
      {/* Image - Fixed height */}
      <div className="relative h-48 bg-gray-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0">
        {foodImage ? (
          <img src={foodImage} alt={foodName} className="w-full h-full object-cover hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon icon="solar:image-broken-linear" className="h-12 w-12 opacity-30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex-1">
          <h4 className="font-semibold text-sm truncate">{foodName}</h4>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{food.foodCategory || food.category}</p>
        </div>

        {/* Rating and Orders */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground">{orderCount} orders</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
          <span className="font-semibold text-sm">${food.price?.toFixed(2) || "0.00"}</span>
          <Button size="sm" variant="ghost" onClick={onViewDetails}>
            <Icon icon="solar:eye-linear" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
