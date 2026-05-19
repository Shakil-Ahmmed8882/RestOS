"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import { usePlaceOrderAndPay } from "@/modules/checkout/hooks/usePlaceOrderAndPay";
import { CheckoutLineItems } from "@/modules/checkout/sections/CheckoutLineItems";
import { CheckoutSummaryCard } from "@/modules/checkout/sections/CheckoutSummaryCard";
import { AlreadyOrderedModal } from "@/modules/checkout/sections/AlreadyOrderedModal";

export function ReviewAndPaySection() {
  const checkout = usePlaceOrderAndPay();

  if (checkout.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <CheckoutLineItems checkout={checkout} />
        <CheckoutSummaryCard checkout={checkout} />
      </section>

      <AlreadyOrderedModal
        open={checkout.showDuplicateModal}
        onOpenChange={(open) => { if (!open) checkout.closeDuplicateModal(); }}
        cartItems={checkout.items}
      />
    </>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white py-16 text-center ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <Icon icon="solar:bag-cross-linear" className="h-14 w-14 text-muted-foreground" />
      <div>
        <h2 className="text-xl font-semibold">Nothing to check out</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a few dishes to your cart before heading here.
        </p>
      </div>
      <Button asChild>
        <Link href="/food">Browse menu</Link>
      </Button>
      <ShowIf condition={false}>
        <span className="sr-only" />
      </ShowIf>
    </div>
  );
}
