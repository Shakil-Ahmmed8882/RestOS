import { Suspense } from "react";
import { SignUpPageLayout } from "@/modules/auth/layout/SignUpPageLayout";

export const metadata = { title: "Sign up — RestOS" };

export default function Page() {
  return (
    <Suspense>
      <SignUpPageLayout />
    </Suspense>
  );
}
