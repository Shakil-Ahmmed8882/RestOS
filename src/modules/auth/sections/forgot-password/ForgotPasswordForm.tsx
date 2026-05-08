"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { SuccessModal } from "@/modules/auth/sections/forgot-password/SuccessModal";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
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
    const toastId = toast.loading("Sending reset link…");
    const result = await requestPasswordReset({ email: data.email });

    if (result.success) {
      setSuccessEmail(result.email);
      toast.success("Reset link sent!", { id: toastId });
    } else {
      toast.error(result.error, { id: toastId });
    }
  };

  if (successEmail) {
    return <SuccessModal email={successEmail} />;
  }

  return (
    <div
      className="mx-auto w-full max-w-md space-y-7 px-8 py-10 lg:px-14"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="placeholder:text-gray-400"
          />
          <ShowIf condition={!!errors.email}>
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </ShowIf>
        </div>

        <Button type="submit" className="w-full text-white" loading={forgotLoading} size="lg">
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign in →
        </Link>
      </p>
    </div>
  );
}
