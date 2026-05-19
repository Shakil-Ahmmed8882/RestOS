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

// STATE: client-side pointers for the SSLCommerz round-trip. The success/fail
// pages read these to know which order the user just paid for and whether
// extra orders are still awaiting payment.
const PENDING_ORDER_ID = "checkout.pendingOrderId";
const PENDING_ORDER_IDS = "checkout.pendingOrderIds";
const PENDING_TXN_ID = "checkout.pendingTxnId";

// Flattens the doubly-nested response shape into a flat Order[].
// The backend silently drops duplicate / out-of-stock lines, so the returned
// length may be < cartItems.length.
function flattenOrders(response: CreateOrderResponse): OrderDoc[] {
  const data = response?.data ?? [];
  if (!Array.isArray(data)) return [];
  return (data as unknown[]).flat().filter((o): o is OrderDoc => {
    return !!o && typeof o === "object" && "_id" in (o as Record<string, unknown>);
  });
}

export function usePlaceOrderAndPay() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const user = useAppSelector((s) => s.auth.user);

  const [createOrder, createOrderState] = useCreateOrderMutation();
  const [initiatePayment, initiatePaymentState] = useInitiatePaymentMutation();
  const [phase, setPhase] = useState<"idle" | "placing" | "redirecting">("idle");

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
      // STEP 1 — POST /orders/create-order with the strict cartItems contract.
      const payload = {
        cartItems: items.map((it) => ({
          food: it.id,
          user: user.id,
          foodName: it.name,
          quantity: it.quantity,
          price: it.price,
          totalPrice: Number((it.price * it.quantity).toFixed(2)),
        })),
      };

      const response = await createOrder(payload).unwrap();
      const orders = flattenOrders(response);

      if (orders.length === 0) {
        throw new Error(
          "No items could be ordered. They may be out of stock or already in an open order.",
        );
      }

      // Surface the silent-skip backend gap to the user.
      if (orders.length < items.length) {
        toast.warning(
          `${items.length - orders.length} item(s) couldn't be ordered — they may be out of stock.`,
        );
      }

      // STEP 2 — pay for the first order. Other orders linger as
      // "pending payment" and the user can finish them from the purchases page.
      const primary = orders[0];
      sessionStorage.setItem(PENDING_ORDER_ID, primary._id);
      sessionStorage.setItem(
        PENDING_ORDER_IDS,
        JSON.stringify(orders.map((o) => o._id)),
      );

      setPhase("redirecting");
      toast.loading("Redirecting to secure payment…", { id: toastId });

      const initiateResponse = await initiatePayment({ orderId: primary._id }).unwrap();
      const paymentUrl = initiateResponse?.data?.paymentUrl;
      const transactionId = initiateResponse?.data?.transactionId;

      if (!paymentUrl) {
        throw new Error("Payment gateway did not return a redirect URL.");
      }

      if (transactionId) {
        sessionStorage.setItem(PENDING_TXN_ID, transactionId);
      }

      // STEP 3 — full-page redirect. Cart is intentionally NOT cleared here;
      // the success page clears it after the gateway confirms payment.
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
  };
}

export const CHECKOUT_STORAGE_KEYS = {
  pendingOrderId: PENDING_ORDER_ID,
  pendingOrderIds: PENDING_ORDER_IDS,
  pendingTxnId: PENDING_TXN_ID,
} as const;
