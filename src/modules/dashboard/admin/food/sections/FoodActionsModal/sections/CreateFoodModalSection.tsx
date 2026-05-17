"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateFoodMutation } from "@/redux/featureApi/foodApi";
import { applyCreateFoodToCache } from "@/redux/featureApi/optimistic/food";
import {
  foodCreateSchema,
  type FoodCreateInput,
} from "@/modules/dashboard/admin/food/schemas/food-create.schema";
import { useFoodActionsSelector } from "../context/FoodActionsContext";
import { FoodFormFields } from "./FoodFormFields";

const DEFAULTS: FoodCreateInput = {
  foodName: "",
  foodCategory: "",
  price: "",
  quantity: "",
  made_by: "",
  food_origin: "",
  description: "",
};

export function CreateFoodModalSection() {
  const { close, mutators } = useFoodActionsSelector();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createFood, { isLoading: creating }] = useCreateFoodMutation();

  const form = useForm<FoodCreateInput>({
    resolver: zodResolver(foodCreateSchema),
    defaultValues: DEFAULTS,
  });
  const { handleSubmit } = form;

  const onImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: FoodCreateInput) => {
    const fd = new FormData();
    fd.append("data", JSON.stringify(values));
    if (imageFile) fd.append("file", imageFile);

    try {
      const response = await createFood(fd).unwrap();
      const row = applyCreateFoodToCache(response);
      if (row) mutators?.onCreated?.(row);
      toast.success("Food created");
      close();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to create food");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-foreground"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">New food</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Add a dish to your menu — image, pricing and details.
        </p>
      </div>

      <FoodFormFields
        form={form}
        imagePreview={imagePreview}
        onImageChange={onImageChange}
      />

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          disabled={creating}
          size="lg"
          className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
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
              Create food
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
