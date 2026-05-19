"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BaseImage } from "@/components/common/BaseImage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

export function CartItemsList() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id} className="flex items-center !border-none  bg-silk-with-hover gap-4 p-4">
          <BaseImage
            src={item.image ?? null}
            alt={item.name}
            fill
            sizes="80px"
            containerClassName="h-20 w-20 shrink-0 rounded-lg"
          />
          <div className="flex-1">
            <h3 className="line-clamp-1 font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            >
              <Icon icon="solar:minus-linear" className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            >
              <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
            </Button>
          </div>
          <p className="w-20 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          <Button variant="ghost" size="icon" onClick={() => dispatch(removeFromCart(item.id))}>
            <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
          </Button>
        </Card>
      ))}
    </div>
  );
}
