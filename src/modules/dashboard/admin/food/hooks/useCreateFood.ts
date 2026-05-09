"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { foodCreateSchema, type FoodCreateInput } from "@/modules/dashboard/admin/food/schemas/food-create.schema";
import { useCreateFoodMutation } from "@/redux/featureApi/foodApi";

export function useCreateFood() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createFood, { isLoading: creating }] = useCreateFoodMutation();

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
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        isAvailable: data.isAvailable,
      }));

      if (imageFile) {
        formData.append("file", imageFile);
      }

      await createFood(formData).unwrap();

      toast.success("Food created successfully!");
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to create food");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    imagePreview,
    fileInputRef,
    handleImageChange,
    onSubmit,
    creating,
    watch,
    setValue,
  };
}
