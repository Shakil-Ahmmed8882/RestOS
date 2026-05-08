import { Suspense } from "react";
import { ForgotPasswordPageLayout } from "@/modules/auth/layout/ForgotPasswordPageLayout";

export const metadata = { title: "Forgot Password — RestOS" };

export default function Page() {
  return (
    <Suspense>
      <ForgotPasswordPageLayout />
    </Suspense>
  );
}
