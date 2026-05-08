import { ResetPasswordForm } from "@/modules/auth/sections/reset-password/ResetPasswordForm";
import { AuthVisualPanel } from "@/modules/auth/sections/AuthVisualPanel";

export function ResetPasswordPageLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <ResetPasswordForm />
      </div>
      <AuthVisualPanel
        quote="New password, new start."
        caption="Create a strong password to protect your account."
        tags={["🔐 Strong security", "✨ Fresh start", "🚀 Get going", "💪 Protected"]}
      />
    </div>
  );
}
