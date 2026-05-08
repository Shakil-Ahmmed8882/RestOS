"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { AddFoodForm } from "@/modules/dashboard/admin/sections/AddFoodForm";
import { useGetSingleFoodQuery } from "@/redux/featureApi/foodApi";

function EditFoodContent() {
  const params = useSearchParams();
  const id = params.get("id") ?? undefined;
  const { data } = useGetSingleFoodQuery(id, { skip: !id });
  return (
    <>
      <PageHeader title="Edit food" description="Update an existing menu item." />
      <AddFoodForm initial={data as any} foodId={id} />
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <EditFoodContent />
    </Suspense>
  );
}
