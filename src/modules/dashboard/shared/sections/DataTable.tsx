"use client";

import { Icon } from "@iconify/react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Card } from "@/components/ui/card";
import { ShowIf } from "@/components/common/ShowIf";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found.",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left font-semibold text-muted-foreground">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <ShowIf
              condition={!isLoading && data.length > 0}
              fallback={
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">
                    <ShowIf
                      condition={!!isLoading}
                      fallback={
                        <div className="flex flex-col items-center gap-2">
                          <Icon icon="solar:inbox-linear" className="h-10 w-10 text-muted-foreground/60" />
                          <span>{emptyMessage}</span>
                        </div>
                      }
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Loading…
                      </div>
                    </ShowIf>
                  </td>
                </tr>
              }
            >
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </ShowIf>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
