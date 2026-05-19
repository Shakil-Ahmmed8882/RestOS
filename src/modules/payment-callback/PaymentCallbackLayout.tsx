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
        <PaymentCallbackCard variant={variant} />
      </div>
    </Container>
  );
}
