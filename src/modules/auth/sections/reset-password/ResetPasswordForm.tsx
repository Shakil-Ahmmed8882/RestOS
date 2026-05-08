"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useResetPassword } from "@/modules/auth/hooks/useResetPassword";

export function ResetPasswordForm() {
  const { register, handleSubmit, errors, showPassword, setShowPassword, showConfirm, setShowConfirm, success, onSubmit, resetLoading } = useResetPassword();

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-md space-y-6 px-8 py-12 lg:px-14"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
            <div className="relative bg-green-100 dark:bg-green-950 rounded-full p-4">
              <Icon icon="solar:check-circle-linear" className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Password reset!</h1>
          <p className="text-sm text-muted-foreground">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="mx-auto w-full max-w-md space-y-7 px-8 py-10 lg:px-14"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Set new password</h1>
        <p className="text-sm text-muted-foreground">
          Enter a new password to secure your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
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
            >
              <Icon icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"} className="h-4 w-4" />
            </button>
          </div>
          <ShowIf condition={!!errors.password}>
            <p className="text-xs text-destructive">{errors.password?.message}</p>
          </ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon icon={showConfirm ? "solar:eye-closed-linear" : "solar:eye-linear"} className="h-4 w-4" />
            </button>
          </div>
          <ShowIf condition={!!errors.confirmPassword}>
            <p className="text-xs text-destructive">{errors.confirmPassword?.message}</p>
          </ShowIf>
        </div>

        <Button type="submit" className="w-full text-white" loading={resetLoading} size="lg">
          Reset password
        </Button>
      </form>

    </div>
  );
}
