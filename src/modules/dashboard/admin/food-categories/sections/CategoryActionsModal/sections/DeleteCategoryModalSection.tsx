"use client";

import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteFoodCategoryMutation } from "@/redux/featureApi/foodCategoryApi";
import { applyDeleteCategoryToCache } from "@/redux/featureApi/optimistic/foodCategory";
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
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col items-center text-center gap-4 pt-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-red-500/15 blur-xl" />
          <div className="relative h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <Icon
              icon="solar:shield-warning-bold-duotone"
              className="h-8 w-8 text-red-500"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold text-foreground">
            Delete this category?
          </h2>
          <p className="text-sm text-muted-foreground max-w-[380px]">
            <span className="font-semibold text-foreground">{target.name}</span>{" "}
            will be permanently removed. Dishes assigned to it will lose this
            category.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          disabled={deleting}
          size="lg"
          className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          size="lg"
          className="rounded-full bg-red-500 hover:bg-red-600 text-white min-w-[180px] px-7 shadow-sm shadow-red-500/30"
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
            <span className="inline-flex items-center gap-2">
              <Icon icon="solar:trash-bin-trash-bold" className="h-4 w-4" />
              Yes, delete it
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
