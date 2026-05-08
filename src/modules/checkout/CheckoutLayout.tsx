import { Container } from "@/components/layouts/Container";
import { CheckoutForm } from "@/modules/checkout/sections/CheckoutForm";

export function CheckoutLayout() {
  return (
    <Container className="py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>
      <CheckoutForm />
    </Container>
  );
}
