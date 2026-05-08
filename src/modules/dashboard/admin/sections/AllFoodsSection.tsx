"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import { DataTable } from "@/modules/dashboard/shared/sections/DataTable";
import { useGetAllFoodsQuery, useDeleteFoodMutation } from "@/redux/featureApi/foodApi";
import type { FoodItem } from "@/modules/food/types/food.types";

export function AllFoodsSection() {
  const { data, isLoading } = useGetAllFoodsQuery(undefined);
  const [deleteFood] = useDeleteFoodMutation();
  const rows = (data?.data as FoodItem[]) ?? [];

  const columns = useMemo<ColumnDef<FoodItem>[]>(
    () => [
      {
        header: "Dish",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <BaseImage src={row.original.image ?? null} alt={row.original.name} fill sizes="48px" containerClassName="h-12 w-12 shrink-0 rounded-md" />
            <div>
              <p className="font-medium">{row.original.name}</p>
              {row.original.category ? <p className="text-xs text-muted-foreground">{row.original.category}</p> : null}
            </div>
          </div>
        ),
      },
      { header: "Price", accessorKey: "price", cell: ({ row }) => `$${row.original.price?.toFixed(2)}` },
      {
        header: "Status",
        accessorKey: "available",
        cell: ({ row }) => (
          <Badge variant={row.original.available === false ? "secondary" : "default"}>
            {row.original.available === false ? "Hidden" : "Live"}
          </Badge>
        ),
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <Button asChild variant="ghost" size="icon">
              <Link href={`/admin/dashboard/all-foods/edit/food?id=${row.original._id}`}>
                <Icon icon="solar:pen-linear" className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                if (!window.confirm(`Delete ${row.original.name}?`)) return;
                try {
                  await deleteFood(row.original._id).unwrap();
                  toast.success("Dish deleted");
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
    [deleteFood],
  );

  return <DataTable columns={columns} data={rows} isLoading={isLoading} emptyMessage="No dishes yet." />;
}
