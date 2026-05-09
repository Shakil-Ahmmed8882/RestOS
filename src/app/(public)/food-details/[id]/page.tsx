import { FoodDetailsHomeLayout } from "@/modules/food/FoodDetailsHomeLayout";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FoodDetailsHomeLayout id={id} />;
}
