"use client";

import { Skeleton } from "@/components/ui/skeleton";

export type SkeletonColumnConfig =
  | { type: "user" }
  | { type: "badge" }
  | { type: "text"; width?: number }
  | { type: "actions"; count?: number };

interface DataTableSkeletonProps {
  columnConfig: SkeletonColumnConfig[];
  rows?: number;
}

function SkeletonCell({ config }: { config: SkeletonColumnConfig }) {
  switch (config.type) {
    case "user":
      return (
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      );
    case "badge":
      return <Skeleton className="h-6 w-16 rounded-full" />;
    case "text":
      return <Skeleton className="h-3.5" style={{ width: config.width ?? 80 }} />;
    case "actions":
      return (
        <div className="flex items-center gap-1">
          {Array.from({ length: config.count ?? 2 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-lg" />
          ))}
        </div>
      );
  }
}

export function DataTableSkeleton({ columnConfig, rows = 8 }: DataTableSkeletonProps) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr
          key={rowIdx}
          className="border-t border-gray-200 dark:border-gray-800"
        >
          {columnConfig.map((config, colIdx) => (
            <td key={colIdx} className="px-4 py-3.5">
              <SkeletonCell config={config} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
