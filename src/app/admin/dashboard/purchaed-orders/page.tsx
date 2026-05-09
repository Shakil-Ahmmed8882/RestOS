import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { OrdersSection } from "@/modules/dashboard/admin/sections/OrdersSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Purchased orders" description="Orders that have been paid for." />
      <OrdersSection filterStatus="preparing" />
    </>
  );
}
