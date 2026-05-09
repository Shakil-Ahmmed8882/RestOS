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

const getFieldValue = (obj: any, ...keys: string[]): any => {
  for (const key of keys) {
    if (obj?.[key] !== undefined) return obj[key];
  }
  return undefined;
};

export function AllFoodsSection() {
  const { data, isLoading } = useGetAllFoodsQuery(undefined);
  const [deleteFood] = useDeleteFoodMutation();
  const rows = (data?.data as FoodItem[]) ?? [];

  const columns = useMemo<ColumnDef<FoodItem>[]>(
    () => [
      {
        header: "Dish",
        accessorKey: "foodName",
        cell: ({ row }) => {
          const name = getFieldValue(row.original, "foodName", "name");
          const image = getFieldValue(row.original, "foodImage", "image");
          const category = getFieldValue(row.original, "foodCategory", "category");
          return (
            <div className="flex items-center gap-3">
              <BaseImage src={image ?? null} alt={name} fill sizes="48px" containerClassName="h-12 w-12 shrink-0 rounded-md" />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">{name}</p>
                {category && <p className="text-xs text-gray-500 dark:text-gray-400">{category}</p>}
              </div>
            </div>
          );
        },
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => <span className="font-semibold text-gray-900 dark:text-white">${row.original.price?.toFixed(2)}</span>,
      },
      {
        header: "Orders",
        accessorKey: "orders",
        cell: ({ row }) => (
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-sm font-semibold text-blue-700 dark:text-blue-200">
              {row.original.orders ?? 0}
            </span>
          </div>
        ),
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        cell: ({ row }) => (
          <div className="text-center">
            <span className="text-gray-900 dark:text-white font-medium">{row.original.quantity ?? 0}</span>
          </div>
        ),
      },
      {
        header: "Prep Time",
        accessorKey: "preparationTime",
        cell: ({ row }) => (
          <div className="text-center text-gray-900 dark:text-white">
            {row.original.preparationTime ? `${row.original.preparationTime}m` : "–"}
          </div>
        ),
      },
      {
        header: "Rating",
        accessorKey: "averageRating",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-900 dark:text-white font-medium">{row.original.averageRating?.toFixed(1) ?? "0"}</span>
          </div>
        ),
      },
      {
        header: "Status",
        accessorKey: "available",
        cell: ({ row }) => (
          <Badge variant={row.original.available === false ? "secondary" : "default"} className="whitespace-nowrap">
            {row.original.available === false ? "Hidden" : "Live"}
          </Badge>
        ),
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => {
          const name = getFieldValue(row.original, "foodName", "name");
          return (
            <div className="flex justify-end gap-1">
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <Link href={`/admin/dashboard/foods/edit?id=${row.original._id}`}>
                  <Icon icon="solar:pen-linear" className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={async () => {
                  if (!window.confirm(`Delete ${name}?`)) return;
                  try {
                    await deleteFood(row.original._id).unwrap();
                    toast.success("Dish deleted");
                  } catch (e: any) {
                    toast.error(e?.data?.message ?? "Failed to delete");
                  }
                }}
              >
                <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          );
        },
      },
    ],
    [deleteFood],
  );

  return <DataTable columns={columns} data={rows} isLoading={isLoading} emptyMessage="No dishes yet." />;
}
