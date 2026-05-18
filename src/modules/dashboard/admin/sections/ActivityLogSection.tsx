"use client";

import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { useGetAllAnalyticsQuery } from "@/redux/featureApi/analyticsApi";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

function ActivityLogSkeleton() {
  return (
    <Card className="p-6 space-y-3">
      <BaseSkeleton className="h-4 w-32 mb-2" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 pb-3">
          <BaseSkeleton className="mt-1 h-4 w-4 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <BaseSkeleton className="h-3.5 w-3/5" />
            <BaseSkeleton className="h-2.5 w-2/5" />
          </div>
        </div>
      ))}
    </Card>
  );
}

export function ActivityLogSection() {
  const { data, isLoading, isError, refetch } = useGetAllAnalyticsQuery(undefined);
  return (
    <DataBoundary
      isLoading={isLoading}
      isError={isError}
      onReset={() => refetch()}
      skeleton={<ActivityLogSkeleton />}
    >
      <ActivityLogContent data={data} />
    </DataBoundary>
  );
}

function ActivityLogContent({ data }: { data: unknown }) {
  const events = ((data as any)?.data?.activity ?? []) as {
    type: string;
    message: string;
    createdAt?: string;
  }[];

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-sm font-semibold">Recent activity</h3>
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((e, i) => (
            <li
              key={i}
              className="flex items-start gap-3 pb-3 last:pb-0"
            >
              <Icon icon="solar:bolt-linear" className="mt-1 h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">{e?.message ?? ""}</p>
                <p className="text-xs text-muted-foreground">
                  {e?.type ?? ""} ·{" "}
                  {e?.createdAt ? new Date(e.createdAt).toLocaleString() : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
