"use client";

import { Container } from "@/components/layouts/Container";
import { CheckoutOrderSummary } from "@/modules/checkout/sections/CheckoutOrderSummary";

const DEMO_SESSION = {
  checkout_session_id: "chk_992837465",
  customer: {
    id: "cust_01H2VX",
    name: "John Doe",
    phone: "+6285426451999",
  },
  delivery_info: {
    address_id: "addr_88273",
    label: "Home",
    formatted_address: "Dhaka, Banasree, Block B, Road: 3, California, USA",
    coordinates: { lat: 23.7644, lng: 90.4311 },
    phone_verified: true,
  },
  stores: [
    {
      store_id: "branch_shoppers_01",
      store_name: "Shoppers grocery market",
      store_logo: "https://cdn.rms.com/logos/shoppers.png",
      estimated_delivery_minutes: 15,
      items: [
        {
          order_item_id: "item_88120",
          product_id: "prod_avocado_001",
          name: "Italian Avocado (Local shop)",
          variant: "240 gm",
          image: "https://cdn.rms.com/products/avocado.jpg",
          unit_price: 14.19,
          quantity: 1,
          currency: "USD",
          is_flash_deal: true,
          substitution_preference: {
            strategy: "REPLACE_WITH_SPECIFIC",
            replacement_store_id: "branch_loblaws_01",
            replacement_store_name: "Loblaws",
          },
        },
        {
          order_item_id: "item_88121",
          product_id: "prod_wheat_001",
          name: "Bobs Red Mill Whole Wheat",
          variant: "500 gm",
          image: "https://cdn.rms.com/products/wheat.jpg",
          unit_price: 5.99,
          quantity: 1,
          currency: "USD",
          is_flash_deal: false,
        },
      ],
    },
  ],
  payment_methods: [
    { id: "online", label: "Online Payment", is_default: true, icon: "credit-card" },
    { id: "cod", label: "Cash on delivery", is_default: false, icon: "cash" },
    { id: "pos", label: "Pos on delivery", is_default: false, icon: "terminal" },
  ],
  price_breakdown: {
    subtotal: 20.18,
    delivery_fee: 2.0,
    coupon_discount: 0.0,
    taxes: 1.77,
    total: 23.95,
    currency: "USD",
    currency_symbol: "$",
  },
  applied_promo: null,
};

export function CheckoutOrderSummaryPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">
            Review your order and complete payment
          </p>
        </div>
        <CheckoutOrderSummary session={DEMO_SESSION} />
      </Container>
    </section>
  );
}
