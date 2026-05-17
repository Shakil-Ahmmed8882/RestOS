"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateFoodCategoryMutation } from "@/redux/featureApi/foodCategoryApi";
import { applyCreateCategoryToCache } from "@/redux/featureApi/optimistic/foodCategory";
import { useCategoryActionsSelector } from "../context/CategoryActionsContext";
import {
  CategoryFormFields,
  type CategoryFormState,
} from "./CategoryFormFields";

const INITIAL: CategoryFormState = {
  name: "",
  description: "",
  imagePreview: null,
  imageFile: null,
};

export function CreateCategoryModalSection() {
  const { close, mutators } = useCategoryActionsSelector();
  const [state, setState] = useState<CategoryFormState>(INITIAL);
  const [nameError, setNameError] = useState<string | undefined>();
  const [createCategory, { isLoading: creating }] =
    useCreateFoodCategoryMutation();

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
    if (state.description.trim()) {
      fd.append("description", state.description.trim());
    }
    if (state.imageFile) fd.append("file", state.imageFile);

    try {
      const response = await createCategory(fd).unwrap();
      const row = applyCreateCategoryToCache(response);
      if (row) mutators?.onCreated?.(row);
      toast.success("Category created");
      close();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to create category");
    }
  };

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          New food category
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Group related dishes for easier browsing.
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
          disabled={creating}
          className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={creating}
          size="lg"
          className="rounded-full text-white min-w-[150px] px-6"
        >
          {creating ? (
            <span className="inline-flex items-center gap-2">
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Creating
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Icon icon="solar:add-circle-bold" className="h-4 w-4" />
              Create category
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
