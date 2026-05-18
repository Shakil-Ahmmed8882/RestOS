"use client";

import { toast } from "sonner";
import { useDeleteFoodMutation } from "@/redux/featureApi/foodApi";
import { applyDeleteFoodToCache } from "@/redux/featureApi/optimistic/food";
import { ConfirmDestructiveSection } from "@/components/rest-os-ui/modal/confirm-destructive";
import { useFoodActionsSelector } from "../context/FoodActionsContext";

type Props = {
  foodId: string;
  foodName: string;
};

export function DeleteFoodModalSection(props: Props) {
  const { foodId, foodName } = props;
  const { close, mutators } = useFoodActionsSelector();
  const [deleteFood, { isLoading: deleting }] = useDeleteFoodMutation();

  const handleDelete = async () => {
    try {
      await deleteFood(foodId).unwrap();
      applyDeleteFoodToCache(foodId);
      mutators?.onDeleted?.(foodId);
      toast.success("Food deleted");
      close();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete food");
    }
  };

  return (
    <ConfirmDestructiveSection
      subject="this food"
      itemName={foodName}
      isLoading={deleting}
      onConfirm={handleDelete}
      onCancel={close}
    />
  );
}
