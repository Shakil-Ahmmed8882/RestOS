import { SignUpForm } from "@/modules/auth/sections/sign-up/SignUpForm";


export function SignUpPageLayout() {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-background">
        <SignUpForm />
    </div>
  );
}
