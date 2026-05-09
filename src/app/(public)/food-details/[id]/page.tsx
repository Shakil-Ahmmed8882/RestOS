import { FoodDetailsHomeLayout } from "@/modules/food/FoodDetailsHomeLayout";

export default function Page({ params }: { params: { id: string } }) {
  return <FoodDetailsHomeLayout id={params.id} />;
}
