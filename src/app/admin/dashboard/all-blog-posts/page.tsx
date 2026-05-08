import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AllBlogsSection } from "@/modules/dashboard/admin/sections/AllBlogsSection";

export default function Page() {
  return (
    <>
      <PageHeader title="All blog posts" description="Manage every published article." />
      <AllBlogsSection />
    </>
  );
}
