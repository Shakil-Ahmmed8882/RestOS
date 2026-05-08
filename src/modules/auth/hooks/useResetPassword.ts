"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export function useResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetUserPassword, resetLoading } = useAuth();

  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token || !userId) {
      toast.error("Invalid reset link. Please request a new one.");
      router.push("/forgot-password");
    }
  }, [token, userId, router]);

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token || !userId) return;

    const result = await resetUserPassword({
      token,
      newPassword: data.password,
      userId,
    });

    if (result.success) {
      setSuccess(true);
      toast.success("Password reset successfully!");
      setTimeout(() => router.push("/sign-in"), 2000);
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
    showConfirm,
    setShowConfirm,
    success,
    onSubmit,
    resetLoading,
  };
}
