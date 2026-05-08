"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUpSchema, type SignUpInput } from "@/modules/auth/schemas/auth.schema";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export function useSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register: registerUser, registerLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

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

  const onSubmit = async (data: SignUpInput) => {
    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      photo: photoFile || undefined,
    });

    if (result.success) {
      toast.success(`Welcome to RestOS, ${data.name}! 🎉`);
    } else {
      toast.error(result.error);
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
    registerLoading,
  };
}
