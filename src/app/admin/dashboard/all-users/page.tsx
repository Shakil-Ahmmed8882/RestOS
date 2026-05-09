import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AllUsersSection } from "@/modules/dashboard/admin/user/sections/AllUsersSection";

export default function Page() {
  return (
    <>
      <PageHeader title="All users" description="Manage every user account on the platform." />
      <AllUsersSection />
    </>
  );
}
