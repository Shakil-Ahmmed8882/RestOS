import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

type Props = { count?: number };

export function ProfileGridSkeleton({ count = 6 }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <BaseSkeleton key={i} className="aspect-square w-full rounded-xl" />
      ))}
    </div>
  );
}
