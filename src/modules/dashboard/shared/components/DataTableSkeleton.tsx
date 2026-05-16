"use client";

import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export type SkeletonColumnConfig =
  | { type: "user" }
  | { type: "badge" }
  | { type: "text"; width?: number }
  | { type: "actions"; count?: number };

interface DataTableSkeletonProps {
  columnConfig: SkeletonColumnConfig[];
  rows?: number;
}

/**
 * Renders a single skeleton cell.
 *
 * Each variant fills the full cell width so the overall row reads as a
 * continuous, evenly-weighted block — matching the visual mass of a
 * populated row. Per-shape primitives still convey what kind of content
 * will land there (avatar circle, pill badge, action squares, etc.).
 */
function SkeletonCell({ config }: { config: SkeletonColumnConfig }) {
  switch (config.type) {
    case "user":
      return (
        <div className="flex items-center gap-3 w-full">
          <BaseSkeleton className="h-9 w-9 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2 min-w-0">
            <BaseSkeleton className="h-3.5 w-3/5 max-w-[160px]" />
            <BaseSkeleton className="h-3 w-4/5 max-w-[220px]" />
          </div>
        </div>
      );

    case "badge":
      return (
        <div className="w-full">
          <BaseSkeleton className="h-7 w-20 rounded-full" />
        </div>
      );

    case "text":
      return (
        <div className="w-full">
          <BaseSkeleton
            className="h-4 rounded"
            style={{ width: config.width ?? "70%" }}
          />
        </div>
      );

    case "actions":
      return (
        <div className="flex items-center justify-end gap-1.5 w-full">
          {Array.from({ length: config.count ?? 2 }).map((_, i) => (
            <BaseSkeleton key={i} className="h-8 w-8 rounded-lg" />
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
            <td key={colIdx} className="px-4 py-4 align-middle">
              <SkeletonCell config={config} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
