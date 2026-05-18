"use client";

import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/dashboard/shared/sections/DataTable";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "@/redux/featureApi/orderApi";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled";

interface OrderRow {
  _id: string;
  status: OrderStatus;
  total?: number;
  amounts?: { total: number };
  user?: { name: string; email?: string };
  createdAt?: string;
}

const STATUS_VARIANT: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  preparing: "outline",
  delivered: "default",
  cancelled: "destructive",
};

export function OrdersTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl bg-white dark:bg-zinc-900/60 px-4 py-3"
        >
          <BaseSkeleton className="h-3 w-16" />
          <div className="flex-1 space-y-1.5">
            <BaseSkeleton className="h-3.5 w-32" />
            <BaseSkeleton className="h-3 w-40" />
          </div>
          <BaseSkeleton className="h-3 w-14" />
          <BaseSkeleton className="h-5 w-20 rounded-full" />
          <BaseSkeleton className="h-3 w-24" />
          <BaseSkeleton className="h-8 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function OrdersSection({ filterStatus }: { filterStatus?: OrderStatus }) {
  const args = filterStatus ? [{ name: "status", value: filterStatus }] : undefined;
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery(args);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const rows: OrderRow[] = (data as any)?.data ?? [];

  const columns = useMemo<ColumnDef<OrderRow>[]>(
    () => [
      {
        header: "Order",
        accessorKey: "_id",
        cell: ({ row }) => <span className="font-mono text-xs">#{row.original._id?.slice(-6).toUpperCase()}</span>,
      },
      {
        header: "Customer",
        accessorKey: "user.name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.user?.name ?? "Guest"}</p>
            <p className="text-xs text-muted-foreground">{row.original.user?.email}</p>
          </div>
        ),
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => `$${(row.original.amounts?.total ?? row.original.total ?? 0).toFixed(2)}`,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.status] ?? "outline"}>{row.original.status}</Badge>,
      },
      {
        header: "Placed",
        accessorKey: "createdAt",
        cell: ({ row }) =>
          row.original.createdAt ? new Date(row.original.createdAt).toLocaleString() : "—",
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <select
              defaultValue={row.original.status}
              onChange={async (e) => {
                try {
                  await updateOrder({ id: row.original._id, data: { status: e.target.value } }).unwrap();
                  toast.success("Order updated");
                } catch (err: any) {
                  toast.error(err?.data?.message ?? "Failed");
                }
              }}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs"
            >
              <option value="pending">pending</option>
              <option value="preparing">preparing</option>
              <option value="delivered">delivered</option>
              <option value="cancelled">cancelled</option>
            </select>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                if (!window.confirm("Delete this order?")) return;
                try {
                  await deleteOrder(row.original._id).unwrap();
                  toast.success("Deleted");
                } catch (e: any) {
                  toast.error(e?.data?.message ?? "Failed");
                }
              }}
            >
              <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ),
      },
    ],
    [updateOrder, deleteOrder],
  );

  return (
    <DataBoundary
      isLoading={isLoading}
      isError={isError}
      onReset={() => refetch()}
      skeleton={<OrdersTableSkeleton />}
    >
      <DataTable columns={columns} data={rows} isLoading={false} emptyMessage="No orders found." />
    </DataBoundary>
  );
}
