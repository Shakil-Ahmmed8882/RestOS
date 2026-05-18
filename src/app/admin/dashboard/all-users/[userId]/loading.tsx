import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { UserDetailsHomeSkeleton } from "@/modules/dashboard/admin/user/details/skeletons/UserDetailsHomeSkeleton";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <BaseSkeleton className="h-8 w-40" />
          <BaseSkeleton className="h-4 w-56" />
        </div>
      </div>
      <UserDetailsHomeSkeleton />
    </>
  );
}
