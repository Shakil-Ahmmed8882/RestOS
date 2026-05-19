"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentErrorLayout } from "@/modules/payment-result/error/PaymentErrorLayout";

function ErrorPage() {
  const search  = useSearchParams();
  const raw     = search.get("variant");
  const variant = raw === "cancelled" ? "cancelled" : "failed";

  return <PaymentErrorLayout variant={variant} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ErrorPage />
    </Suspense>
  );
}
