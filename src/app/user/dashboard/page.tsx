
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AdminOverviewSection } from "@/modules/dashboard/admin/sections/AdminOverviewSection";

export const metadata = { title: "User dashboard — RestOS" };

export default function Page() {
  return (
    <>
      <PageHeader title="Overview" description="Snapshot of activity across the platform." />
      <AdminOverviewSection />
    </>
  );
}
