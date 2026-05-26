"use client";

import { Icon } from "@iconify/react";
import { ModalWrapper } from "@/components/rest-os-ui/modal/ModalWrapper";
import { Button } from "@/components/ui/button";
import { StepRail } from "@/modules/cart/sections/payment-demo/StepRail";
import { WALLETS } from "@/modules/cart/sections/payment-demo/steps";
import { usePlaceOrderAndPay } from "@/modules/checkout/hooks/usePlaceOrderAndPay";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PHASE_LABEL: Record<"idle" | "placing" | "opening" | "redirecting", string> = {
  idle:        "Continue to payment",
  placing:     "Placing your order…",
  opening:     "Opening secure payment…",
  redirecting: "Redirecting to SSLCommerz…",
};

export function PaymentDemoModal({ open, setOpen }: Props) {
  const checkout = usePlaceOrderAndPay();
  const { items, isLoading, run, phase } = checkout;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const close = () => {
    if (isLoading) return;
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={(v) => (v ? setOpen(true) : close())}>
      <div className="relative overflow-hidden rounded-2xl">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 px-6 pt-6 pb-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Before you pay — quick heads-up</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              You're about to be redirected to the SSLCommerz gateway. Here's the path so it doesn't feel unfamiliar.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={isLoading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800/60"
            aria-label="Close"
          >
            <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
          </button>
        </div>

        {/* Step rail — the whole journey at a glance */}
        <div className="relative px-6 pb-5 pt-2">
          <StepRail current="gateway" />
        </div>

        {/* Body — wallet hint + summary */}
        <div className="relative px-6 pb-2">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-zinc-50 px-4 py-6 text-center text-sm text-muted-foreground ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
              <Icon icon="solar:bag-cross-linear" className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              Your cart was cleared — add items to continue.
            </div>
          ) : (
          <div className="rounded-2xl bg-zinc-50 px-4 py-4 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon icon="solar:smartphone-2-bold-duotone" className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">On SSLCommerz, pick "Mobile Banking"</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Then choose any wallet you use — bKash, Nagad or Rocket. Complete on the gateway and you'll be returned here.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {WALLETS.map((w) => (
                    <span
                      key={w.key}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-foreground ring-1 ring-zinc-200/60 dark:bg-zinc-950/60 dark:ring-white/[0.06]"
                    >
                      <Icon icon={w.icon} className="h-3.5 w-3.5 text-primary" />
                      {w.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          )}

          <div className="mt-3 flex items-center justify-between rounded-xl px-1 py-1 text-xs">
            <span className="text-muted-foreground">
              {items.length} item{items.length === 1 ? "" : "s"}
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              Pay ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-3 flex items-center justify-between gap-2 border-t border-zinc-100 px-6 py-4 dark:border-white/[0.04]">
          <Button
            variant="ghost"
            onClick={close}
            disabled={isLoading}
            className="rounded-full"
          >
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex">
              <Icon icon="solar:shield-check-bold-duotone" className="h-3.5 w-3.5 text-primary" />
              Secured by SSLCommerz
            </span>
            <Button
              onClick={run}
              disabled={isLoading || items.length === 0}
              className="rounded-full px-5"
              aria-live="polite"
            >
              {isLoading ? (
                <>
                  <Icon icon="solar:refresh-bold" className="mr-1.5 h-4 w-4 animate-spin" />
                  {PHASE_LABEL[phase]}
                </>
              ) : (
                <>
                  Continue to payment
                  <Icon icon="solar:arrow-right-linear" className="ml-1.5 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
