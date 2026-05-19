"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BaseImage } from "@/components/common/BaseImage";
import { useInitiatePaymentMutation } from "@/redux/featureApi/paymentApi";
import { useUserPendingOrders, type OrderDoc } from "@/redux/featureApi/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import type { CartItem } from "@/redux/slices/cartSlice";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
};

export function AlreadyOrderedModal(props: Props) {
  const { open, onOpenChange, cartItems } = props;

  // Fetch pending orders as soon as the modal mounts so Page 2 is already
  // loaded when the user navigates to it, and Page 1 can reflect real state.
  const user = useAppSelector((s) => s.auth.user);
  const { pendingOrders, isLoading } = useUserPendingOrders(open ? user?.id : undefined);

  return (
    <MultipageModal
      open={open}
      onOpenChange={onOpenChange}
      initialPageId="already-ordered"
    >
      <MultipageModal.Page id="already-ordered" maxWidth="max-w-[520px]">
        <AlreadyOrderedPage
          cartItems={cartItems}
          pendingOrders={pendingOrders}
          isLoadingPending={isLoading}
        />
      </MultipageModal.Page>

      <MultipageModal.Page id="pending-payments" backTitle="Back" maxWidth="max-w-[520px]">
        <PendingOrdersPage
          pendingOrders={pendingOrders}
          isLoading={isLoading}
        />
      </MultipageModal.Page>
    </MultipageModal>
  );
}

// ── Page 1: Already ordered ─────────────────────────────────────────────────

type AlreadyOrderedPageProps = {
  cartItems: CartItem[];
  pendingOrders: OrderDoc[];
  isLoadingPending: boolean;
};

function AlreadyOrderedPage(props: AlreadyOrderedPageProps) {
  const { cartItems, pendingOrders, isLoadingPending } = props;
  const { goTo, close } = useMultipageModalSelector();

  const hasPendingOrders = pendingOrders.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon icon="solar:bag-check-bold-duotone" className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Already ordered
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            These items are already in an open order awaiting payment.{" "}
            {hasPendingOrders
              ? "Resume paying for them below, or visit your purchases page."
              : "Visit your purchases page to manage them."}
          </p>
        </div>
      </div>

      <ShowIf condition={cartItems.length > 0}>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/50"
            >
              <BaseImage
                src={item.image ?? null}
                alt={item.name}
                fill
                sizes="44px"
                containerClassName="h-11 w-11 shrink-0 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {item.quantity} × ৳{item.price.toFixed(2)}
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                <Icon icon="solar:clock-circle-bold-duotone" className="h-3 w-3" />
                Awaiting payment
              </span>
            </li>
          ))}
        </ul>
      </ShowIf>

      <div className="space-y-2 pt-1">
        {/* Only show "Resume" if pending orders exist or are still loading */}
        <ShowIf
          condition={isLoadingPending || hasPendingOrders}
          fallback={
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/user/dashboard/purchasedList" onClick={() => close()}>
                <Icon icon="solar:arrow-right-up-linear" className="mr-2 h-4 w-4" />
                Go to purchases page
              </Link>
            </Button>
          }
        >
          <Button
            className="w-full"
            disabled={isLoadingPending}
            onClick={() => goTo("pending-payments")}
          >
            <ShowIf
              condition={isLoadingPending}
              fallback={
                <>
                  <Icon icon="solar:play-circle-bold-duotone" className="mr-2 h-4 w-4" />
                  Resume pending payments
                </>
              }
            >
              <Icon icon="svg-spinners:ring-resize" className="mr-2 h-4 w-4" />
              Checking orders…
            </ShowIf>
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/user/dashboard/purchasedList" onClick={() => close()}>
              <Icon icon="solar:arrow-right-up-linear" className="mr-2 h-4 w-4" />
              Go to purchases page
            </Link>
          </Button>
        </ShowIf>
      </div>
    </div>
  );
}

// ── Page 2: Pending orders list ──────────────────────────────────────────────

function resolveFoodName(order: OrderDoc): string {
  if (order?.food && typeof order.food === "object") {
    return (order.food as { foodName?: string })?.foodName ?? order?.foodName ?? "Order";
  }
  return order?.foodName ?? "Order";
}

