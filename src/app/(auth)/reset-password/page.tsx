import { Suspense } from "react";
import { ResetPasswordPageLayout } from "@/modules/auth/layout/ResetPasswordPageLayout";

export const metadata = { title: "Reset Password — RestOS" };

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordPageLayout />
    </Suspense>
  );
}
