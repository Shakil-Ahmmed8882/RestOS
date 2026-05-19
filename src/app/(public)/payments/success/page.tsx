import { Suspense } from "react";
import { PaymentSuccessLayout } from "@/modules/payment-result/success/PaymentSuccessLayout";

export const metadata = { title: "Payment confirmed — RestOS" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessLayout />
    </Suspense>
  );
}
