"use client";

import Link from "next/link";
import { Container } from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useGetAllRecipesQuery } from "@/redux/featureApi/recipeApi";
import { RecipeCard } from "@/modules/recipe/sections/recipe-list/RecipeCard";
import type { Recipe } from "@/modules/recipe/types/recipe.types";

export function RecipeGrid() {
  const { data, isLoading } = useGetAllRecipesQuery(undefined);
  const items: Recipe[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <ErrorBoundary>
      <Container className="py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Recipes</h1>
            <p className="mt-1 text-sm text-muted-foreground">Cook with confidence — curated by chefs and home cooks.</p>
          </div>
        <Button asChild>
          <Link href="/recipe/new">
            Share recipe
          </Link>
        </Button>
      </div>

      <CustomSuspense
        isLoading={isLoading}
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
            ))}
          </div>
        }
      >
        <NoResultFoundWrapper data={items} title="No recipes yet">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        </NoResultFoundWrapper>
      </CustomSuspense>
      </Container>
    </ErrorBoundary>
  );
}
