import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { OrdersSection } from "@/modules/dashboard/admin/sections/OrdersSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Order history" description="Completed and archived orders." />
      <OrdersSection filterStatus="delivered" />
    </>
  );
}
