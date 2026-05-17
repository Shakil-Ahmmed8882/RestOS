"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useFoodActionsSelector } from "./context/FoodActionsContext";
import { EditFoodModalSection } from "./sections/EditFoodModalSection";
import { DeleteFoodModalSection } from "./sections/DeleteFoodModalSection";

export function FoodActionsModalLayout() {
  const { isOpen, mode, target, close } = useFoodActionsSelector();

  if (!target) return null;

  const handleOpenChange = (next: boolean) => {
    if (!next) close();
  };

  const initialPageId = mode === "delete" ? "food-delete" : "food-edit";

  return (
    <MultipageModal
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialPageId={initialPageId}
    >
      <MultipageModal.Page id="food-edit" maxWidth="max-w-[720px]">
        <EditFoodModalSection foodId={target.foodId} />
      </MultipageModal.Page>

      <MultipageModal.Page id="food-delete" maxWidth="max-w-[460px]">
        <DeleteFoodModalSection
          foodId={target.foodId}
          foodName={target.foodName}
        />
      </MultipageModal.Page>
    </MultipageModal>
  );
}
