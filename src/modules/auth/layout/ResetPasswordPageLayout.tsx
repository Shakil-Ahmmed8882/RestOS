import { ResetPasswordForm } from "@/modules/auth/sections/reset-password/ResetPasswordForm";


export function ResetPasswordPageLayout() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <ResetPasswordForm />
      </div>
      
    </div>
  );
}
