"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFood } from "@/modules/dashboard/admin/food/hooks/useCreateFood";
import { useGetFoodCategoriesQuery } from "@/redux/featureApi/foodApi";

type Props = {
  onSuccess: () => void;
};

export function AddFoodForm(props: Props) {
  const { onSuccess } = props;
  const { data: categoriesData } = useGetFoodCategoriesQuery();
  const categories = categoriesData?.data || [];

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
          <label htmlFor="foodName" className="text-sm font-medium">
            Food Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="foodName"
            placeholder="e.g., Tacos"
            {...register("foodName")}
            disabled={creating}
          />
          {errors.foodName && (
            <p className="text-xs text-red-500">{errors.foodName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="foodCategory" className="text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="foodCategory"
            {...register("foodCategory")}
            disabled={creating}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.foodCategory && (
            <p className="text-xs text-red-500">{errors.foodCategory.message}</p>
          )}
        </div>
      </div>

      {/* Price & Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              type="text"
              placeholder="0.00"
              {...register("price")}
              disabled={creating}
              className="pl-7"
            />
          </div>
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity <span className="text-red-500">*</span>
          </label>
          <Input
            id="quantity"
            type="text"
            placeholder="e.g., 100"
            {...register("quantity")}
            disabled={creating}
          />
          {errors.quantity && (
            <p className="text-xs text-red-500">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {/* Made By & Food Origin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="made_by" className="text-sm font-medium">
            Chef/Cook Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="made_by"
            placeholder="e.g., Chef Maria"
            {...register("made_by")}
            disabled={creating}
          />
          {errors.made_by && (
            <p className="text-xs text-red-500">{errors.made_by.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="food_origin" className="text-sm font-medium">
            Food Origin <span className="text-red-500">*</span>
          </label>
          <Input
            id="food_origin"
            placeholder="e.g., Mexico"
            {...register("food_origin")}
            disabled={creating}
          />
          {errors.food_origin && (
            <p className="text-xs text-red-500">{errors.food_origin.message}</p>
          )}
        </div>
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
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
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
            Add Food
          </>
        )}
      </Button>
    </form>
  );
}
