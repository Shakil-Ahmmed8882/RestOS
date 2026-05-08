"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateRecipeCategoryMutation,
  useDeleteRecipeCategoryMutation,
  useGetAllRecipeCategoriesQuery,
} from "@/redux/featureApi/recipeApi";

export function RecipeCategoriesSection() {
  const { data, isLoading } = useGetAllRecipeCategoriesQuery(undefined);
  const [createCategory, { isLoading: creating }] = useCreateRecipeCategoryMutation();
  const [deleteCategory] = useDeleteRecipeCategoryMutation();
  const [name, setName] = useState("");
  const items = ((data as any)?.data as { _id: string; name: string }[]) ?? [];

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createCategory({ name: name.trim() }).unwrap();
      toast.success("Category created");
      setName("");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="flex items-center gap-3 p-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New recipe category…" />
        <Button onClick={handleCreate} loading={creating}>
          <Icon icon="solar:add-circle-linear" className="h-4 w-4" /> Add
        </Button>
      </Card>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          {items.map((c) => (
            <Card key={c._id} className="flex items-center justify-between gap-2 p-4">
              <span className="font-medium">{c.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  if (!window.confirm(`Delete ${c.name}?`)) return;
                  try {
                    await deleteCategory(c._id).unwrap();
                    toast.success("Deleted");
                  } catch (e: any) {
                    toast.error(e?.data?.message ?? "Failed");
                  }
                }}
              >
                <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4 text-destructive" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
