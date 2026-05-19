"use client";

import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { usePurchasedList } from "@/modules/dashboard/user/purchases/hooks/usePurchasedList";
import { PurchasesFilterTabs } from "@/modules/dashboard/user/purchases/sections/PurchasesFilterTabs";
import { PurchasesList } from "@/modules/dashboard/user/purchases/sections/PurchasesList";
import { PurchasesPagination } from "@/modules/dashboard/user/purchases/sections/PurchasesPagination";
import { PurchasesStatsRow } from "@/modules/dashboard/user/purchases/sections/PurchasesStatsRow";
import { PurchasesSkeleton } from "@/modules/dashboard/user/purchases/skeletons/PurchasesSkeleton";

export function PurchasedListHomeLayout() {
  const purchases = usePurchasedList();

  return (
    <>
      <PageHeader
        title="Purchases"
        description="Every payment you’ve made, with quick links to receipts and reorders."
      />
      <DataBoundary
        isLoading={purchases.isLoading}
        isError={purchases.isError}
        onReset={() => purchases.refetch()}
        skeleton={<PurchasesSkeleton />}
      >
        <div className="space-y-5">
          <PurchasesStatsRow purchases={purchases} />
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Activity</h2>
            <PurchasesFilterTabs purchases={purchases} />
          </div>
          <PurchasesList purchases={purchases} />
          <PurchasesPagination purchases={purchases} />
        </div>
      </DataBoundary>
    </>
  );
}
