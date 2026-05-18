import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6 max-w-2xl">
      <BaseSkeleton className="h-9 w-20 rounded-md" />
      <div className="space-y-2">
        <BaseSkeleton className="h-8 w-48" />
        <BaseSkeleton className="h-4 w-64" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <BaseSkeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
        <BaseSkeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
  );
}
