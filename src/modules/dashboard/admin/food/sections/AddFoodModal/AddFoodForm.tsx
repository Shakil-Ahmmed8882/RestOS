"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFood } from "@/modules/dashboard/admin/food/hooks/useCreateFood";

const FOOD_CATEGORIES = [
  "Mexican",
  "British",
  "Italian",
  "Thai",
  "Indian",
  "American",
  "Chinese",
  "Japanese",
  "French",
  "Mediterranean",
];

type Props = {
  onSuccess: () => void;
};

export function AddFoodForm(props: Props) {
  const { onSuccess } = props;
  const {
    register,
    handleSubmit,
    errors,
    imagePreview,
    fileInputRef,
    handleImageChange,
    onSubmit: handleFormSubmit,
    creating,
  } = useCreateFood();

  const onSubmit = async (data: any) => {
    await handleFormSubmit(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Image Upload - Top */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Food Image</label>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 dark:hover:border-zinc-600 transition-colors bg-gray-50 dark:bg-zinc-900/20"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <div className="space-y-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 mx-auto object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <Icon icon="solar:refresh-linear" className="h-4 w-4 mr-2" />
                Change Image
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Icon icon="solar:cloud-upload-linear" className="h-8 w-8 mx-auto opacity-50" />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or WebP (max 5MB)
                </p>
              </div>
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

      {/* Food Name & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Food Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            placeholder="e.g., Tacos"
            {...register("name")}
            disabled={creating}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register("category")}
            disabled={creating}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select category</option>
            {FOOD_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">
          Price <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            {...register("price")}
            disabled={creating}
            className="pl-7"
          />
        </div>
        {errors.price && (
          <p className="text-xs text-red-500">{errors.price.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Describe the food item..."
          {...register("description")}
          disabled={creating}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Available Toggle */}
      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
        <input
          type="checkbox"
          id="isAvailable"
          {...register("isAvailable")}
          disabled={creating}
          className="w-4 h-4 rounded"
        />
        <label htmlFor="isAvailable" className="text-sm cursor-pointer font-medium">
          Available for ordering
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={creating}
        className="w-full h-10 text-base font-medium"
      >
        {creating ? (
          <>
            <Icon icon="eos-icons:loading" className="h-4 w-4 mr-2 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Icon icon="solar:plus-circle-linear" className="h-4 w-4 mr-2" />
            Add Food Item
          </>
        )}
      </Button>
    </form>
  );
}
