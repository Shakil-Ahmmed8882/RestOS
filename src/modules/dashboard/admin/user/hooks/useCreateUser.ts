"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { userCreateSchema, type UserCreateInput } from "@/modules/dashboard/admin/user/schemas/user-create.schema";
import { useCreateUserMutation } from "@/redux/featureApi/userApi";

export function useCreateUser(onSuccess?: () => void) {
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createUser, { isLoading: creating }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreateInput>({ resolver: zodResolver(userCreateSchema) });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be smaller than 5MB.");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: UserCreateInput) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (photoFile) formData.append("photo", photoFile);

      const res = await createUser(formData).unwrap();

      console.log({res})
      
      toast.success("User created successfully!");
      reset();
      setPhotoPreview(null);
      setPhotoFile(null);
      onSuccess?.();
    } catch (error: any) {
      console.log({error})
      toast.error(error?.data?.message ?? "Failed to create user");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    photoPreview,
    fileInputRef,
    handlePhotoChange,
    onSubmit,
    creating,
  };
}
