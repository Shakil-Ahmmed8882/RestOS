"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useGetSingleFoodQuery } from "@/redux/featureApi/foodApi";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";
import { EditFoodForm } from "./EditFoodForm";

type Props = {
  foodId: string;
};

function EditFoodSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl">
      <BaseSkeleton className="h-9 w-20 rounded-md" />
      <div className="space-y-2">
        <BaseSkeleton className="h-8 w-48" />
        <BaseSkeleton className="h-4 w-64" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <BaseSkeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
        <BaseSkeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function EditFoodLayout(props: Props) {
  const { foodId } = props;
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetSingleFoodQuery(foodId);

  return (
    <DataBoundary
      isLoading={isLoading}
      isError={isError}
      onReset={() => refetch()}
      skeleton={<EditFoodSkeleton />}
    >
      <div className="space-y-6 max-w-2xl">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
          Back
        </Button>

        <div>
          <h1 className="text-3xl font-bold">Edit Food Item</h1>
          <p className="text-muted-foreground mt-2">Update the food details</p>
        </div>

        <EditFoodForm foodId={foodId} food={data} />
      </div>
    </DataBoundary>
  );
}
