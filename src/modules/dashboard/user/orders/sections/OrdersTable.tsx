"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { BaseImage } from "@/components/common/BaseImage";
import { Skeleton } from "@/components/ui/skeleton";
import { useInitiatePaymentMutation } from "@/redux/featureApi/paymentApi";
import { toast } from "sonner";
import type { MyOrder } from "@/redux/featureApi/orderApi";
import type { useMyOrders } from "@/modules/dashboard/user/orders/hooks/useMyOrders";
import type { OrderStatusFilter } from "@/modules/dashboard/user/orders/types";

type Props = {
  orders: ReturnType<typeof useMyOrders>;
};

function formatBdt(n: number) {
  return `৳${new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)}`;
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric", month: "short", year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

const STATUS: Record<MyOrder["status"], { label: string; chip: string; dot: string }> = {
  pending:   { label: "Pending",   chip: "bg-primary/10 text-primary",                                          dot: "bg-primary" },
  confirmed: { label: "Purchased", chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",            dot: "bg-emerald-500" },
  canceled:  { label: "Cancelled", chip: "bg-zinc-100 text-muted-foreground dark:bg-white/[0.06]",              dot: "bg-zinc-400" },
};

const PAYMENT_STATUS: Record<MyOrder["paymentStatus"], string> = {
  pending:   "Awaiting",
  completed: "Paid",
  failed:    "Failed",
  cancelled: "Cancelled",
};

function statusStyle(s: MyOrder["status"]) {
  return STATUS[s] ?? STATUS.canceled;
}

function TableRowSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-zinc-100 dark:border-white/[0.04]">
          <td className="px-5 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <Skeleton className="h-3.5 w-32" />
            </div>
          </td>
          <td className="px-5 py-4"><Skeleton className="h-3 w-6" /></td>
          <td className="px-5 py-4 text-right"><Skeleton className="ml-auto h-3 w-14" /></td>
          <td className="px-5 py-4 text-right"><Skeleton className="ml-auto h-3 w-14" /></td>
          <td className="px-5 py-4"><Skeleton className="h-5 w-16 rounded-full" /></td>
          <td className="px-5 py-4"><Skeleton className="h-3 w-14" /></td>
          <td className="px-5 py-4"><Skeleton className="h-3 w-20" /></td>
          <td className="px-5 py-4"><Skeleton className="h-7 w-16 rounded-lg" /></td>
        </tr>
      ))}
    </>
  );
}

function EmptyState({ tab }: { tab: OrderStatusFilter }) {
  const copy = {
    pending:   { icon: "solar:clock-circle-bold-duotone",   title: "No pending orders",  desc: "Add items to your cart to place a new order.", cta: { label: "Browse menu", href: "/food" } },
    confirmed: { icon: "solar:bag-check-bold-duotone",      title: "No purchases yet",   desc: "Once you complete a payment, your confirmed orders show here.", cta: { label: "Browse menu", href: "/food" } },
    canceled:  { icon: "solar:close-circle-bold-duotone",   title: "Nothing cancelled",  desc: "Cancelled orders will appear here for your records.", cta: null },
    all:       { icon: "solar:bag-3-bold-duotone",          title: "No orders found",    desc: "Try a different search term or tab.", cta: null },
  }[tab];

  return (
    <tr>
      <td colSpan={8}>
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Icon icon={copy.icon} className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">{copy.title}</p>
            <p className="text-xs text-muted-foreground">{copy.desc}</p>
          </div>
          <ShowIf condition={!!copy.cta}>
            {copy.cta && (
              <Button asChild size="sm" className="mt-1">
                <Link href={copy.cta.href}>{copy.cta.label}</Link>
              </Button>
            )}
          </ShowIf>
        </div>
      </td>
    </tr>
  );
}

type OrderRowProps = {
  row: MyOrder;
  onPay: (orderId: string) => void;
  paying: boolean;
  payingId: string | null;
};

