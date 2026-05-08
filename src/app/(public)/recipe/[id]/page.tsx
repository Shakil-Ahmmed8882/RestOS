import { RecipeDetailsSection } from "@/modules/recipe/sections/recipe-details/RecipeDetailsSection";

export default function Page({ params }: { params: { id: string } }) {
  return <RecipeDetailsSection id={params.id} />;
}
