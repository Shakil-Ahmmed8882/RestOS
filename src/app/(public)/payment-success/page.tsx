import { PaymentCallbackLayout } from "@/modules/payment-callback/PaymentCallbackLayout";

export const metadata = { title: "Payment confirmed — RestOS" };

export default function Page() {
  return <PaymentCallbackLayout variant="success" />;
}
