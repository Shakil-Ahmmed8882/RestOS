"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useCreateFoodMutation, useUpdateFoodMutation } from "@/redux/featureApi/foodApi";
import { useGetAllFoodsCategoriesQuery } from "@/redux/featureApi/foodCategoryApi";

const schema = z.object({
  name: z.string().min(2, "Name is required."),
  description: z.string().min(5, "Description is required."),
  image: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().positive("Price must be > 0"),
  category: z.string().min(1, "Pick a category."),
  available: z.boolean().default(true),
});

type Form = z.infer<typeof schema>;

export function AddFoodForm({ initial, foodId }: { initial?: Partial<Form>; foodId?: string }) {
  const router = useRouter();
  const [createFood, { isLoading: creating }] = useCreateFoodMutation();
  const [updateFood, { isLoading: updating }] = useUpdateFoodMutation();
  const { data } = useGetAllFoodsCategoriesQuery(undefined);
  const categories = (data?.data as { _id: string; name: string }[]) ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { available: true, ...initial } });

  const onSubmit = async (values: Form) => {
    const toastId = toast.loading(foodId ? "Updating dish…" : "Adding dish…");
    try {
      if (foodId) await updateFood({ id: foodId, data: values as any }).unwrap();
      else await createFood(values as any).unwrap();
      toast.success(foodId ? "Updated!" : "Added!", { id: toastId });
      router.push("/admin/dashboard/all-foods");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed.", { id: toastId });
    }
  };

  return (
    <Card className="max-w-2xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          <ShowIf condition={!!errors.name}><p className="text-xs text-destructive">{errors.name?.message}</p></ShowIf>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={3} {...register("description")} />
          <ShowIf condition={!!errors.description}><p className="text-xs text-destructive">{errors.description?.message}</p></ShowIf>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" step="0.01" {...register("price")} />
            <ShowIf condition={!!errors.price}><p className="text-xs text-destructive">{errors.price?.message}</p></ShowIf>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ShowIf condition={!!errors.category}><p className="text-xs text-destructive">{errors.category?.message}</p></ShowIf>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" placeholder="https://…" {...register("image")} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("available")} className="h-4 w-4 rounded border-input" />
          Available for ordering
        </label>
        <Button type="submit" loading={creating || updating} size="lg">
          {foodId ? "Update dish" : "Add dish"}
        </Button>
      </form>
    </Card>
  );
}
