"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { foodCreateSchema, type FoodCreateInput } from "@/modules/dashboard/admin/food/schemas/food-create.schema";
import { useUpdateFoodMutation } from "@/redux/featureApi/foodApi";

export function useUpdateFood(foodId: string) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateFood, { isLoading: updating }] = useUpdateFoodMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FoodCreateInput>({ resolver: zodResolver(foodCreateSchema) });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FoodCreateInput) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        foodName: data.foodName,
        description: data.description,
        price: data.price,
        foodCategory: data.foodCategory,
        quantity: data.quantity,
        made_by: data.made_by,
        food_origin: data.food_origin,
      }));

      if (imageFile) {
        formData.append("file", imageFile);
      }

      await updateFood({ id: foodId, data: formData }).unwrap();

      toast.success("Food updated successfully!");
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update food");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    imagePreview,
    setImagePreview,
    fileInputRef,
    handleImageChange,
    onSubmit,
    updating,
    watch,
    setValue,
  };
}
