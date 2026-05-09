"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useGetSingleFoodQuery } from "@/redux/featureApi/foodApi";
import { EditFoodForm } from "./EditFoodForm";

type Props = {
  foodId: string;
};

export function EditFoodLayout(props: Props) {
  const { foodId } = props;
  const router = useRouter();
  const { data, isLoading } = useGetSingleFoodQuery(foodId);

  const food = data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-6 w-1/4" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2"
      >
        <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
        Back
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Edit Food Item</h1>
        <p className="text-muted-foreground mt-2">Update the food details</p>
      </div>

      <EditFoodForm foodId={foodId} food={food} />
    </div>
  );
}
