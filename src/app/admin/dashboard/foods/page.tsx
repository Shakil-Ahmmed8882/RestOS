import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { FoodHomeLayout } from "@/modules/dashboard/admin/food/FoodHomeLayout";

export const metadata = { title: "Foods — Admin Dashboard" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="Foods"
        description="Manage your restaurant menu items"
      />
      <FoodHomeLayout />
    </>
  );
}
