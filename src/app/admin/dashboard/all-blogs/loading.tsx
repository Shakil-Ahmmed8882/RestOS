import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { AllBlogsSkeleton } from "@/modules/dashboard/admin/blogs/home/skeletons/AllBlogsSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <BaseSkeleton className="h-8 w-32" />
        <BaseSkeleton className="h-4 w-80" />
      </div>
      <div className="space-y-4">
        <BaseSkeleton className="h-11 w-full sm:max-w-md rounded-full" />
        <AllBlogsSkeleton />
      </div>
    </div>
  );
}
