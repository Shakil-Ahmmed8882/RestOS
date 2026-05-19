"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useInitiatePaymentMutation } from "@/redux/featureApi/paymentApi";
import { CHECKOUT_STORAGE_KEYS } from "@/modules/checkout/hooks/usePlaceOrderAndPay";

type ErrorVariant = "failed" | "cancelled";

type Props = { variant: ErrorVariant };

const COPY = {
  failed: {
    icon: "solar:shield-warning-bold-duotone",
    badge: "Payment failed",
    badgeClass: "bg-primary/10 text-primary",
    dotClass: "bg-primary",
    title: "Something went wrong",
    body: "The payment couldn't be completed. No money was taken. Your cart and open orders are safe — try again whenever you're ready.",
    primaryCta: "Retry payment",
    glow: "bg-primary/8 dark:bg-primary/6",
  },
  cancelled: {
    icon: "solar:close-circle-bold-duotone",
    badge: "Cancelled",
    badgeClass: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
    dotClass: "bg-zinc-400",
    title: "Payment cancelled",
    body: "You chose to stop the payment. No charge was made. Your cart is waiting — come back whenever you're ready.",
    primaryCta: "Back to cart",
    glow: "bg-zinc-400/6 dark:bg-zinc-600/8",
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function PaymentErrorLayout(props: Props) {
  const { variant } = props;
  const copy        = COPY[variant];
  const search      = useSearchParams();
  const router      = useRouter();

  const [pendingOrderIds, setPendingOrderIds] = useState<string[]>([]);
  const [initiatePayment, { isLoading: retrying }] = useInitiatePaymentMutation();

  const transactionId = search.get("transactionId") ?? "";
  const shortTxn = transactionId
    ? `${transactionId.slice(0, 8)}…${transactionId.slice(-6)}`
    : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEYS.pendingOrderIds);
    if (raw) {
      try { setPendingOrderIds(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const retry = async () => {
    if (pendingOrderIds.length === 0) {
      toast.error("No orders to retry. Please go back to your cart.");
      router.push("/cart");
      return;
    }
    try {
      const body =
        pendingOrderIds.length === 1
          ? { orderId: pendingOrderIds[0] }
          : { orderIds: pendingOrderIds };
      const res = await initiatePayment(body).unwrap();
      const url = res?.data?.paymentUrl;
      if (!url) throw new Error("Gateway did not return a redirect URL.");
      window.location.href = url;
    } catch (err) {
      const message =
        (err as { data?: { message?: string }; message?: string })?.data?.message ??
        (err as { message?: string })?.message ??
        "Could not restart payment. Try again in a moment.";
      toast.error(message);
    }
  };

  const hasPendingOrders = pendingOrderIds.length > 0;

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0f0f0f] overflow-hidden">

      {/* Ambient glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[120px] ${copy.glow}`}
      />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-20">

        {/* ── Icon ── */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.05 }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20"
        >
          <Icon icon={copy.icon} className="h-10 w-10 text-primary" />
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-2 text-center"
        >
          <h1 className="text-[28px] font-bold tracking-tight text-foreground">
            {copy.title}
          </h1>
        </motion.div>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 text-center text-[15px] leading-relaxed text-muted-foreground"
        >
          {copy.body}
        </motion.p>

        {/* ── Meta card — only rendered when we have context data ── */}
        {(shortTxn || hasPendingOrders) && (
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-8 w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] overflow-hidden"
          >
            {/* Status */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.04]">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </span>
              <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${copy.badgeClass}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${copy.dotClass}`} />
                {copy.badge}
              </span>
            </div>

            {/* Transaction ref */}
            {shortTxn && (
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.04]">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Reference
                </span>
                <span className="font-mono text-xs text-foreground">{shortTxn}</span>
              </div>
            )}

            {/* Pending orders */}
            {hasPendingOrders && (
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Awaiting payment
                </span>
                <span className="text-xs font-semibold tabular-nums text-foreground">
                  {pendingOrderIds.length} order{pendingOrderIds.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* ── CTAs ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col gap-3"
        >
          {/* Primary CTA — retry for failed, back-to-cart for cancelled */}
          {variant === "failed" && hasPendingOrders ? (
            <button
              type="button"
              disabled={retrying}
              onClick={retry}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60"
            >
              {retrying ? (
                <>
                  <Icon icon="svg-spinners:ring-resize" className="h-4 w-4" />
                  Redirecting…
                </>
              ) : (
                <>
                  <Icon icon="solar:play-circle-bold-duotone" className="h-4 w-4" />
                  Retry payment
                </>
              )}
            </button>
          ) : (
            <Link
              href="/cart"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
            >
              <Icon icon="solar:cart-large-2-bold-duotone" className="h-4 w-4" />
              Back to cart
            </Link>
          )}

          {/* Secondary CTA */}
          <Link
            href="/user/dashboard/purchasedList"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 text-[15px] font-semibold text-foreground transition-colors hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
          >
            View purchases
          </Link>
        </motion.div>

        {/* ── Help line ── */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 text-center text-[12px] text-muted-foreground"
        >
          Need help?{" "}
          <Link
            href="/food"
            className="text-primary underline-offset-2 hover:underline"
          >
            Browse menu
          </Link>
          {" · "}
          <Link
            href="/user/dashboard/purchasedList"
            className="text-primary underline-offset-2 hover:underline"
          >
            My orders
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
