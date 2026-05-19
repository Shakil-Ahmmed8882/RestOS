"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import { CHECKOUT_STORAGE_KEYS } from "@/modules/checkout/hooks/usePlaceOrderAndPay";
import { useInitiatePaymentMutation } from "@/redux/featureApi/paymentApi";
import { toast } from "sonner";

export type PaymentCallbackVariant = "success" | "failed" | "cancelled";

type CopyConfig = {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const COPY: Record<PaymentCallbackVariant, CopyConfig> = {
  success: {
    icon: "solar:check-circle-bold-duotone",
    iconClass: "text-emerald-500",
    title: "Payment confirmed",
    description: "Thanks — your order is on the way. A receipt is available in your purchases.",
    primaryCta: { label: "View purchases", href: "/user/dashboard/purchasedList" },
    secondaryCta: { label: "Back to menu", href: "/food" },
  },
  failed: {
    icon: "solar:shield-warning-bold-duotone",
    iconClass: "text-primary",
    title: "Payment didn't go through",
    description: "Your card or wallet rejected the charge. You can retry with the same orders.",
    primaryCta: { label: "Retry payment", href: "#retry" },
    secondaryCta: { label: "Back to cart", href: "/cart" },
  },
  cancelled: {
    icon: "solar:close-circle-bold-duotone",
    iconClass: "text-primary",
    title: "Payment cancelled",
    description: "No charge was made. Your cart is still here whenever you're ready.",
    primaryCta: { label: "Back to cart", href: "/cart" },
    secondaryCta: { label: "Retry payment", href: "#retry" },
  },
};

type Props = { variant: PaymentCallbackVariant };

export function PaymentCallbackCard(props: Props) {
  const { variant } = props;
  const search   = useSearchParams();
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const [initiatePayment, { isLoading: retrying }] = useInitiatePaymentMutation();

  // Read the stored order IDs that were placed before the gateway redirect.
  const [pendingOrderIds, setPendingOrderIds] = useState<string[]>([]);

  const transactionId = search.get("transactionId");
  const copy = useMemo(() => COPY[variant], [variant]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEYS.pendingOrderIds);
    if (raw) {
      try { setPendingOrderIds(JSON.parse(raw)); } catch { /* ignore */ }
    }

    // SUCCESS — clear cart and invalidate all payment/order caches.
    if (variant === "success") {
      dispatch(clearCart());
      dispatch(
        baseApi.util.invalidateTags([
          API_CACHE_TAGS.PAYMENT_HISTORY,
          API_CACHE_TAGS.ORDER_LIST,
          API_CACHE_TAGS.ORDER_PENDING,
          API_CACHE_TAGS.ORDER_PURCHASED,
          API_CACHE_TAGS.ORDER_SUMMARY,
        ]),
      );
      sessionStorage.removeItem(CHECKOUT_STORAGE_KEYS.pendingOrderIds);
      sessionStorage.removeItem(CHECKOUT_STORAGE_KEYS.pendingTxnId);
      sessionStorage.removeItem(CHECKOUT_STORAGE_KEYS.pendingTotal);
    }
  }, [variant, dispatch]);

  // Retry sends all original orderIds in one session — same as the first attempt.
  const retry = async () => {
    if (pendingOrderIds.length === 0) {
      toast.error("Can't find the original orders. Please add items to your cart again.");
      router.push("/cart");
      return;
    }
    try {
      const body = pendingOrderIds.length === 1
        ? { orderId: pendingOrderIds[0] }
        : { orderIds: pendingOrderIds };

      const res = await initiatePayment(body).unwrap();
      const url = res?.data?.paymentUrl;
      if (!url) throw new Error("Gateway didn't return a redirect URL.");
      window.location.href = url;
    } catch (err) {
      const message =
        (err as { data?: { message?: string }; message?: string })?.data?.message ??
        (err as { message?: string })?.message ??
        "Could not start payment. Please try again in a moment.";
      toast.error(message);
    }
  };

  const renderCta = (cta: CopyConfig["primaryCta"], primary: boolean) => {
    if (cta.href === "#retry") {
      return (
        <Button
          key={cta.label}
          variant={primary ? "default" : "ghost"}
          size="lg"
          onClick={retry}
          disabled={retrying || pendingOrderIds.length === 0}
          className="w-full"
        >
          {retrying ? "Restarting payment…" : cta.label}
        </Button>
      );
    }
    return (
      <Button key={cta.label} asChild variant={primary ? "default" : "ghost"} size="lg" className="w-full">
        <Link href={cta.href}>{cta.label}</Link>
      </Button>
    );
  };

  return (
    <section className="space-y-6 rounded-2xl bg-white p-8 text-center ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-silk-with-hover">
          <Icon icon={copy.icon} className={`h-9 w-9 ${copy.iconClass}`} />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{copy.title}</h1>
        <p className="text-sm text-muted-foreground">{copy.description}</p>
      </div>

      <ShowIf condition={!!transactionId}>
        <div className="rounded-xl bg-silk-with-hover px-4 py-3 text-left">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Transaction ID
          </p>
          <p className="mt-0.5 break-all font-mono text-xs text-foreground">{transactionId}</p>
        </div>
      </ShowIf>

      <div className="space-y-2 pt-2">
        {renderCta(copy.primaryCta, true)}
        <ShowIf condition={!!copy.secondaryCta}>
          {copy.secondaryCta ? renderCta(copy.secondaryCta, false) : null}
        </ShowIf>
      </div>
    </section>
  );
}
