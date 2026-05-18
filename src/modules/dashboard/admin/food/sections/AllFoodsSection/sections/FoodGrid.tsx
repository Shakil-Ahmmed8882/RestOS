import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  foods: FoodItem[];
  onViewDetails: (foodId: string) => void;
  onEdit: (foodId: string) => void;
  onDelete: (foodId: string, foodName: string) => void;
  isDeleting: boolean;
};

export function FoodGrid(props: Props) {
  const { foods, onViewDetails, onEdit, onDelete, isDeleting } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map((food) => {
        const foodName = food.foodName || food.name || "Unknown";
        const foodImage = food?.foodImage || food.image;
        const rating = food.averageRating || food.rating || 0;

        return (
          <div key={food._id} className="bg-white dark:bg-zinc-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition-shadow h-full flex flex-col">
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
                <p className="text-xs text-muted-foreground">{food.foodCategory || food.category}</p>

                {food.description && <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{food.description}</p>}
              </div>

              {/* Rating if available */}
              {rating > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({food.reviewCount || 0} reviews)</span>
                </div>
              )}

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
                <span className="font-semibold text-sm">${food.price?.toFixed(2) || "0.00"}</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewDetails(food._id)}
                    title="View details"
                  >
                    <Icon icon="solar:eye-linear" className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(food._id)}
                    title="Edit food"
                  >
                    <Icon icon="solar:pen-2-linear" className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(food._id, foodName)}
                    disabled={isDeleting}
                    title="Delete food"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
