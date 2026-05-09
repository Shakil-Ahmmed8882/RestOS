"use client";

import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { useGetAllAnalyticsQuery } from "@/redux/featureApi/analyticsApi";

export function ActivityLogSection() {
  const { data, isLoading } = useGetAllAnalyticsQuery(undefined);
  const events = ((data as any)?.data?.activity ?? []) as { type: string; message: string; createdAt?: string }[];

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-sm font-semibold">Recent activity</h3>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((e, i) => (
            <li key={i} className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-800 pb-3 last:border-b-0">
              <Icon icon="solar:bolt-linear" className="mt-1 h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">{e.message}</p>
                <p className="text-xs text-muted-foreground">{e.type} · {e.createdAt ? new Date(e.createdAt).toLocaleString() : ""}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
