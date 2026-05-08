"use client";

import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { BaseImage } from "@/components/common/BaseImage";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { useGetSingleRecipeQuery } from "@/redux/featureApi/recipeApi";
import type { Recipe } from "@/modules/recipe/types/recipe.types";

export function RecipeDetailsSection({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleRecipeQuery(id);
  const recipe = (data as any)?.data as Recipe | undefined;

  return (
    <Container className="py-10">
      <CustomSuspense
        isLoading={isLoading}
        fallback={
          <div className="space-y-4">
            <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        }
      >
        {recipe ? (
          <article className="mx-auto max-w-3xl space-y-6">
            {recipe.image ? (
              <BaseImage
                src={recipe.image}
                alt={recipe.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                containerClassName="aspect-[16/9] w-full rounded-2xl"
              />
            ) : null}

            <div className="space-y-3">
              {recipe.category ? <Badge variant="secondary">{recipe.category}</Badge> : null}
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{recipe.title}</h1>
              <p className="text-muted-foreground">{recipe.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {recipe.prepTime ? (
                  <span className="flex items-center gap-1">
                    <Icon icon="solar:clock-circle-linear" className="h-4 w-4" /> Prep: {recipe.prepTime} min
                  </span>
                ) : null}
                {recipe.cookTime ? (
                  <span className="flex items-center gap-1">
                    <Icon icon="solar:fire-linear" className="h-4 w-4" /> Cook: {recipe.cookTime} min
                  </span>
                ) : null}
                {recipe.servings ? (
                  <span className="flex items-center gap-1">
                    <Icon icon="solar:users-group-rounded-linear" className="h-4 w-4" /> {recipe.servings} servings
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-5 md:col-span-1">
                <h2 className="mb-3 font-semibold">Ingredients</h2>
                <ul className="space-y-2 text-sm">
                  {(recipe.ingredients ?? []).map((ing) => (
                    <li key={ing} className="flex items-start gap-2">
                      <Icon icon="solar:check-circle-bold" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5 md:col-span-2">
                <h2 className="mb-3 font-semibold">Steps</h2>
                <ol className="space-y-3 text-sm">
                  {(recipe.steps ?? []).map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </article>
        ) : (
          <p className="text-center text-muted-foreground">Recipe not found.</p>
        )}
      </CustomSuspense>
    </Container>
  );
}
