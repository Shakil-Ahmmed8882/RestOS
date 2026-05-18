import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AdminOverviewSkeleton } from "@/modules/dashboard/admin/sections/AdminOverviewSkeleton";

export default function Loading() {
  return (
    <>
      <PageHeader title="Overview" description="Snapshot of activity across the platform." />
      <AdminOverviewSkeleton />
    </>
  );
}
