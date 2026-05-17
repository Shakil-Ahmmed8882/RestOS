"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleFoodQuery } from "@/redux/featureApi/foodApi";
import {
  foodCreateSchema,
  type FoodCreateInput,
} from "@/modules/dashboard/admin/food/schemas/food-create.schema";
import { useOptimisticUpdateFood } from "../hooks/useOptimisticUpdateFood";
import { useFoodActionsSelector } from "../context/FoodActionsContext";
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
  const { close } = useFoodActionsSelector();

  const { data, isLoading } = useGetSingleFoodQuery(foodId);
  const food: FoodItem | undefined = data?.food ?? data;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { run, isLoading: saving } = useOptimisticUpdateFood();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FoodCreateInput>({
    resolver: zodResolver(foodCreateSchema),
  });

  useEffect(() => {
    if (!food) return;
    setValue("foodName", food.foodName ?? food.name ?? "");
    setValue("foodCategory", food.foodCategory ?? food.category ?? "");
    setValue("price", String(food.price ?? ""));
    setValue("quantity", String(food.quantity ?? ""));
    setValue("made_by", food.made_by ?? "");
    setValue("food_origin", food.food_origin ?? "");
    setValue("description", food.description ?? "");
    setImagePreview(food.foodImage ?? food.image ?? null);
  }, [food, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: FoodCreateInput) => {
    const ok = await run({
      foodId,
      payload: { ...values },
      file: imageFile,
    });
    if (ok) close();
  };

  if (isLoading || !food) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-5">Edit food</h2>
        <EditFormSkeleton />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Edit food</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Changes appear instantly. Press save to confirm.
        </p>
      </div>

      {/* Image */}
      <div
        className="rounded-xl bg-zinc-50 dark:bg-white/[0.03] p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="h-20 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <Icon
              icon="solar:image-broken-linear"
              className="h-7 w-7 text-muted-foreground/60"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">Food image</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click to replace. JPG/PNG/WebP, max 5MB.
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Food name" error={errors.foodName?.message}>
          <Input {...register("foodName")} placeholder="Margherita Pizza" />
        </Field>
        <Field label="Category" error={errors.foodCategory?.message}>
          <Input {...register("foodCategory")} placeholder="Pizzas" />
        </Field>
        <Field label="Price" error={errors.price?.message}>
          <Input {...register("price")} placeholder="12.50" />
        </Field>
        <Field label="Quantity" error={errors.quantity?.message}>
          <Input {...register("quantity")} placeholder="20" />
        </Field>
        <Field label="Made by" error={errors.made_by?.message}>
          <Input {...register("made_by")} placeholder="Chef name" />
        </Field>
        <Field label="Origin" error={errors.food_origin?.message}>
          <Input {...register("food_origin")} placeholder="Italian" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description" error={errors.description?.message}>
            <Textarea
              {...register("description")}
              rows={3}
              placeholder="Brief description..."
            />
          </Field>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          disabled={saving}
          className="rounded-full"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="rounded-full text-white min-w-[110px]"
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
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-500">
          <Icon icon="solar:danger-circle-linear" className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
