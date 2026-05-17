"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { BaseInput, BaseTextarea } from "@/components/rest-os-ui/forms";
import type { UseFormReturn } from "react-hook-form";
import type { FoodCreateInput } from "@/modules/dashboard/admin/food/schemas/food-create.schema";

type Props = {
  form: UseFormReturn<FoodCreateInput>;
  imagePreview: string | null;
  onImageChange: (file: File) => void;
};

export function FoodFormFields(props: Props) {
  const { form, imagePreview, onImageChange } = props;
  const {
    register,
    formState: { errors },
  } = form;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    onImageChange(file);
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl bg-silk-with-hover p-4 flex flex-col gap-3 cursor-pointer transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-44 w-full rounded-lg object-cover object-top"
          />
        ) : (
          <div className="h-44 w-full rounded-lg bg-silk-with-hover flex flex-col items-center justify-center gap-2">
            <Icon
              icon="solar:cloud-upload-linear"
              className="h-7 w-7 text-zinc-400 dark:text-zinc-500"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Click to upload — JPG/PNG/WebP, up to 5MB
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Food name" error={errors.foodName?.message}>
          <BaseInput
            {...register("foodName")}
            placeholder="Margherita Pizza"
          />
        </Field>
        <Field label="Category" error={errors.foodCategory?.message}>
          <BaseInput {...register("foodCategory")} placeholder="Pizzas" />
        </Field>
        <Field label="Price" error={errors.price?.message}>
          <BaseInput {...register("price")} placeholder="12.50" />
        </Field>
        <Field label="Quantity" error={errors.quantity?.message}>
          <BaseInput {...register("quantity")} placeholder="20" />
        </Field>
        <Field label="Made by" error={errors.made_by?.message}>
          <BaseInput {...register("made_by")} placeholder="Chef name" />
        </Field>
        <Field label="Origin" error={errors.food_origin?.message}>
          <BaseInput {...register("food_origin")} placeholder="Italian" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description" error={errors.description?.message}>
            <BaseTextarea
              {...register("description")}
              rows={3}
              placeholder="Brief description..."
            />
          </Field>
        </div>
      </div>
    </div>
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
      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
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
