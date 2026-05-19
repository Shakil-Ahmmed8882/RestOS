"use client";

import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { useMyOrders } from "@/modules/dashboard/user/orders/hooks/useMyOrders";
import { OrdersStatsRow } from "@/modules/dashboard/user/orders/sections/OrdersStatsRow";
import { OrdersTabs } from "@/modules/dashboard/user/orders/sections/OrdersTabs";
import { OrdersFilterBar } from "@/modules/dashboard/user/orders/sections/OrdersFilterBar";
import { OrdersTable } from "@/modules/dashboard/user/orders/sections/OrdersTable";
import { OrdersSkeleton } from "@/modules/dashboard/user/orders/skeletons/OrdersSkeleton";

export function MyOrdersHomeLayout() {
  const orders = useMyOrders();

  return (
    <>
      <PageHeader
        title="My Orders"
        description="Track every order you've placed — pay pending ones, reorder favourites."
      />
      <DataBoundary
        isLoading={orders.isLoading}
        isError={orders.isError}
        onReset={() => orders.refetch()}
        skeleton={<OrdersSkeleton />}
      >
        <div className="space-y-5">
          <OrdersStatsRow orders={orders} />
          <OrdersTabs orders={orders} />
          <OrdersFilterBar orders={orders} />
          <OrdersTable orders={orders} />
        </div>
      </DataBoundary>
    </>
  );
}
