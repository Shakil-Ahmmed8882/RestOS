import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { OrdersTableSkeleton } from "@/modules/dashboard/admin/sections/OrdersSection";

export default function Loading() {
  return (
    <>
      <PageHeader title="Order history" description="Completed and archived orders." />
      <OrdersTableSkeleton />
    </>
  );
}
