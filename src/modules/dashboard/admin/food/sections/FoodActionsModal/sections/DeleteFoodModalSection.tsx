"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useOptimisticDeleteFood } from "../hooks/useOptimisticDeleteFood";
import { useFoodActionsSelector } from "../context/FoodActionsContext";

type Props = {
  foodId: string;
  foodName: string;
};

export function DeleteFoodModalSection(props: Props) {
  const { foodId, foodName } = props;
  const { close } = useFoodActionsSelector();
  const { run, isLoading: deleting } = useOptimisticDeleteFood();

  const handleDelete = async () => {
    const ok = await run(foodId);
    if (ok) close();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
          <Icon
            icon="solar:trash-bin-trash-linear"
            className="h-6 w-6 text-red-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground">
            Delete this food?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-semibold text-foreground">{foodName}</span>{" "}
            will be permanently removed. This cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          disabled={deleting}
          className="rounded-full"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-full min-w-[110px]"
        >
          {deleting ? (
            <span className="inline-flex items-center gap-2">
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Deleting
            </span>
          ) : (
            "Delete food"
          )}
        </Button>
      </div>
    </div>
  );
}
