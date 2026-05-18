"use client";

import { toast } from "sonner";
import { useDeleteFoodCategoryMutation } from "@/redux/featureApi/foodCategoryApi";
import { applyDeleteCategoryToCache } from "@/redux/featureApi/optimistic/foodCategory";
import { ConfirmDestructiveSection } from "@/components/rest-os-ui/modal/confirm-destructive";
import { useCategoryActionsSelector } from "../context/CategoryActionsContext";

export function DeleteCategoryModalSection() {
  const { target, close, mutators } = useCategoryActionsSelector();
  const [deleteCategory, { isLoading: deleting }] =
    useDeleteFoodCategoryMutation();

  if (!target) return null;

  const handleDelete = async () => {
    try {
      await deleteCategory(target._id).unwrap();
      applyDeleteCategoryToCache(target._id);
      mutators?.onDeleted?.(target._id);
      toast.success("Category deleted");
      close();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete category");
    }
  };

  return (
    <ConfirmDestructiveSection
      subject="this category"
      itemName={target.name}
      description={
        <>
          <span className="font-semibold text-foreground">{target.name}</span>{" "}
          will be permanently removed. Dishes assigned to it will lose this
          category.
        </>
      }
      isLoading={deleting}
      onConfirm={handleDelete}
      onCancel={close}
    />
  );
}
