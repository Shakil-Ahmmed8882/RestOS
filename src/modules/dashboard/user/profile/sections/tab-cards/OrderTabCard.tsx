"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { OrderItem } from "../../types";

type Props = { order?: OrderItem | null };

// Per CLAUDE.md: primary tints only. Status conveyed by icon + label, not hue.
const STATUS_CHIP_STYLE = "bg-primary/10 text-primary";

export function OrderTabCard(props: Props) {
  const { order } = props;
  if (!order?._id) return null;

  const food = order?.food;
  const status = (order?.status ?? "pending").toLowerCase();
  const href = food?._id ? `/food-details/${food._id}` : "#";

  return (
    <Link
      href={href}
      className="group rounded-xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-2.5 flex gap-2.5 hover:ring-primary/30 transition-all"
    >
      <div className="relative size-14 shrink-0 rounded-lg overflow-hidden bg-silk-with-hover">
        <BaseImage src={food?.image} alt={food?.name ?? "Order"} imgClass="!w-full !h-full" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <p className="text-sm font-semibold text-foreground truncate leading-tight">
          {food?.name ?? "Unknown item"}
        </p>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-[11px] text-muted-foreground">
            <span className="tabular-nums">{order?.quantity ?? 1}</span> ×{" "}
            <span className="tabular-nums">${(order?.totalPrice ?? 0).toFixed(2)}</span>
          </p>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_CHIP_STYLE}`}
          >
            <Icon icon="solar:bag-3-linear" className="size-3" />
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
}
