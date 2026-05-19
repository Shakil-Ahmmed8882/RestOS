import { Suspense } from "react";
import { Container } from "@/components/layouts/Container";
import { PaymentCallbackCard, type PaymentCallbackVariant } from "@/modules/payment-callback/sections/PaymentCallbackCard";

type Props = {
  variant: PaymentCallbackVariant;
};

export function PaymentCallbackLayout(props: Props) {
  const { variant } = props;
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md">
        <Suspense fallback={null}>
          <PaymentCallbackCard variant={variant} />
        </Suspense>
      </div>
    </Container>
  );
}
