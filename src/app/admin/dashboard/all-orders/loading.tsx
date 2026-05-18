import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { OrdersTableSkeleton } from "@/modules/dashboard/admin/sections/OrdersSection";

export default function Loading() {
  return (
    <>
      <PageHeader title="All orders" description="Every order across the platform." />
      <OrdersTableSkeleton />
    </>
  );
}
