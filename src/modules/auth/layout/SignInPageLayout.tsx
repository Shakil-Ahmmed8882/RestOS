import { SignInForm } from "@/modules/auth/sections/sign-in/SignInForm";
import { AuthVisualPanel } from "@/modules/auth/sections/AuthVisualPanel";

export function SignInPageLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <SignInForm />
      </div>
      <AuthVisualPanel
        quote="Great food is art. Art is life."
        caption="RestOS — where every order matters"
        tags={["🍕 Fresh Ingredients", "⚡ Fast Delivery", "🎁 Hot Deals", "🌟 Top Rated"]}
      />
    </div>
  );
}
