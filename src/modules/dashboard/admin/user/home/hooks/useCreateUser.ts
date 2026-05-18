"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAdminCreateUserMutation } from "@/redux/featureApi/userApi";
import {
  normalizeCreatedUser,
  type CreatedUserRow,
} from "@/redux/featureApi/optimistic/user";
import { UserCreateInput, userCreateSchema } from "../schemas/user-create.schema";

export interface UseCreateUserCallbacks {
  /**
   * Called after the server confirms creation, with the normalised row.
   * This is where the consumer splices the new user into its local list
   * — replacing what would otherwise be a refetch / invalidate.
   */
  onCreated?: (user: CreatedUserRow) => void;
  /** Called after the entire flow succeeds (e.g. navigate to success page). */
  onSuccess?: () => void;
}

export function useCreateUser(callbacks: UseCreateUserCallbacks = {}) {
  const { onCreated, onSuccess } = callbacks;

  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createUser, { isLoading: creating }] = useAdminCreateUserMutation();

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

      const response = await createUser(formData).unwrap();

      // Post-success optimistic update: splice the confirmed row into
      // the consumer's local list instead of triggering a refetch.
      const createdUser = normalizeCreatedUser(response);
      if (createdUser) onCreated?.(createdUser);

      toast.success("User created successfully!");
      reset();
      setPhotoPreview(null);
      setPhotoFile(null);
      onSuccess?.();
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
  };
}
