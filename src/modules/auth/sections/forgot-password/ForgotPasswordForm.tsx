"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useForgotPassword } from "@/modules/auth/hooks/useForgotPassword";
import { SuccessAuthModal } from "@/modules/auth/sections/forgot-password/SuccessModal";
import { AuthInput } from "@/modules/auth/components/AuthInput";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";

export function ForgotPasswordForm() {
  const { register, handleSubmit, errors, successEmail, setSuccessEmail, onSubmit, forgotLoading } = useForgotPassword();
  const { goBack } = useMultipageModalSelector();

  if (successEmail) {
    return <SuccessAuthModal email={successEmail} onClose={() => setSuccessEmail(null)} />;
  }

  return (
    <div
      className="w-full space-y-5 p-8 bg-white dark:bg-[#121212]  rounded-2xl"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3">

          <Label htmlFor="email">Email</Label>
          <AuthInput
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          <ShowIf condition={!!errors.email}>
            <p className="text-xs text-destructive">{errors.email?.message}</p>
          </ShowIf>
        </div>

        <Button type="submit" className="w-full text-white rounded-full" loading={forgotLoading} size="lg">
          Send reset link
        </Button>
      </form>

      <div className=" text-center">
        <button
          type="button"
          onClick={() => goBack()}
          className="text-sm text-primary hover:underline"
        >
          Back to Sign in
        </button>
      </div>
    </div>
  );
}
