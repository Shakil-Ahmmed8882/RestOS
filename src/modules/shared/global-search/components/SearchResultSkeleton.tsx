"use client";

import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

type Props = {
  count?: number;
};

export function SearchResultSkeleton(props: Props) {
  const { count = 4 } = props;

  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl overflow-hidden bg-silk-with-hover"
        >
          <BaseSkeleton className="w-full aspect-[16/10] rounded-none" />
          <div className="px-3 py-2.5 space-y-2">
            <BaseSkeleton className="h-3.5 w-[70%] rounded-md" />
            <BaseSkeleton className="h-3 w-[45%] rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