function resolveFoodImage(order: OrderDoc): string | null {
  if (order?.food && typeof order.food === "object") {
    return (order.food as { foodImage?: string })?.foodImage ?? null;
  }
  return null;
}

type PendingOrdersPageProps = {
  pendingOrders: OrderDoc[];
  isLoading: boolean;
};

function PendingOrdersPage(props: PendingOrdersPageProps) {
  const { pendingOrders, isLoading } = props;
  const { close } = useMultipageModalSelector();
  const [initiatePayment, { isLoading: paying }] = useInitiatePaymentMutation();

  const resumeAll = async () => {
    const ids = pendingOrders.map((o) => o._id).filter(Boolean);
    if (ids.length === 0) return;
    try {
      const body = ids.length === 1
        ? { orderId: ids[0] }
        : { orderIds: ids };
      const res = await initiatePayment(body).unwrap();
      const url = res?.data?.paymentUrl;
      if (!url) throw new Error("Gateway did not return a redirect URL.");
      window.location.href = url;
    } catch (err) {
      const message =
        (err as { data?: { message?: string }; message?: string })?.data?.message ??
        (err as { message?: string })?.message ??
        "Couldn't restart payment.";
      toast.error(message);
    }
  };

  const totalPending = pendingOrders.reduce(
    (sum, o) => sum + Number(o?.totalPrice ?? 0), 0,
  );

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon icon="solar:clock-circle-bold-duotone" className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Pending orders
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            These orders are placed but not yet paid. Hit{" "}
            <strong className="text-foreground">Pay now</strong> to complete
            all of them in one go.
          </p>
        </div>
      </div>

      {/* Loading skeletons */}
      <ShowIf condition={isLoading}>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-3">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </ShowIf>

      {/* Empty state */}
      <ShowIf condition={!isLoading && pendingOrders.length === 0}>
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-zinc-50 py-10 text-center dark:bg-zinc-800/40">
          <Icon icon="solar:inbox-linear" className="h-10 w-10 text-muted-foreground/60" />
          <div>
            <p className="text-sm font-semibold text-foreground">No pending orders found</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              All your orders may already be paid or cancelled.
            </p>
          </div>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/user/dashboard/purchasedList" onClick={() => close()}>
              View all purchases
            </Link>
          </Button>
        </div>
      </ShowIf>

      {/* Pending orders list + single Pay all button */}
      <ShowIf condition={!isLoading && pendingOrders.length > 0}>
        <ul className="space-y-2">
          {pendingOrders.map((order) => {
            if (!order?._id) return null;
            const name   = resolveFoodName(order);
            const image  = resolveFoodImage(order);
            const amount = Number(order?.totalPrice ?? 0);

            return (
              <li
                key={order._id}
                className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-3 dark:bg-zinc-800/50"
              >
                <BaseImage
                  src={image}
                  alt={name}
                  fill
                  sizes="44px"
                  containerClassName="h-11 w-11 shrink-0 rounded-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    ৳{amount.toFixed(2)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  Pending
                </span>
              </li>
            );
          })}
        </ul>

        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/40">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-muted-foreground">
              {pendingOrders.length} order{pendingOrders.length > 1 ? "s" : ""} to pay
            </span>
            <span className="font-bold tabular-nums text-foreground">
              ৳{totalPending.toFixed(2)}
            </span>
          </div>
          <Button className="w-full" disabled={paying} onClick={resumeAll}>
            <ShowIf
              condition={paying}
              fallback={
                <>
                  <Icon icon="solar:play-circle-bold-duotone" className="mr-2 h-4 w-4" />
                  Pay now — ৳{totalPending.toFixed(2)}
                </>
              }
            >
              <Icon icon="svg-spinners:ring-resize" className="mr-2 h-4 w-4" />
              Redirecting…
            </ShowIf>
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href="/user/dashboard/purchasedList" onClick={() => close()}>
            View all in purchases page
            <Icon icon="solar:arrow-right-linear" className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </ShowIf>
    </div>
  );
}
