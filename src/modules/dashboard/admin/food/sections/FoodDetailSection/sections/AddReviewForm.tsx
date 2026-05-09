"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddFoodReviewMutation } from "@/redux/featureApi/foodApi";
import { toast } from "sonner";

type Props = {
  foodId: string;
};

export function AddReviewForm(props: Props) {
  const { foodId } = props;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading }] = useAddFoodReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addReview({
        foodId,
        rating,
        comment: comment.trim() || undefined,
      }).unwrap();

      toast.success("Review added successfully!");
      setRating(5);
      setComment("");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to add review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900/50 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRating(r)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Icon
                icon="solar:star-bold"
                className={`h-8 w-8 ${
                  r <= rating ? "text-yellow-500" : "text-gray-300 dark:text-zinc-700"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Comment</label>
        <Textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={3}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          {comment.length}/500 characters
        </p>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Icon icon="eos-icons:loading" className="h-4 w-4 mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Icon icon="solar:send-linear" className="h-4 w-4 mr-2" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
}
