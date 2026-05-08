import { SignUpForm } from "@/modules/auth/sections/sign-up/SignUpForm";
import { AuthVisualPanel } from "@/modules/auth/sections/AuthVisualPanel";

export function SignUpPageLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AuthVisualPanel
        quote="Join 50,000+ food lovers."
        caption="Unlock exclusive deals, fast delivery, and a world of flavors."
        tags={["✅ Free to join", "🎁 Welcome offer", "🚀 Instant access", "📦 Track orders"]}
      />
      <div className="flex w-full items-center justify-center md:w-1/2">
        <SignUpForm />
      </div>
    </div>
  );
}
