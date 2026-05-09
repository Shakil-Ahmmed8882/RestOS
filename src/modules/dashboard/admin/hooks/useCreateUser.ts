"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { userCreateSchema, type UserCreateInput } from "@/modules/dashboard/admin/schemas/user-create.schema";
import { useCreateUserMutation } from "@/redux/featureApi/userApi";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

export function useCreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const { close } = useMultipageModalSelector();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UserCreateInput>({ resolver: zodResolver(userCreateSchema) });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Photo must be smaller than 10MB.");
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
      formData.append("role", data.role);
      formData.append("status", data.status);
      if (data.contactNumber) formData.append("contactNumber", data.contactNumber);
      if (data.location) formData.append("location", data.location);
      if (photoFile) formData.append("photo", photoFile);

      const result = await createUser(formData).unwrap();

      if (result.success) {
        toast.success("User created successfully!");
        reset();
        setPhotoPreview(null);
        setPhotoFile(null);
        close();
      }
    } catch (error: any) {
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
    watch,
    setValue,
  };
}
