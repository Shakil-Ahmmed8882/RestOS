"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { useCancelMyPendingOrdersMutation } from "@/redux/featureApi/orderApi";
import { toast } from "sonner";
import type { useMyOrders } from "@/modules/dashboard/user/orders/hooks/useMyOrders";

type Props = {
  orders: ReturnType<typeof useMyOrders>;
};

export function OrdersFilterBar(props: Props) {
  const { orders } = props;
  const { search, handleSearchChange, tab, summary } = orders;
  const [cancelPending, { isLoading: cancelling }] = useCancelMyPendingOrdersMutation();

  const pendingCount = summary?.byStatus?.pending?.count ?? 0;
  const showClearBtn = tab === "pending" && pendingCount > 0;

  const handleClearPending = async () => {
    if (!confirm(`Cancel all ${pendingCount} pending order${pendingCount > 1 ? "s" : ""}? This cannot be undone.`)) return;
    try {
      const res = await cancelPending().unwrap();
      toast.success(`${res.data.cancelled} pending order${res.data.cancelled > 1 ? "s" : ""} cancelled.`);
    } catch (err) {
      const message =
        (err as { data?: { message?: string }; message?: string })?.data?.message ??
        (err as { message?: string })?.message ??
        "Couldn't cancel pending orders.";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Icon
          icon="solar:magnifer-linear"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by food name…"
          className="h-9 w-full rounded-xl border-0 bg-zinc-100 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-zinc-800/60"
        />
        <ShowIf condition={search.length > 0}>
          <button
            type="button"
            onClick={() => handleSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
          </button>
        </ShowIf>
      </div>

      {/* Clear pending — only visible on Pending tab when orders exist */}
      <ShowIf condition={showClearBtn}>
        <Button
          variant="ghost"
          size="sm"
          disabled={cancelling}
          onClick={handleClearPending}
          className="shrink-0 text-primary hover:bg-primary/10 hover:text-primary"
        >
          <ShowIf
            condition={cancelling}
            fallback={
              <>
                <Icon icon="solar:close-circle-bold-duotone" className="mr-1.5 h-4 w-4" />
                Clear all pending
              </>
            }
          >
            <Icon icon="svg-spinners:ring-resize" className="mr-1.5 h-4 w-4" />
            Cancelling…
          </ShowIf>
        </Button>
      </ShowIf>
    </div>
  );
}
