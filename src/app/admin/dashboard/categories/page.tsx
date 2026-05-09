import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { FoodCategoriesSection } from "@/modules/dashboard/admin/sections/FoodCategoriesSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Food categories" description="Group dishes for easy browsing." />
      <FoodCategoriesSection />
    </>
  );
}
