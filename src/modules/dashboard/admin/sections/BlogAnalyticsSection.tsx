"use client";

import { StatCard } from "@/modules/dashboard/shared/sections/StatCard";
import { Card } from "@/components/ui/card";
import { useGetAllAnalyticsQuery } from "@/redux/featureApi/analyticsApi";

export function BlogAnalyticsSection() {
  const { data } = useGetAllAnalyticsQuery(undefined);
  const a = (data as any)?.data ?? {};

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total posts" value={a.totalBlogs ?? 0} icon="solar:document-text-bold-duotone" tone="primary" />
        <StatCard label="Total comments" value={a.totalComments ?? 0} icon="solar:chat-square-bold-duotone" tone="info" />
        <StatCard label="Total votes" value={a.totalVotes ?? 0} icon="solar:like-bold-duotone" tone="success" />
        <StatCard label="Saves" value={a.totalSaves ?? 0} icon="solar:bookmark-bold-duotone" tone="warning" />
      </div>
      <Card className="p-6">
        <h3 className="mb-1 text-sm font-semibold">Engagement over time</h3>
        <p className="mb-6 text-xs text-muted-foreground">Last 30 days</p>
        <div className="flex h-56 items-end gap-1">
          {Array.from({ length: 30 }).map((_, i) => {
            const h = 30 + Math.floor(Math.random() * 70);
            return <div key={i} className="flex-1 rounded-t-md bg-primary/30" style={{ height: `${h}%` }} />;
          })}
        </div>
      </Card>
    </div>
  );
}
