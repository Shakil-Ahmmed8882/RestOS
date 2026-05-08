import { ForgotPasswordForm } from "@/modules/auth/sections/forgot-password/ForgotPasswordForm";
import { AuthVisualPanel } from "@/modules/auth/sections/AuthVisualPanel";

export function ForgotPasswordPageLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <ForgotPasswordForm />
      </div>
      <AuthVisualPanel
        quote="Secure your account."
        caption="We'll help you reset your password safely."
        tags={["🔒 Secure reset", "⚡ Instant link", "✅ Email verified", "🛡️ Protected"]}
      />
    </div>
  );
}
