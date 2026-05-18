"use client";

import { Icon } from "@iconify/react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Card } from "@/components/ui/card";
import { ShowIf } from "@/components/common/ShowIf";
import {
  DataTableSkeleton,
  type SkeletonColumnConfig,
} from "@/modules/dashboard/shared/components/DataTableSkeleton";
import { CustomSuspense } from "@/components/common/CustomSuspense";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  skeletonConfig?: SkeletonColumnConfig[];
  skeletonRows?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found.",
  skeletonConfig,
  skeletonRows,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const fallbackConfig: SkeletonColumnConfig[] = skeletonConfig ??
    columns.map((_, i) => {
      if (i === 0) return { type: "user" };
      if (i === columns.length - 1) return { type: "actions" };
      return { type: "text" };
    });

  return (
    <Card className="overflow-hidden border dark:border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold text-muted-foreground"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
              <CustomSuspense isLoading={Boolean(isLoading)} fallback={<DataTableSkeleton columnConfig={fallbackConfig} rows={skeletonRows} />}>
          <tbody>
              <ShowIf
                condition={data.length > 0}
                fallback={
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          icon="solar:inbox-linear"
                          className="h-10 w-10 text-muted-foreground/40"
                        />
                        <span className="text-sm text-muted-foreground">{emptyMessage}</span>
                      </div>
                    </td>
                  </tr>
                }
              >
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </ShowIf>
          </tbody>
              </CustomSuspense>
        </table>
      </div>
    </Card>
  );
}
