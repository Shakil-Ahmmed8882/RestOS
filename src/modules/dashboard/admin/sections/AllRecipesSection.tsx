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
import { useDeleteRecipeMutation, useGetAllRecipesQuery } from "@/redux/featureApi/recipeApi";
import type { Recipe } from "@/modules/recipe/types/recipe.types";

export function AllRecipesSection() {
  const { data, isLoading } = useGetAllRecipesQuery(undefined);
  const [deleteRecipe] = useDeleteRecipeMutation();
  const rows: Recipe[] = (data as any)?.data ?? [];

  const columns = useMemo<ColumnDef<Recipe>[]>(
    () => [
      {
        header: "Recipe",
        accessorKey: "title",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <BaseImage src={row.original.image ?? null} alt={row.original.title} fill sizes="56px" containerClassName="h-14 w-14 shrink-0 rounded-md" />
            <div>
              <p className="line-clamp-1 font-medium">{row.original.title}</p>
              <p className="text-xs text-muted-foreground">{row.original.author?.name ?? "Anonymous"}</p>
            </div>
          </div>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: ({ row }) => row.original.category ? <Badge variant="secondary">{row.original.category}</Badge> : "—",
      },
      { header: "Time", accessorKey: "prepTime", cell: ({ row }) => `${(row.original.prepTime ?? 0) + (row.original.cookTime ?? 0)} min` },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <Button asChild variant="ghost" size="icon">
              <Link href={`/recipe/${row.original._id}`}>
                <Icon icon="solar:eye-linear" className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                if (!window.confirm("Delete this recipe?")) return;
                try {
                  await deleteRecipe(row.original._id).unwrap();
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
    [deleteRecipe],
  );

  return <DataTable columns={columns} data={rows} isLoading={isLoading} emptyMessage="No recipes yet." />;
}
