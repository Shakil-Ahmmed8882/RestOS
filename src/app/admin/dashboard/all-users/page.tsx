import { AllUsersSection } from "@/modules/dashboard/admin/user/home/sections/AllUsersSection";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";


export default function Page() {
  return (
    <>
      <PageHeader title="All users" description="Manage every user account on the platform." />
      <AllUsersSection />
    </>
  );
}
