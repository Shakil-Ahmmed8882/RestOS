"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const { requestPasswordReset, forgotLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    const result = await requestPasswordReset({ email: data.email });

    if (result.success) {
      setSuccessEmail(result.email);
      toast.success("Reset link sent!");
    } else {
      toast.error(result.error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    successEmail,
    setSuccessEmail,
    onSubmit,
    forgotLoading,
  };
}