function OrderRow({ row, onPay, paying, payingId }: OrderRowProps) {
  const style = statusStyle(row.status);
  const foodImage = typeof row.food === "object" ? row.food?.image : null;
  const foodId    = typeof row.food === "object" ? row.food?._id : null;
  const isThisRowPaying = paying && payingId === row._id;

  return (
    <tr className="group border-b border-zinc-100 transition-colors hover:bg-zinc-50/60 dark:border-white/[0.04] dark:hover:bg-zinc-800/30">
      {/* Food */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <BaseImage
            src={foodImage ?? null}
            alt={row.foodName}
            fill
            sizes="40px"
            containerClassName="h-10 w-10 shrink-0 rounded-xl"
          />
          <span className="line-clamp-1 text-sm font-medium text-foreground">{row.foodName}</span>
        </div>
      </td>
      {/* Qty */}
      <td className="px-5 py-4 text-sm text-muted-foreground">{row.quantity}</td>
      {/* Unit price */}
      <td className="px-5 py-4 text-right text-sm text-muted-foreground tabular-nums">
        {formatBdt(row.price)}
      </td>
      {/* Total */}
      <td className="px-5 py-4 text-right text-sm font-semibold tabular-nums text-foreground">
        {formatBdt(row.totalPrice)}
      </td>
      {/* Status */}
      <td className="px-5 py-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.chip}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {style.label}
        </span>
      </td>
      {/* Payment status */}
      <td className="px-5 py-4 text-xs text-muted-foreground">
        {PAYMENT_STATUS[row.paymentStatus] ?? row.paymentStatus}
      </td>
      {/* Date */}
      <td className="px-5 py-4 text-xs text-muted-foreground">{formatDate(row.createdAt)}</td>
      {/* Action */}
      <td className="px-5 py-4">
        <ShowIf condition={row.status === "pending"}>
          <Button
            size="sm"
            variant="ghost"
            disabled={isThisRowPaying}
            onClick={() => onPay(row._id)}
            className="h-7 gap-1.5 px-2.5 text-xs text-primary hover:bg-primary/10 hover:text-primary"
          >
            <ShowIf
              condition={isThisRowPaying}
              fallback={
                <>
                  <Icon icon="solar:play-circle-bold-duotone" className="h-3.5 w-3.5" />
                  Pay
                </>
              }
            >
              <Icon icon="svg-spinners:ring-resize" className="h-3.5 w-3.5" />
            </ShowIf>
          </Button>
        </ShowIf>
        <ShowIf condition={row.status === "confirmed" && !!foodId}>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-7 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-primary"
          >
            <Link href={`/food-details/${foodId}`}>
              <Icon icon="solar:restart-bold-duotone" className="h-3.5 w-3.5" />
              Reorder
            </Link>
          </Button>
        </ShowIf>
      </td>
    </tr>
  );
}

export function OrdersTable(props: Props) {
  const { orders } = props;
  const { rows, isLoading, isFetching, tab, meta, page, setPage } = orders;
  const [initiatePayment, { isLoading: paying }] = useInitiatePaymentMutation();
  const [payingId, setPayingId] = useState<string | null>(null);

  const handlePay = async (orderId: string) => {
    setPayingId(orderId);
    try {
      const res = await initiatePayment({ orderId }).unwrap();
      const url = res?.data?.paymentUrl;
      if (!url) throw new Error("Gateway did not return a redirect URL.");
      window.location.href = url;
    } catch (err) {
      const message =
        (err as { data?: { message?: string }; message?: string })?.data?.message ??
        (err as { message?: string })?.message ??
        "Couldn't restart payment.";
      toast.error(message);
    } finally {
      setPayingId(null);
    }
  };

  const totalPages = meta?.totalPage ?? 1;

  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-zinc-200/60 dark:ring-white/[0.04]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/80 dark:border-white/[0.04] dark:bg-zinc-900/40">
              {["Food", "Qty", "Unit price", "Total", "Status", "Payment", "Placed", ""].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${h === "Unit price" || h === "Total" ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900/20">
            <CustomSuspense
              isLoading={isLoading || isFetching}
              fallback={<TableRowSkeleton />}
            >
              <ShowIf
                condition={rows.length === 0}
                fallback={
                  <>
                    {rows.map((row) => (
                      <OrderRow
                        key={row._id}
                        row={row}
                        onPay={handlePay}
                        paying={paying}
                        payingId={payingId}
                      />
                    ))}
                  </>
                }
              >
                <EmptyState tab={tab} />
              </ShowIf>
            </CustomSuspense>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ShowIf condition={totalPages > 1}>
        <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 dark:border-white/[0.04]">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
            {meta?.total ? ` · ${meta.total} orders` : ""}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(Math.max(1, page - 1))}
              className="h-7 gap-1 px-2 text-xs"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className="h-7 gap-1 px-2 text-xs"
            >
              Next
              <Icon icon="solar:alt-arrow-right-linear" className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </ShowIf>
    </div>
  );
}
