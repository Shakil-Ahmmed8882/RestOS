"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import type { Recipe } from "@/modules/recipe/types/recipe.types";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="group overflow-hidden">
      <Link href={`/recipe/${recipe._id}`}>
        <BaseImage
          src={recipe.image ?? null}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          containerClassName="aspect-[4/3] w-full"
          className="transition group-hover:scale-105"
        />
      </Link>
      <div className="space-y-3 p-5">
        {recipe.category ? <Badge variant="secondary">{recipe.category}</Badge> : null}
        <Link href={`/recipe/${recipe._id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug group-hover:text-primary">{recipe.title}</h3>
        </Link>
        {recipe.description ? <p className="line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p> : null}
        <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
          {recipe.prepTime ? (
            <span className="flex items-center gap-1">
              <Icon icon="solar:clock-circle-linear" className="h-3.5 w-3.5" /> {recipe.prepTime + (recipe.cookTime ?? 0)} min
            </span>
          ) : null}
          {recipe.servings ? (
            <span className="flex items-center gap-1">
              <Icon icon="solar:users-group-rounded-linear" className="h-3.5 w-3.5" /> {recipe.servings} servings
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
