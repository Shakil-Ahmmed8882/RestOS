"use client";

import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { PageHeader } from "@/modules/dashboard/shared/sections/PageHeader";
import { useUserAnalytics } from "@/modules/dashboard/user/analytics/hooks/useUserAnalytics";
import { AnalyticsRangePicker } from "@/modules/dashboard/user/analytics/sections/AnalyticsRangePicker";
import { AnalyticsStatsRow } from "@/modules/dashboard/user/analytics/sections/AnalyticsStatsRow";
import { SpendLineChart } from "@/modules/dashboard/user/analytics/sections/SpendLineChart";
import { OrdersStackedChart } from "@/modules/dashboard/user/analytics/sections/OrdersStackedChart";
import { EngagementChart } from "@/modules/dashboard/user/analytics/sections/EngagementChart";
import { ActivityDonut } from "@/modules/dashboard/user/analytics/sections/ActivityDonut";
import { TopFoodsTable } from "@/modules/dashboard/user/analytics/sections/TopFoodsTable";
import { TopBlogsTable } from "@/modules/dashboard/user/analytics/sections/TopBlogsTable";
import { AnalyticsSkeleton } from "@/modules/dashboard/user/analytics/skeletons/AnalyticsSkeleton";

export function UserAnalyticsHomeLayout() {
  const a = useUserAnalytics();
  const data = a.analytics;

  return (
    <>
      <PageHeader
        title="Overview"
        description="A snapshot of your spending, orders, and engagement across the platform."
      />

      <DataBoundary
        isLoading={a.isLoading}
        isError={a.isError}
        onReset={() => a.refetch()}
        skeleton={<AnalyticsSkeleton />}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {data?.range?.from ? `${data.range.from} → ${data.range.to}` : ""}
            </p>
            <AnalyticsRangePicker
              value={a.days}
              onChange={a.setDays}
              isFetching={a.isFetching}
            />
          </div>

          <AnalyticsStatsRow analytics={data} />

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ActivityDonut activity={data?.totals?.activity} />
            <TopFoodsTable rows={data?.top?.foods} />
            <TopBlogsTable rows={data?.top?.blogs} />
          </section>
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SpendLineChart data={data?.series?.spendDaily} />
            <OrdersStackedChart data={data?.series?.ordersDaily} />
          </section>
          <section className="grid grid-cols-1 gap-4">
            <EngagementChart
              blogs={data?.series?.blogsDaily}
              comments={data?.series?.commentsDaily}
            />
          </section>


        </div>
      </DataBoundary>
    </>
  );
}
