"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShowIf } from "@/components/common/ShowIf";

interface CheckoutOrderSummaryProps {
  session: {
    checkout_session_id: string;
    customer: {
      id: string;
      name: string;
      phone: string;
    };
    delivery_info: {
      address_id: string;
      label: string;
      formatted_address: string;
      coordinates: { lat: number; lng: number };
      phone_verified: boolean;
    };
    stores: Array<{
      store_id: string;
      store_name: string;
      store_logo: string;
      estimated_delivery_minutes: number;
      items: Array<{
        order_item_id: string;
        product_id: string;
        name: string;
        variant: string;
        image: string;
        unit_price: number;
        quantity: number;
        currency: string;
        is_flash_deal: boolean;
        substitution_preference?: {
          strategy: string;
          replacement_store_id: string;
          replacement_store_name: string;
        };
      }>;
    }>;
    payment_methods: Array<{
      id: string;
      label: string;
      is_default: boolean;
      icon: string;
    }>;
    price_breakdown: {
      subtotal: number;
      delivery_fee: number;
      coupon_discount: number;
      taxes: number;
      total: number;
      currency: string;
      currency_symbol: string;
    };
    applied_promo: null | { code: string; discount: number };
  };
}

export function CheckoutOrderSummary({ session }: CheckoutOrderSummaryProps) {
  const [expandedStore, setExpandedStore] = React.useState<string | null>(
    session.stores[0]?.store_id ?? null
  );
  const defaultPayment = session.payment_methods.find((m) => m.is_default);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Column */}
      <div className="space-y-6 lg:col-span-2">
        {/* Delivery Information */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-semibold">Delivery information</h2>
            <button className="flex items-center gap-2 text-sm text-primary hover:opacity-80">
              <Icon icon="solar:pen-2-linear" className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Icon icon="solar:map-point-wave-bold-duotone" className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-foreground">
                {session.delivery_info.label}
              </p>
              <p className="text-xs text-muted-foreground">
                Address: {session.customer.phone}
              </p>
              <p className="text-sm text-muted-foreground">
                {session.delivery_info.formatted_address}
              </p>
            </div>
          </div>
        </Card>

        {/* Review Items by Store */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Review item by store</h2>

          {session.stores.map((store) => (
            <Card key={store.store_id} className="overflow-hidden">
              <button
                onClick={() =>
                  setExpandedStore(
                    expandedStore === store.store_id ? null : store.store_id
                  )
                }
                className="flex w-full items-center justify-between gap-4 p-4 hover:bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={store.store_logo}
                    alt={store.store_name}
                    width={40}
                    height={40}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      {store.store_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Delivery in {store.estimated_delivery_minutes} minute
                    </p>
                  </div>
                </div>
                <Icon
                  icon="solar:chevron-up-linear"
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    expandedStore === store.store_id ? "" : "rotate-180"
                  }`}
                />
              </button>

              <ShowIf condition={expandedStore === store.store_id}>
                <Separator />
                <div className="space-y-3 p-4">
                  {store.items.map((item) => (
                    <div key={item.order_item_id} className="space-y-3">
                      <div className="flex gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <div>
                            <p className="font-semibold text-foreground">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.variant}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-lg border border-input bg-muted/50">
                              <button className="p-1.5 text-muted-foreground hover:text-foreground">
                                <Icon icon="solar:minus-circle-linear" className="h-4 w-4" />
                              </button>
                              <span className="px-2 text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button className="p-1.5 text-muted-foreground hover:text-foreground">
                                <Icon icon="solar:plus-circle-linear" className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-sm font-semibold">
                              {item.currency === "USD" && "$"}
                              {item.unit_price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <ShowIf condition={!!item.substitution_preference}>
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-xs">
                          <Icon icon="solar:info-circle-linear" className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div>
                            <p className="text-muted-foreground">Replace with</p>
                            <button className="flex items-center gap-1 text-primary hover:opacity-80">
                              <Icon icon="solar:shop-bold-duotone" className="h-3 w-3" />
                              <span className="font-medium">
                                {item.substitution_preference?.replacement_store_name}
                              </span>
                            </button>
                          </div>
                        </div>
                      </ShowIf>
                    </div>
                  ))}
                </div>
              </ShowIf>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <Card className="h-fit space-y-4 p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>

        {/* Payment Method */}
        <div className="space-y-2">
          {session.payment_methods.map((method) => (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                method.is_default
                  ? "border-primary bg-primary/5"
                  : "border-input bg-muted/30"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                defaultChecked={method.is_default}
                className="sr-only"
              />
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  method.is_default
                    ? "border-primary bg-primary"
                    : "border-input"
                }`}
              >
                {method.is_default && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <span className="flex-1 text-sm font-medium">
                {method.label}
              </span>
            </label>
          ))}
        </div>

        <button className="w-full rounded-lg bg-muted/50 py-2 px-3 text-sm text-muted-foreground hover:bg-muted transition-colors">
          Add Promo
        </button>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>
              {session.price_breakdown.currency_symbol}
              {session.price_breakdown.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Delivery fee</span>
            <span>
              {session.price_breakdown.currency_symbol}
              {session.price_breakdown.delivery_fee.toFixed(2)}
            </span>
          </div>
          <ShowIf condition={session.price_breakdown.coupon_discount > 0}>
            <div className="flex justify-between text-muted-foreground">
              <span>Coupon Discount</span>
              <span className="text-primary">
                -{session.price_breakdown.currency_symbol}
                {session.price_breakdown.coupon_discount.toFixed(2)}
              </span>
            </div>
          </ShowIf>
          <div className="flex justify-between text-muted-foreground">
            <span>Taxes</span>
            <span>
              {session.price_breakdown.currency_symbol}
              {session.price_breakdown.taxes.toFixed(2)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>
            {session.price_breakdown.currency_symbol}
            {session.price_breakdown.total.toFixed(2)}
          </span>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-2 pt-2">
          <Button
            className="w-full"
            variant="outline"
            size="lg"
          >
            Continue with Klarna
          </Button>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="lg"
          >
            Confirm order
          </Button>
        </div>
      </Card>
    </div>
  );
}
