"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import { ShowIf } from "@/components/common/ShowIf";
import { useAppSelector } from "@/redux/hooks";
import { CartItemsList } from "@/modules/cart/sections/CartItemsList";
import { CartSummary } from "@/modules/cart/sections/CartSummary";

export function CartLayout() {
  const items = useAppSelector((s) => s.cart.items);

  return (
    <Container className="py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Your cart</h1>
      <p className="mb-8 text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"}</p>

      <ShowIf
        condition={items.length > 0}
        fallback={
          <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card py-16 text-center">
            <Icon icon="solar:bag-cross-linear" className="h-16 w-16 text-muted-foreground" />
            <div>
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="mt-1 text-sm text-muted-foreground">Add a few delicious dishes to get started.</p>
            </div>
            <Button asChild>
              <Link href="/food">Browse menu</Link>
            </Button>
          </div>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <CartItemsList />
          <CartSummary />
        </div>
      </ShowIf>
    </Container>
  );
}
