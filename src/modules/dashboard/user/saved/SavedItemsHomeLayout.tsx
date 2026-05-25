"use client";

import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { useMySaves } from "@/modules/dashboard/user/saved/hooks/useMySaves";
import { SavedStatsRow } from "@/modules/dashboard/user/saved/sections/SavedStatsRow";
import { SavedTabs } from "@/modules/dashboard/user/saved/sections/SavedTabs";
import { SavedFilterBar } from "@/modules/dashboard/user/saved/sections/SavedFilterBar";
import { SavedGrid } from "@/modules/dashboard/user/saved/sections/SavedGrid";
import { SavedItemsSkeleton } from "@/modules/dashboard/user/saved/skeletons/SavedItemsSkeleton";

export function SavedItemsHomeLayout() {
  const saves = useMySaves();

  return (
    <>
      <PageHeader
        title="Saved"
        description="Everything you've bookmarked — blogs you want to read again and foods you plan to order."
      />
      <DataBoundary
        isLoading={saves.isLoading}
        isError={saves.isError}
        onReset={() => saves.refetch()}
        skeleton={<SavedItemsSkeleton />}
      >
        <div className="space-y-5">
          <SavedStatsRow saves={saves} />
          <SavedTabs saves={saves} />
          <SavedFilterBar saves={saves} />
          <SavedGrid saves={saves} />
        </div>
      </DataBoundary>
    </>
  );
}
