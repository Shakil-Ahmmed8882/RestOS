import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { ActivityLogSection } from "@/modules/dashboard/admin/sections/ActivityLogSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Activity log" description="System and user activity over time." />
      <ActivityLogSection />
    </>
  );
}
