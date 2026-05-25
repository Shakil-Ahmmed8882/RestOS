"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { PaymentDemoModal } from "@/modules/cart/sections/payment-demo/PaymentDemoModal";

export function CartSummary() {
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button
          size="lg"
          className="w-full"
          disabled={items.length === 0}
          onClick={() => setOpen(true)}
        >
          Proceed to checkout
        </Button>
      </Card>

      <PaymentDemoModal open={open} setOpen={setOpen} />
    </>
  );
}
