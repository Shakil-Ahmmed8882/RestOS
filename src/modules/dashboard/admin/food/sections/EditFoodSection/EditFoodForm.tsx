"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateFood } from "@/modules/dashboard/admin/food/hooks/useUpdateFood";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

const FOOD_CATEGORIES = [
  "Pizzas",
  "Burgers",
  "Salads",
  "Pasta",
  "Desserts",
  "Beverages",
  "Appetizers",
  "Main Courses",
];

type Props = {
  foodId: string;
  food?: FoodItem;
};

export function EditFoodForm(props: Props) {
  const { foodId, food } = props;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    imagePreview,
    setImagePreview,
    fileInputRef,
    handleImageChange,
    onSubmit: handleFormSubmit,
    updating,
    setValue,
  } = useUpdateFood(foodId);

  useEffect(() => {
    if (food) {
      const foodName = food.foodName || food.name;
      const foodCategory = food.foodCategory || food.category;
      const foodDescription = food.description;

      setValue("name", foodName || "");
      setValue("price", food.price || 0);
      setValue("category", foodCategory || "");
      setValue("description", foodDescription || "");
      setValue("isAvailable", food.isAvailable ?? true);

      if (food.foodImage || food.image) {
        setImagePreview(food.foodImage || food.image || null);
      }
    }
  }, [food, setValue, setImagePreview]);

  const onSubmit = async (data: any) => {
    await handleFormSubmit(data);
    router.push(`/admin/dashboard/foods/${foodId}`);
  };

  const foodImage = food?.foodImage || food?.image;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-zinc-900/50 p-6 rounded-xl border border-gray-200 dark:border-zinc-800">
      {/* Image Upload */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Food Image</label>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 dark:hover:border-zinc-600 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview || foodImage ? (
            <div className="space-y-2">
              <img
                src={imagePreview || foodImage}
                alt="Preview"
                className="h-40 w-40 mx-auto object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
              >
                Change Image
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Icon icon="solar:cloud-upload-linear" className="h-8 w-8 mx-auto opacity-50" />
              <p className="text-sm text-muted-foreground">Click to upload image</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or WebP (max 5MB)</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Food Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Food Name *</label>
        <Input
          placeholder="e.g., Margherita Pizza"
          {...register("name")}
          disabled={updating}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Price and Category */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="number"
              placeholder="0.00"
              step="0.01"
              {...register("price")}
              disabled={updating}
              className="pl-7"
            />
          </div>
          {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category *</label>
          <select
            {...register("category")}
            disabled={updating}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select category</option>
            {FOOD_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          placeholder="Describe the food item..."
          {...register("description")}
          disabled={updating}
          rows={3}
        />
      </div>

      {/* Available Toggle */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-lg">
        <input
          type="checkbox"
          id="isAvailable"
          {...register("isAvailable")}
          disabled={updating}
          className="w-4 h-4"
        />
        <label htmlFor="isAvailable" className="text-sm cursor-pointer">
          Available for order
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={updating}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={updating} className="flex-1">
          {updating ? (
            <>
              <Icon icon="eos-icons:loading" className="h-4 w-4 mr-2" />
              Updating...
            </>
          ) : (
            <>
              <Icon icon="solar:check-circle-linear" className="h-4 w-4 mr-2" />
              Update Food
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
