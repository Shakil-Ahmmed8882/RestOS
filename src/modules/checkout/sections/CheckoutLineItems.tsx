"use client";

import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/common/BaseImage";
import { Button } from "@/components/ui/button";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import type { usePlaceOrderAndPay } from "@/modules/checkout/hooks/usePlaceOrderAndPay";

type Props = {
  checkout: ReturnType<typeof usePlaceOrderAndPay>;
};

export function CheckoutLineItems(props: Props) {
  const { checkout } = props;
  const { items, dispatch } = checkout;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold tracking-tight">Your items</h2>
        <span className="text-xs text-muted-foreground">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;
          return (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]"
            >
              <BaseImage
                src={item.image ?? null}
                alt={item.name}
                fill
                sizes="72px"
                containerClassName="h-[72px] w-[72px] shrink-0 rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-silk-with-hover px-1 py-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                  aria-label="Decrease quantity"
                >
                  <Icon icon="solar:minus-linear" className="h-3.5 w-3.5" />
                </Button>
                <span className="w-7 text-center text-sm font-semibold tabular-nums">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                  aria-label="Increase quantity"
                >
                  <Icon icon="solar:add-circle-linear" className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="hidden w-20 text-right text-sm font-semibold tabular-nums sm:block">
                ${lineTotal.toFixed(2)}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => dispatch(removeFromCart(item.id))}
                aria-label={`Remove ${item.name}`}
              >
                <Icon icon="solar:trash-bin-trash-bold-duotone" className="h-4 w-4" />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
