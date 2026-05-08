import { Suspense } from "react";
import { SignInPageLayout } from "@/modules/auth/layout/SignInPageLayout";

export const metadata = { title: "Sign in — RestOS" };

export default function Page() {
  return (
    <Suspense>
      <SignInPageLayout />
    </Suspense>
  );
}
