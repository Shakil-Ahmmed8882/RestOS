"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { SaveButton } from "@/modules/saves";
import type { SaveRow, SavedFoodResource } from "@/modules/dashboard/user/saved/types";

type Props = { row: SaveRow };

const fmtBDT = (n: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(n ?? 0));

export function SavedFoodCard({ row }: Props) {
  if (!row) return null;

  const f = row.resource as SavedFoodResource | null;
  if (!f?._id) return null;

  const price = f?.price ?? 0;
  const discountPercent = f?.discountPercent ?? 0;
  const discounted = discountPercent > 0 ? price * (1 - discountPercent / 100) : price;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/60 transition-shadow hover:ring-primary/30 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <Link href={`/food-details/${f._id}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/40">
          <BaseImage
            src={f?.foodImage ?? ""}
            alt={f?.foodName ?? "Saved food"}
            className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
            <Icon icon="solar:chef-hat-bold" className="h-3 w-3" />
            {f?.foodCategory ?? "Food"}
          </span>
          {discountPercent > 0 && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 backdrop-blur">
              -{Math.round(discountPercent)}%
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Link
          href={`/food-details/${f._id}`}
          className="line-clamp-2 block text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          {f?.foodName ?? "Untitled"}
        </Link>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-bold tabular-nums text-foreground">
              {fmtBDT(discounted)}
            </span>
            {discountPercent > 0 && (
              <span className="text-[11px] tabular-nums text-muted-foreground line-through">
                {fmtBDT(price)}
              </span>
            )}
          </div>

          <SaveButton
            type="food"
            itemId={row.itemId}
            variant="ghost"
            size="sm"
            confirmOnUnsave
            itemName={f?.foodName ?? row.name}
          />
        </div>
      </div>
    </article>
  );
}
