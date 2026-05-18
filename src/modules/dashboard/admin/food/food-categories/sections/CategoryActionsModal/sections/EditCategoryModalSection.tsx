"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUpdateFoodCategoryMutation } from "@/redux/featureApi/foodCategoryApi";
import { applyUpdateCategoryToCache } from "@/redux/featureApi/optimistic/foodCategory";
import { useCategoryActionsSelector } from "../context/CategoryActionsContext";
import {
  CategoryFormFields,
  type CategoryFormState,
} from "./CategoryFormFields";

export function EditCategoryModalSection() {
  const { target, close, mutators } = useCategoryActionsSelector();
  const [state, setState] = useState<CategoryFormState>({
    name: "",
    description: "",
    imagePreview: null,
    imageFile: null,
  });
  const [nameError, setNameError] = useState<string | undefined>();
  const [updateCategory, { isLoading: saving }] =
    useUpdateFoodCategoryMutation();

  useEffect(() => {
    if (!target) return;
    setState({
      name: target.name ?? "",
      description: target.description ?? "",
      imagePreview: target.image ?? null,
      imageFile: null,
    });
  }, [target]);

  if (!target) return null;

  const update = (next: Partial<CategoryFormState>) =>
    setState((s) => ({ ...s, ...next }));

  const handleSubmit = async () => {
    if (!state.name.trim()) {
      setNameError("Name is required");
      return;
    }
    setNameError(undefined);

    const fd = new FormData();
    fd.append("name", state.name.trim());
    fd.append("description", state.description.trim());
    if (state.imageFile) fd.append("file", state.imageFile);

    try {
      const response = await updateCategory({
        id: target._id,
        data: fd,
      }).unwrap();
      const row = applyUpdateCategoryToCache(response);
      // Fall back to merging form values onto the original row when the
      // server response shape is unexpected — keeps the visible list in
      // sync even if normalization fails.
      const visibleRow = row ?? {
        ...target,
        name: state.name.trim(),
        description: state.description.trim(),
        image: state.imagePreview ?? target.image,
      };
      mutators?.onUpdated?.(visibleRow);
      toast.success("Category updated");
      close();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to update category");
    }
  };

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Edit category</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Update the name, description or image.
        </p>
      </div>

      <CategoryFormFields
        state={state}
        onChange={update}
        nameError={nameError}
      />

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          disabled={saving}
          className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          size="lg"
          className="rounded-full text-white min-w-[150px] px-6"
        >
          {saving ? (
            <span className="inline-flex items-center gap-2">
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Saving
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Icon icon="solar:check-circle-bold" className="h-4 w-4" />
              Save changes
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
