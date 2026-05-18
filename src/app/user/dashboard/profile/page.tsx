import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { UserProfileHomeLayout } from "@/modules/dashboard/user/profile/UserProfileHomeLayout";

export default function Page() {
  return (
    <>
      <PageHeader
        title="My profile"
        description="Manage your public identity, preferences, and activity."
      />
      <UserProfileHomeLayout />
    </>
  );
}
