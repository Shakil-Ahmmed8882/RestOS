"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import orderApi, {
  useCreateOrderMutation,
  type CreateOrderResponse,
  type OrderDoc,
  type OrderListResponse,
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
  const [phase, setPhase] = useState<"idle" | "placing" | "opening" | "redirecting">("idle");
  const inFlight = useRef(false);

  const isLoading =
    createOrderState.isLoading || initiatePaymentState.isLoading || phase !== "idle";

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const run = async () => {
    if (inFlight.current) return;
    if (!user?.id) {
      toast.error("Please sign in to continue checkout.");
      router.push("/auth/login");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    inFlight.current = true;
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

      let orders = flattenOrders(response);

      // Backend silently drops duplicate / out-of-stock lines. If everything
      // got dropped, the user already has those orders sitting in "pending".
      // Look them up and continue to SSLCommerz with them — same end result,
      // no dead-end UI.
      if (orders.length === 0) {
        toast.loading("Resuming your pending orders…", { id: toastId });
        const pendingResult = await dispatch(
          orderApi.endpoints.getAllOrders.initiate([
            { name: "status", value: "pending" },
            { name: "user",   value: user.id },
            { name: "limit",  value: "50" },
          ]),
        ).unwrap() as OrderListResponse;

        const pending = pendingResult?.data?.result ?? [];
        const cartFoodIds = new Set(items.map((it) => it.id));
        orders = pending.filter((o) => {
          const foodId =
            typeof o?.food === "object" && o?.food !== null
              ? (o.food as { _id?: string })?._id
              : (o?.food as string | undefined);
          return !!o?._id && (!foodId || cartFoodIds.has(foodId));
        });

        if (orders.length === 0) {
          throw new Error(
            "These items are already ordered, but no pending order could be found to pay for. Visit your purchases page to check status.",
          );
        }
      } else if (orders.length < items.length) {
        toast.warning(
          `${items.length - orders.length} item(s) were already in an open order — paying for everything together.`,
        );
      }

      // STEP 2 — one SSLCommerz session for all orders (backend sums totals)
      const orderIds = orders.map((o) => o._id).filter(Boolean);
      sessionStorage.setItem(PENDING_ORDER_IDS, JSON.stringify(orderIds));

      setPhase("opening");
      toast.loading("Opening secure payment…", { id: toastId });

      const initiateResponse = await initiatePayment({ orderIds }).unwrap();
      const paymentUrl    = initiateResponse?.data?.paymentUrl;
      const transactionId = initiateResponse?.data?.transactionId;
      const totalAmount   = initiateResponse?.data?.totalAmount;

      if (!paymentUrl) {
        throw new Error("Payment gateway did not return a redirect URL.");
      }

      if (transactionId) sessionStorage.setItem(PENDING_TXN_ID, transactionId);
      if (totalAmount)   sessionStorage.setItem(PENDING_TOTAL,   String(totalAmount));

      setPhase("redirecting");
      toast.loading("Redirecting to SSLCommerz…", { id: toastId });

      // STEP 3 — full-page redirect. Cart cleared ONLY on the success page.
      // setTimeout lets React paint the "Redirecting…" frame before the page
      // tears down, so the user sees the final status, not a frozen UI.
      setTimeout(() => { window.location.href = paymentUrl; }, 50);
    } catch (err) {
      inFlight.current = false;
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
    // Legacy flags kept for `ReviewAndPaySection` (the /checkout route).
    // The new cart-side `PaymentDemoModal` does not use them — duplicate
    // orders are now resumed inline by `run()` itself.
    showDuplicateModal: false as boolean,
    closeDuplicateModal: () => {},
  };
}

export const CHECKOUT_STORAGE_KEYS = {
  pendingOrderIds: PENDING_ORDER_IDS,
  pendingTxnId:    PENDING_TXN_ID,
  pendingTotal:    PENDING_TOTAL,
} as const;
