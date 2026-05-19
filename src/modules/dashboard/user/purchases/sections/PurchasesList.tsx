"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useInitiatePaymentMutation,
  type PaymentDoc,
  type PaymentStatus,
} from "@/redux/featureApi/paymentApi";
import type { usePurchasedList } from "@/modules/dashboard/user/purchases/hooks/usePurchasedList";

type Props = {
  purchases: ReturnType<typeof usePurchasedList>;
};

function resolveOrderName(row: PaymentDoc): string {
  if (row?.orderId && typeof row.orderId === "object") {
    return row.orderId?.foodName ?? "Order";
  }
  return "Order";
}

function resolveOrderId(row: PaymentDoc): string | null {
  if (row?.orderId && typeof row.orderId === "object") return row.orderId._id ?? null;
  if (typeof row?.orderId === "string") return row.orderId;
  return null;
}

const STATUS_STYLE: Record<PaymentStatus, { label: string; chip: string; icon: string }> = {
  completed: {
    label: "Paid",
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: "solar:check-circle-bold-duotone",
  },
  pending: {
    label: "Awaiting payment",
    chip: "bg-primary/10 text-primary",
    icon: "solar:clock-circle-bold-duotone",
  },
  failed: {
    label: "Failed",
    chip: "bg-primary/10 text-primary",
    icon: "solar:shield-warning-bold-duotone",
  },
  cancelled: {
    label: "Cancelled",
    chip: "bg-zinc-200/60 text-muted-foreground dark:bg-white/[0.06]",
    icon: "solar:close-circle-bold-duotone",
  },
};

function statusStyleFor(status: PaymentStatus) {
  return STATUS_STYLE[status as keyof typeof STATUS_STYLE] ?? STATUS_STYLE.cancelled;
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

export function PurchasesList(props: Props) {
  const { purchases } = props;
  const { rows, filter } = purchases;
  const [initiatePayment, { isLoading: paying }] = useInitiatePaymentMutation();

  if (rows.length === 0) {
    return <EmptyState filter={filter} />;
  }

  const resumePayment = async (orderId: string | null) => {
    if (!orderId) {
      toast.error("This order is missing — please contact support.");
      return;
    }
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
    }
  };

  return (
    <ul className="space-y-2">
      {rows.map((row) => {
        if (!row?._id) return null;
        const styles = statusStyleFor((row?.status ?? "cancelled") as PaymentStatus);
        const orderId = resolveOrderId(row);
        const orderName = resolveOrderName(row);
        const amount = Number(row?.amount ?? 0);

        return (
          <li
            key={row._id}
            className="group flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-zinc-200/60 transition-colors hover:bg-silk-with-hover dark:bg-zinc-900/60 dark:ring-white/[0.04]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-silk-with-hover text-primary">
              <Icon icon={styles.icon} className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="line-clamp-1 text-sm font-semibold text-foreground">
                  {orderName}
                </p>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles.chip}`}>
                  {styles.label}
                </span>
              </div>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">
                <span className="font-mono">{row?.transactionId ?? "—"}</span>
                <span className="mx-1.5 opacity-50">·</span>
                <span>{formatDate(row?.createdAt)}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold tabular-nums text-foreground">
                ৳{amount.toFixed(2)}
              </p>
              <p className="text-[11px] text-muted-foreground">{row?.currency ?? "BDT"}</p>
            </div>

            <ShowIf condition={row?.status === "pending" && !!orderId}>
              <Button
                size="sm"
                variant="ghost"
                disabled={paying}
                onClick={() => resumePayment(orderId)}
                className="ml-2 text-primary hover:text-primary"
              >
                <Icon icon="solar:play-circle-bold-duotone" className="mr-1 h-4 w-4" />
                Resume
              </Button>
            </ShowIf>

            <ShowIf condition={row?.status === "completed" && !!orderId}>
              <Button asChild size="sm" variant="ghost" className="ml-2 text-muted-foreground hover:text-primary">
                <Link href={`/food-details/${orderId}`}>
                  <Icon icon="solar:arrow-right-up-linear" className="mr-1 h-4 w-4" />
                  Reorder
                </Link>
              </Button>
            </ShowIf>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyState({ filter }: { filter: string }) {
  const copy: Record<string, { title: string; description: string; cta?: { label: string; href: string } }> = {
    completed: {
      title: "No purchases yet",
      description: "Once you complete a payment, your receipts will land here.",
      cta: { label: "Browse menu", href: "/food" },
    },
    pending: {
      title: "Nothing awaiting payment",
      description: "Orders that started but didn’t finish payment will show up here.",
    },
    all: {
      title: "No payment activity",
      description: "We haven’t seen any payment attempts on your account.",
      cta: { label: "Browse menu", href: "/food" },
    },
  };
  const c = copy[filter] ?? copy.completed;

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-14 text-center ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <Icon icon="solar:wallet-money-bold-duotone" className="h-12 w-12 text-muted-foreground/70" />
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
        <p className="text-sm text-muted-foreground">{c.description}</p>
      </div>
      <ShowIf condition={!!c.cta}>
        {c.cta ? (
          <Button asChild size="sm" className="mt-1">
            <Link href={c.cta.href}>{c.cta.label}</Link>
          </Button>
        ) : null}
      </ShowIf>
    </div>
  );
}
