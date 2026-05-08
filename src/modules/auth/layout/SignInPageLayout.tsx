import { SignInForm } from "@/modules/auth/sections/sign-in/SignInForm";


export function SignInPageLayout() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <SignInForm />
      </div>

    </div>
  );
}
