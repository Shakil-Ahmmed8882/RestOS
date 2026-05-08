import { ForgotPasswordForm } from "@/modules/auth/sections/forgot-password/ForgotPasswordForm";
import { AuthVisualPanel } from "@/modules/auth/sections/AuthVisualPanel";

export function ForgotPasswordPageLayout() {
  return (
    <div className="flex min-h-screen justify-center bg-background">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
