import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export function CommentSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <BaseSkeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <BaseSkeleton className="h-3 w-24" />
          <BaseSkeleton className="h-2.5 w-16" />
        </div>
        <BaseSkeleton className="h-3 w-full" />
        <BaseSkeleton className="h-3 w-4/5" />
        <div className="flex items-center gap-3 pt-1">
          <BaseSkeleton className="h-3 w-12" />
          <BaseSkeleton className="h-3 w-12" />
          <BaseSkeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CommentsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}
