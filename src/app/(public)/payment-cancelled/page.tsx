import { PaymentCallbackLayout } from "@/modules/payment-callback/PaymentCallbackLayout";

export const metadata = { title: "Payment cancelled — RestOS" };

export default function Page() {
  return <PaymentCallbackLayout variant="cancelled" />;
}
