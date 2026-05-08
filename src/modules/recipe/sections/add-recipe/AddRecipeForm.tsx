"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ShowIf } from "@/components/common/ShowIf";
import { useCreateRecipeMutation } from "@/redux/featureApi/recipeApi";

const schema = z.object({
  title: z.string().min(3, "Title is required."),
  description: z.string().min(10, "Add a short description."),
  image: z.string().url("Image URL is required.").optional().or(z.literal("")),
  category: z.string().optional(),
  prepTime: z.coerce.number().min(0).optional(),
  cookTime: z.coerce.number().min(0).optional(),
  servings: z.coerce.number().min(1).optional(),
  ingredients: z.string().min(3, "List at least one ingredient."),
  steps: z.string().min(10, "Describe the steps."),
});

type Form = z.infer<typeof schema>;

export function AddRecipeForm() {
  const router = useRouter();
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    const toastId = toast.loading("Publishing recipe…");
    try {
      await createRecipe({
        ...data,
        ingredients: data.ingredients.split("\n").filter(Boolean),
        steps: data.steps.split("\n").filter(Boolean),
      } as any).unwrap();
      toast.success("Recipe published! 🎉", { id: toastId });
      router.push("/recipe/new");
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to publish.", { id: toastId });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Garlic butter pasta" {...register("title")} />
          <ShowIf condition={!!errors.title}><p className="text-xs text-destructive">{errors.title?.message}</p></ShowIf>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="prepTime">Prep (min)</Label>
            <Input id="prepTime" type="number" {...register("prepTime")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cookTime">Cook (min)</Label>
            <Input id="cookTime" type="number" {...register("cookTime")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="servings">Servings</Label>
            <Input id="servings" type="number" {...register("servings")} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input id="category" placeholder="Pasta, Salad…" {...register("category")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" placeholder="https://…" {...register("image")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={3} {...register("description")} />
          <ShowIf condition={!!errors.description}><p className="text-xs text-destructive">{errors.description?.message}</p></ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ingredients">Ingredients (one per line)</Label>
          <Textarea id="ingredients" rows={5} placeholder={"200g pasta\n2 cloves garlic"} {...register("ingredients")} />
          <ShowIf condition={!!errors.ingredients}><p className="text-xs text-destructive">{errors.ingredients?.message}</p></ShowIf>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="steps">Steps (one per line)</Label>
          <Textarea id="steps" rows={6} placeholder={"Boil pasta\nMelt butter\nCombine"} {...register("steps")} />
          <ShowIf condition={!!errors.steps}><p className="text-xs text-destructive">{errors.steps?.message}</p></ShowIf>
        </div>

        <Button type="submit" size="lg" loading={isLoading}>
          <Icon icon="solar:upload-linear" className="h-4 w-4" /> Publish recipe
        </Button>
      </form>
    </Card>
  );
}
