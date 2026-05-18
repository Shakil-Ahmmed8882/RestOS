"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useGetSingleFoodQuery,
  useUpdateFoodMutation,
} from "@/redux/featureApi/foodApi";
import { applyUpdateFoodToCache } from "@/redux/featureApi/optimistic/food";
import {
  foodCreateSchema,
  type FoodCreateInput,
} from "@/modules/dashboard/admin/food/schemas/food-create.schema";
import { useFoodActionsSelector } from "../context/FoodActionsContext";
import { FoodFormFields } from "./FoodFormFields";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

type Props = {
  foodId: string;
};

function EditFormSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-7 w-40 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
      <div className="h-40 w-full bg-zinc-200/70 dark:bg-zinc-800 rounded-xl" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
            <div className="h-10 w-full bg-zinc-200/70 dark:bg-zinc-800 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EditFoodModalSection(props: Props) {
  const { foodId } = props;
  const { close, mutators } = useFoodActionsSelector();

  const { data, isLoading } = useGetSingleFoodQuery(foodId);
  // `getSingleFood` returns either `{ food, relatedFoods, message }` or a
  // pre-unwrapped FoodItem depending on transformResponse cascade. Guard
  // every access with optional chaining.
  const food: FoodItem | undefined = (data as any)?.food ?? (data as any);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [updateFood, { isLoading: saving }] = useUpdateFoodMutation();
  const form = useForm<FoodCreateInput>({
    resolver: zodResolver(foodCreateSchema),
  });
  const { handleSubmit, setValue } = form;

  useEffect(() => {
    if (!food) return;
    setValue("foodName", food?.foodName ?? food?.name ?? "");
    setValue("foodCategory", food?.foodCategory ?? food?.category ?? "");
    setValue("price", String(food?.price ?? ""));
    setValue("quantity", String(food?.quantity ?? ""));
    setValue("made_by", food?.made_by ?? "");
    setValue("food_origin", food?.food_origin ?? "");
    setValue("description", food?.description ?? "");
    setImagePreview(food?.foodImage ?? food?.image ?? null);
  }, [food, setValue]);

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
      const response = await updateFood({ id: foodId, data: fd }).unwrap();
      const row = applyUpdateFoodToCache(response);
      // Fallback when the server envelope is unexpected: synthesise a row
      // from current form values so the list still updates instantly.
      const visibleRow = row ?? {
        _id: foodId,
        foodName: values.foodName,
        foodCategory: values.foodCategory,
        price: Number(values.price),
        quantity: Number(values.quantity),
        made_by: values.made_by,
        food_origin: values.food_origin,
        description: values.description,
        foodImage: imagePreview ?? undefined,
      };
      mutators?.onUpdated?.(visibleRow);
      toast.success("Food updated");
      close();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to update food");
    }
  };

  if (isLoading || !food) {
    return (
      <div className="w-full space-y-5">
        <h2 className="text-2xl font-bold text-foreground">Edit food</h2>
        <EditFormSkeleton />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-foreground"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">Edit food</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Changes apply instantly once saved.
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
          disabled={saving}
          size="lg"
          className="rounded-full text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
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
    </form>
  );
}
