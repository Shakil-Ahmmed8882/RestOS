import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { BlogAnalyticsSection } from "@/modules/dashboard/admin/sections/BlogAnalyticsSection";

export default function Page() {
  return (
    <>
      <PageHeader title="Blog analytics" description="Engagement, comments, and reach." />
      <BlogAnalyticsSection />
    </>
  );
}
