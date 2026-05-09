import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AddRecipeForm } from "@/modules/recipe/sections/add-recipe/AddRecipeForm";

export default function Page() {
  return (
    <>
      <PageHeader title="Add recipe" description="Publish a new recipe to the catalog." />
      <AddRecipeForm />
    </>
  );
}
