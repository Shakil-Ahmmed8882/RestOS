import { FoodDetailLayout } from "@/modules/dashboard/admin/food/sections/FoodDetailSection/FoodDetailLayout";

export const metadata = { title: "Food Details — Admin Dashboard" };

type Props = {
  params: Promise<{
    foodId: string;
  }>;
};

export default async function Page(props: Props) {
  const { foodId } = await props.params;

  return <FoodDetailLayout foodId={foodId} />;
}
