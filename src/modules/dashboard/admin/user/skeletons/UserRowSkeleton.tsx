import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function UserRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b">
      {/* Avatar */}
      <BaseSkeleton className="h-8 w-8 rounded-full flex-shrink-0" />

      {/* Name & Email */}
      <div className="flex-1 min-w-0">
        <BaseSkeleton className="h-4 w-32 mb-2" />
        <BaseSkeleton className="h-3 w-40" />
      </div>

      {/* Role Badge */}
      <BaseSkeleton className="h-6 w-24 rounded-full" />

      {/* Status Badge */}
      <BaseSkeleton className="h-6 w-20 rounded-full" />

      {/* Date */}
      <BaseSkeleton className="h-4 w-24" />

      {/* Actions */}
      <div className="flex gap-2">
        <BaseSkeleton className="h-8 w-8 rounded" />
        <BaseSkeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
}
