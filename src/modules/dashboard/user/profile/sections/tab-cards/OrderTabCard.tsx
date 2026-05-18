"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { OrderItem } from "../../types";

type Props = { order?: OrderItem | null };

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-primary/10 text-primary",
  confirmed: "bg-emerald-500/10 text-emerald-500",
  canceled: "bg-zinc-500/10 text-zinc-500",
};

export function OrderTabCard(props: Props) {
  const { order } = props;
  if (!order?._id) return null;

  const food = order?.food;
  const status = (order?.status ?? "pending").toLowerCase();
  const badgeClass = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const href = food?._id ? `/food-details/${food._id}` : "#";

  return (
    <Link
      href={href}
      className="group rounded-xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-3 flex gap-3 hover:ring-primary/30 transition-all"
    >
      <div className="relative size-16 shrink-0 rounded-lg overflow-hidden bg-silk-with-hover">
        <BaseImage src={food?.image} alt={food?.name ?? "Order"} imgClass="!w-full !h-full" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground truncate">
            {food?.name ?? "Unknown item"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Qty {order?.quantity ?? 1} · ${(order?.totalPrice ?? 0).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${badgeClass}`}
          >
            <Icon icon="solar:bag-3-linear" className="size-3" />
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
}
