"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useCreateOrderMutation,
  type CreateOrderResponse,
  type OrderDoc,
} from "@/redux/featureApi/orderApi";
import { useInitiatePaymentMutation } from "@/redux/featureApi/paymentApi";

const PENDING_ORDER_IDS = "checkout.pendingOrderIds";
const PENDING_TXN_ID    = "checkout.pendingTxnId";
const PENDING_TOTAL     = "checkout.pendingTotal";

// Flattens the doubly-nested response shape the backend returns:
//   data: [[OrderDoc], [OrderDoc], ...]  →  OrderDoc[]
function flattenOrders(response: CreateOrderResponse): OrderDoc[] {
  const data = response?.data ?? [];
  if (!Array.isArray(data)) return [];
  return (data as unknown[]).flat().filter((o): o is OrderDoc =>
    !!o && typeof o === "object" && "_id" in (o as Record<string, unknown>),
  );
}

export function usePlaceOrderAndPay() {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const items    = useAppSelector((s) => s.cart.items);
  const user     = useAppSelector((s) => s.auth.user);

  const [createOrder,    createOrderState]    = useCreateOrderMutation();
  const [initiatePayment, initiatePaymentState] = useInitiatePaymentMutation();
  const [phase, setPhase] = useState<"idle" | "placing" | "redirecting">("idle");
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const isLoading =
    createOrderState.isLoading || initiatePaymentState.isLoading || phase !== "idle";

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const run = async () => {
    if (!user?.id) {
      toast.error("Please sign in to continue checkout.");
      router.push("/auth/login");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const toastId = toast.loading("Placing your order…");
    setPhase("placing");

    try {
      // STEP 1 — create one Order doc per cart line
      const response = await createOrder({
        cartItems: items.map((it) => ({
          food:       it.id,
          user:       user.id,
          foodName:   it.name,
          quantity:   it.quantity,
          price:      it.price,
          totalPrice: Number((it.price * it.quantity).toFixed(2)),
        })),
      }).unwrap();

      const orders = flattenOrders(response);

      // Backend silently drops duplicate / out-of-stock lines — open the
      // AlreadyOrderedModal instead of crashing.
      if (orders.length === 0) {
        toast.dismiss(toastId);
        setPhase("idle");
        setShowDuplicateModal(true);
        return;
      }

      if (orders.length < items.length) {
        toast.warning(
          `${items.length - orders.length} item(s) couldn't be ordered — already in an open order or out of stock.`,
        );
      }

      // STEP 2 — one SSLCommerz session for all orders (backend sums totals)
      const orderIds = orders.map((o) => o._id);
      sessionStorage.setItem(PENDING_ORDER_IDS, JSON.stringify(orderIds));

      setPhase("redirecting");
      toast.loading("Redirecting to secure payment…", { id: toastId });

      const initiateResponse = await initiatePayment({ orderIds }).unwrap();
      const paymentUrl    = initiateResponse?.data?.paymentUrl;
      const transactionId = initiateResponse?.data?.transactionId;
      const totalAmount   = initiateResponse?.data?.totalAmount;

      if (!paymentUrl) {
        throw new Error("Payment gateway did not return a redirect URL.");
      }

      if (transactionId) sessionStorage.setItem(PENDING_TXN_ID, transactionId);
      if (totalAmount)   sessionStorage.setItem(PENDING_TOTAL,   String(totalAmount));

      // STEP 3 — full-page redirect. Cart cleared ONLY on the success page.
      window.location.href = paymentUrl;
    } catch (err) {
      setPhase("idle");
      const message =
        (err as { data?: { message?: string }; message?: string })?.data?.message ??
        (err as { message?: string })?.message ??
        "Checkout failed. Please try again.";
      toast.error(message, { id: toastId });
    }
  };

  return {
    items,
    user,
    subtotal,
    isLoading,
    phase,
    run,
    dispatch,
    showDuplicateModal,
    closeDuplicateModal: () => setShowDuplicateModal(false),
  };
}

export const CHECKOUT_STORAGE_KEYS = {
  pendingOrderIds: PENDING_ORDER_IDS,
  pendingTxnId:    PENDING_TXN_ID,
  pendingTotal:    PENDING_TOTAL,
} as const;
