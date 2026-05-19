"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import { CHECKOUT_STORAGE_KEYS } from "@/modules/checkout/hooks/usePlaceOrderAndPay";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function PaymentSuccessLayout() {
  const search   = useSearchParams();
  const dispatch = useAppDispatch();
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const transactionId = search.get("transactionId") ?? "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Read stored order IDs before clearing
    const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEYS.pendingOrderIds);
    if (raw) {
      try { setOrderIds(JSON.parse(raw)); } catch { /* ignore */ }
    }

    // Clear cart + invalidate all relevant caches
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
  }, [dispatch]);

  const shortTxn = transactionId
    ? `${transactionId.slice(0, 8)}…${transactionId.slice(-6)}`
    : null;

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0f0f0f] overflow-hidden">

      {/* Ambient glow — top centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/8"
      />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-20">

        {/* ── Check icon ── */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20"
        >
          <Icon
            icon="solar:check-circle-bold-duotone"
            className="h-10 w-10 text-emerald-500"
          />
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
            Payment confirmed
          </h1>
        </motion.div>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 text-center text-[15px] leading-relaxed text-muted-foreground"
        >
          Your order is in the kitchen. We'll keep you updated as it moves
          along.
        </motion.p>

        {/* ── Meta card ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] overflow-hidden"
        >
          {/* Status row */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.04]">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Status
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Paid
            </span>
          </div>

          {/* Transaction ID row */}
          {shortTxn && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.04]">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Transaction
              </span>
              <span className="font-mono text-xs text-foreground">{shortTxn}</span>
            </div>
          )}

          {/* Orders row */}
          {orderIds.length > 0 && (
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Orders
              </span>
              <span className="text-xs font-semibold tabular-nums text-foreground">
                {orderIds.length} item{orderIds.length > 1 ? "s" : ""} confirmed
              </span>
            </div>
          )}
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col gap-3"
        >
          <Link
            href="/user/dashboard/purchasedList"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            <Icon icon="solar:bag-check-bold-duotone" className="h-4.5 w-4.5" />
            View my purchases
          </Link>
          <Link
            href="/food"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 text-[15px] font-semibold text-foreground transition-colors hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
          >
            Browse more food
          </Link>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 flex items-center gap-1.5 text-[12px] text-muted-foreground"
        >
          <Icon
            icon="solar:shield-check-bold-duotone"
            className="h-3.5 w-3.5 text-primary shrink-0"
          />
          Secured by SSLCommerz
        </motion.p>
      </div>
    </div>
  );
}
