import { FoodDetailsSection } from "@/modules/food/sections/food-details/FoodDetailsSection";

export default function Page({ params }: { params: { id: string } }) {
  return <FoodDetailsSection id={params.id} />;
}
