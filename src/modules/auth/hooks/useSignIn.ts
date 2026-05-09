"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signInSchema, type SignInInput } from "@/modules/auth/schemas/auth.schema";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

export function useSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginLoading } = useAuth();
  const {close} = useMultipageModalSelector(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInInput) => {
    const result = await login({
      email: data.email,
      password: data.password,
    });

    if (result?.success) {
      toast.success(`Welcome back!`);
      close();
    } else {
      toast.error(result?.error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    loginLoading,
    setValue,
  };
}
