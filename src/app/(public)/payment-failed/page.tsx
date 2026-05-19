import { PaymentCallbackLayout } from "@/modules/payment-callback/PaymentCallbackLayout";

export const metadata = { title: "Payment failed — RestOS" };

export default function Page() {
  return <PaymentCallbackLayout variant="failed" />;
}
