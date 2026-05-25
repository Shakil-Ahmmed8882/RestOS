"use client";

import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

type Props = {
  count?: number;
};

export function SearchResultSkeleton(props: Props) {
  const { count = 4 } = props;

  return (
    <div className="space-y-2 px-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
        >
          <BaseSkeleton className="h-14 w-14 rounded-xl flex-shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <BaseSkeleton className="h-3.5 w-[60%] rounded-md" />
            <BaseSkeleton className="h-3 w-[40%] rounded-md" />
          </div>
          <BaseSkeleton className="h-5 w-14 rounded-full flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
