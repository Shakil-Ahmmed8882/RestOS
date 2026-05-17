"use client";

import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useCategoryActionsSelector } from "./context/CategoryActionsContext";
import { CreateCategoryModalSection } from "./sections/CreateCategoryModalSection";
import { EditCategoryModalSection } from "./sections/EditCategoryModalSection";
import { DeleteCategoryModalSection } from "./sections/DeleteCategoryModalSection";

export function CategoryActionsModalLayout() {
  const { isOpen, mode, close } = useCategoryActionsSelector();

  if (!mode) return null;

  const handleOpenChange = (next: boolean) => {
    if (!next) close();
  };

  const initialPageId =
    mode === "delete"
      ? "category-delete"
      : mode === "edit"
        ? "category-edit"
        : "category-create";

  return (
    <MultipageModal
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialPageId={initialPageId}
    >
      <MultipageModal.Page id="category-create" maxWidth="max-w-[560px]">
        <CreateCategoryModalSection />
      </MultipageModal.Page>

      <MultipageModal.Page id="category-edit" maxWidth="max-w-[560px]">
        <EditCategoryModalSection />
      </MultipageModal.Page>

      <MultipageModal.Page id="category-delete" maxWidth="max-w-[460px]">
        <DeleteCategoryModalSection />
      </MultipageModal.Page>
    </MultipageModal>
  );
}
