"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useFoodActionsSelector } from "./context/FoodActionsContext";
import { CreateFoodModalSection } from "./sections/CreateFoodModalSection";
import { EditFoodModalSection } from "./sections/EditFoodModalSection";
import { DeleteFoodModalSection } from "./sections/DeleteFoodModalSection";

export function FoodActionsModalLayout() {
  const { isOpen, mode, target, close } = useFoodActionsSelector();

  if (!mode) return null;

  const handleOpenChange = (next: boolean) => {
    if (!next) close();
  };

  const initialPageId =
    mode === "delete"
      ? "food-delete"
      : mode === "edit"
        ? "food-edit"
        : "food-create";

  return (
    <MultipageModal
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialPageId={initialPageId}
    >
      <MultipageModal.Page id="food-create" maxWidth="max-w-[720px]">
        <CreateFoodModalSection />
      </MultipageModal.Page>

      <MultipageModal.Page id="food-edit" maxWidth="max-w-[720px]">
        {target ? <EditFoodModalSection foodId={target.foodId} /> : null}
      </MultipageModal.Page>

      <MultipageModal.Page id="food-delete" maxWidth="max-w-[460px]">
        {target ? (
          <DeleteFoodModalSection
            foodId={target.foodId}
            foodName={target.foodName}
          />
        ) : null}
      </MultipageModal.Page>
    </MultipageModal>
  );
}
