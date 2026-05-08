"use client";

import { StatCard } from "@/modules/dashboard/shared/sections/StatCard";
import { Card } from "@/components/ui/card";
import { useGetAllAnalyticsQuery } from "@/redux/featureApi/analyticsApi";
import { useGetAllOrdersQuery } from "@/redux/featureApi/orderApi";
import { useGetAllUsersQuery } from "@/redux/featureApi/userApi";
import { useGetAllFoodsQuery } from "@/redux/featureApi/foodApi";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";

export function AdminOverviewSection() {
  const { data: analytics } = useGetAllAnalyticsQuery(undefined);
  const { data: orders } = useGetAllOrdersQuery(undefined);
  const { data: users } = useGetAllUsersQuery(undefined);
  const { data: foods } = useGetAllFoodsQuery(undefined);
  const { data: blogs } = useGetAllBlogsQuery(undefined);

  const ordersCount = (orders as any)?.data?.length ?? (analytics as any)?.data?.totalOrders ?? 0;
  const usersCount = (users as any)?.data?.length ?? (analytics as any)?.data?.totalUsers ?? 0;
  const foodsCount = foods?.data?.length ?? 0;
  const blogsCount = (blogs as any)?.data?.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={ordersCount} icon="solar:bag-3-bold-duotone" tone="primary" />
        <StatCard label="Total users" value={usersCount} icon="solar:users-group-rounded-bold-duotone" tone="success" />
        <StatCard label="Menu items" value={foodsCount} icon="solar:dish-bold-duotone" tone="warning" />
        <StatCard label="Blog posts" value={blogsCount} icon="solar:document-text-bold-duotone" tone="info" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-1 text-sm font-semibold">Sales overview</h3>
          <p className="mb-6 text-xs text-muted-foreground">Last 30 days</p>
          <div className="flex h-56 items-end gap-2">
            {Array.from({ length: 14 }).map((_, i) => {
              const h = 30 + Math.floor(Math.random() * 70);
              return <div key={i} className="flex-1 rounded-t-md bg-primary/20 transition hover:bg-primary/40" style={{ height: `${h}%` }} />;
            })}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-1 text-sm font-semibold">Recent activity</h3>
          <p className="mb-4 text-xs text-muted-foreground">System events</p>
          <ul className="space-y-3 text-sm">
            {[
              "New order placed",
              "User signed up",
              "Blog post published",
              "Recipe added",
              "Food category created",
            ].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
