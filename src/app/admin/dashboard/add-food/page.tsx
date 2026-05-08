import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AddFoodForm } from "@/modules/dashboard/admin/sections/AddFoodForm";

export default function Page() {
  return (
    <>
      <PageHeader title="Add food" description="Create a new menu item." />
      <AddFoodForm />
    </>
  );
}
