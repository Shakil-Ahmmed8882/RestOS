import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { OrdersSection } from "@/modules/dashboard/admin/sections/OrdersSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Pending orders" description="Orders awaiting preparation." />
      <OrdersSection filterStatus="pending" />
    </>
  );
}
