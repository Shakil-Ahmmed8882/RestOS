import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Container } from "@/components/layouts/Container";
import { RecipeGrid } from "@/modules/recipe/sections/recipe-list/RecipeGrid";
import { AddRecipeForm } from "@/modules/recipe/sections/add-recipe/AddRecipeForm";

export function RecipeHomeLayout() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground dark:bg-background">
        <RecipeGrid />
        <Container className="pb-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Share your recipe</h2>
          <AddRecipeForm />
        </Container>
      </div>
    </ErrorBoundary>
  );
}
