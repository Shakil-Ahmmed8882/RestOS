import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import type { FoodReview } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  reviews: FoodReview[];
};

export function ReviewsList(props: Props) {
  const { reviews } = props;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white dark:bg-zinc-900/50 rounded-lg p-4 border border-gray-200 dark:border-zinc-800"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-semibold">{review.customer_name || "Anonymous"}</p>
              <p className="text-xs text-muted-foreground">
                {review.date || review.createdAt
                  ? new Date(review.date || review.createdAt).toLocaleDateString()
                  : "Recently"}
              </p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  icon="solar:star-bold"
                  className={`h-4 w-4 ${
                    i < review.rating ? "text-yellow-500" : "text-gray-300 dark:text-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {review.comment && (
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
