import { FoodDetailLayout } from "@/modules/dashboard/admin/food/sections/FoodDetailSection/FoodDetailLayout";

export const metadata = { title: "Food Details — Admin Dashboard" };

type Props = {
  params: {
    foodId: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  return <FoodDetailLayout foodId={params.foodId} />;
}
