import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

type Props = { count?: number; variant?: "tiles" | "rows" };

export function ProfileGridSkeleton({ count = 8, variant = "tiles" }: Props) {
  if (variant === "rows") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {Array.from({ length: count }).map((_, i) => (
          <BaseSkeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <BaseSkeleton key={i} className="aspect-square w-full rounded-xl" />
      ))}
    </div>
  );
}
