import { Container } from "@/components/layouts/Container";
import { RecipeGrid } from "@/modules/recipe/sections/recipe-list/RecipeGrid";
import { AddRecipeForm } from "@/modules/recipe/sections/add-recipe/AddRecipeForm";

export function RecipeHomeLayout() {
  return (
    <>
      <RecipeGrid />
      <Container className="pb-16">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Share your recipe</h2>
        <AddRecipeForm />
      </Container>
    </>
  );
}
