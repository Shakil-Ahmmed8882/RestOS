import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { RecipeCategoriesSection } from "@/modules/dashboard/admin/sections/RecipeCategoriesSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Recipe categories" description="Group recipes for easy browsing." />
      <RecipeCategoriesSection />
    </>
  );
}
