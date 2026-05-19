"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { usePlaceOrderAndPay } from "@/modules/checkout/hooks/usePlaceOrderAndPay";

type Props = {
  checkout: ReturnType<typeof usePlaceOrderAndPay>;
};

// Backend creates one Order per cart line and SSLCommerz handles a single
// order at a time. We show the customer the BDT subtotal — delivery/tax are
// not part of the server contract yet, so they're not surfaced.
export function CheckoutSummaryCard(props: Props) {
  const { checkout } = props;
  const { items, subtotal, isLoading, phase, run } = checkout;

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const multiOrder = items.length > 1;

  const buttonLabel =
    phase === "placing"
      ? "Placing order…"
      : phase === "redirecting"
        ? "Redirecting…"
        : "Pay securely";

  return (
    <aside className="space-y-4 self-start rounded-2xl bg-white p-6 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Order summary</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {itemCount} item{itemCount === 1 ? "" : "s"} in cart
        </p>
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium tabular-nums">৳{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-xs text-muted-foreground">Calculated at delivery</span>
        </div>
      </div>

      <Separator />

      <div className="flex items-end justify-between">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-xl font-bold tabular-nums text-foreground">
          ৳{subtotal.toFixed(2)}
        </span>
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full"
        onClick={run}
        disabled={isLoading || items.length === 0}
      >
        <ShowIf
          condition={isLoading}
          fallback={
            <span className="flex items-center gap-2">
              <Icon icon="solar:lock-keyhole-minimalistic-bold-duotone" className="h-4 w-4" />
              {buttonLabel}
            </span>
          }
        >
          <span className="flex items-center gap-2">
            <Icon icon="svg-spinners:ring-resize" className="h-4 w-4" />
            {buttonLabel}
          </span>
        </ShowIf>
      </Button>

      <ShowIf condition={multiOrder}>
        <div className="flex gap-2 rounded-xl bg-primary/5 p-3 text-xs text-primary">
          <Icon icon="solar:info-circle-bold-duotone" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Each item is paid separately. You’ll start with the first one — finish the rest
            from your purchases page.
          </p>
        </div>
      </ShowIf>

      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Icon icon="solar:shield-check-bold-duotone" className="h-3.5 w-3.5 text-primary" />
        Secured by SSLCommerz — bKash, Nagad, Rocket, cards.
      </p>
    </aside>
  );
}
