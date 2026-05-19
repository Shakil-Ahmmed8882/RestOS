import { Container } from "@/components/layouts/Container";
import { ReviewAndPaySection } from "@/modules/checkout/sections/ReviewAndPaySection";

export function CheckoutLayout() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Review & pay</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Confirm your items — you’ll complete payment on our secure gateway.
          </p>
        </header>
        <ReviewAndPaySection />
      </div>
    </Container>
  );
}
