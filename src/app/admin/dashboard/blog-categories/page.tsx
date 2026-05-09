import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { BlogCategoriesSection } from "@/modules/dashboard/admin/sections/BlogCategoriesSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Blog categories" description="Group posts for easy discovery." />
      <BlogCategoriesSection />
    </>
  );
}
