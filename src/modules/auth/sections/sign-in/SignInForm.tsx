"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { signInSchema, type SignInInput } from "@/modules/auth/schemas/auth.schema";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInInput) => {
    const toastId = toast.loading("Signing in…");
    const result = await login({
      email: data.email,
      password: data.password,
    });

    if (result?.success) {
      toast.success(`Welcome back!`, { id: toastId });
    } else {
      toast.error(result?.error, { id: toastId });
    }
  };

  const handleGoogleSignIn = () => {
    toast.info("Google OAuth coming soon!");
  };

  return (
    <div
      className="mx-auto w-full max-w-md space-y-7 px-8 py-10 lg:px-14"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your RestOS account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          <ShowIf condition={!!errors.email}>
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"} className="h-4 w-4" />
            </button>
          </div>
          <ShowIf condition={!!errors.password}>
            <p className="text-xs text-destructive">{errors.password?.message}</p>
          </ShowIf>
        </div>

        <Button type="submit" className="w-full text-white" loading={loginLoading} size="lg">
          Sign in
        </Button>

        <Link href="/forgot-password" className="text-center text-sm font-medium text-primary hover:underline">
          Forgot password?
        </Link>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button type="button" variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn} disabled={loginLoading}>
          <Icon icon="logos:google-icon" className="h-5 w-5" />
          Continue with Google
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Sign up free →
        </Link>
      </p>
    </div>
  );
}
