import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { EditFoodLayout } from "@/modules/dashboard/admin/food/sections/EditFoodSection/EditFoodLayout";

export const metadata = { title: "Edit Food — Admin Dashboard" };

type Props = {
  params: Promise<{
    foodId: string;
  }>;
};

export default async function Page(props: Props) {
  const { foodId } = await props.params;

  return (
    <>
      <PageHeader
        title="Edit Food"
        description="Update food item details"
      />
      <EditFoodLayout foodId={foodId} />
    </>
  );
}
