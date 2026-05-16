"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
  columns: number;
  rows?: number;
}

export function DataTableSkeleton({ columns, rows = 8 }: DataTableSkeletonProps) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr
          key={rowIdx}
          className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/[0.02]"
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-3">
              {colIdx === 0 ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ) : colIdx === columns - 1 ? (
                <div className="flex items-center gap-1">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              ) : (
                <Skeleton className="h-6 w-20" />
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
