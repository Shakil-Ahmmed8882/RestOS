import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { EditFoodLayout } from "@/modules/dashboard/admin/food/sections/EditFoodSection/EditFoodLayout";

export const metadata = { title: "Edit Food — Admin Dashboard" };

type Props = {
  params: {
    foodId: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  return (
    <>
      <PageHeader
        title="Edit Food"
        description="Update food item details"
      />
      <EditFoodLayout foodId={params.foodId} />
    </>
  );
}
