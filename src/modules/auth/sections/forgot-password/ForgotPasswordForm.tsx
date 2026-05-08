"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useForgotPassword } from "@/modules/auth/hooks/useForgotPassword";
import { SuccessAuthModal } from "@/modules/auth/sections/forgot-password/SuccessModal";

export function ForgotPasswordForm() {
  const { register, handleSubmit, errors, successEmail, setSuccessEmail, onSubmit, forgotLoading } = useForgotPassword();

  if (successEmail) {
    return <SuccessAuthModal email={successEmail} onClose={() => setSuccessEmail(null)} />;
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

    </div>
  );
}
