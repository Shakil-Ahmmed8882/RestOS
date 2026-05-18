"use client";

import { Icon } from "@iconify/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUsersQuery } from "@/redux/featureApi/userApi";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

type UserData = {
  _id: string;
  role: string;
  status: string;
  createdAt?: string;
};

function UserAnalyticsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white dark:bg-zinc-900/50 px-4 py-3 flex items-center gap-3"
        >
          <BaseSkeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <BaseSkeleton className="h-2.5 w-16" />
            <BaseSkeleton className="h-5 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UserAnalyticsSection() {
  const { data: response, isLoading, isError, refetch } = useGetAllUsersQuery(undefined);
  return (
    <DataBoundary
      isLoading={isLoading}
      isError={isError}
      onReset={() => refetch()}
      skeleton={<UserAnalyticsSkeleton />}
    >
      <UserAnalyticsContent response={response} />
    </DataBoundary>
  );
}

function UserAnalyticsContent({ response }: { response: unknown }) {
  const isLoading = false;
  const users: UserData[] = Array.isArray((response as any)?.data)
    ? (response as any)?.data
    : (response as any)?.data?.result ?? [];

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const userCount = users.filter((u) => u.role === "USER").length;
  const activeCount = users.filter((u) => u.status === "ACTIVE").length;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: "solar:users-group-rounded-bold-duotone",
      color: "hsl(336 100% 63%)",
    },
    {
      label: "Administrators",
      value: adminCount,
      icon: "solar:shield-user-bold-duotone",
      color: "hsl(336 100% 71%)",
    },
    {
      label: "Regular Users",
      value: userCount,
      icon: "solar:user-bold-duotone",
      color: "hsl(336 100% 80%)",
    },
    {
      label: "Active Users",
      value: activeCount,
      icon: "solar:check-circle-bold-duotone",
      color: "#10b981",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl bg-white dark:bg-zinc-900/50 px-4 py-3 flex items-center gap-3">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)`,
            }}
          >
            <Icon icon={stat.icon} className="h-5 w-5" style={{ color: stat.color }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
              {stat.label}
            </p>
            {isLoading ? (
              <Skeleton className="mt-1 h-6 w-12" />
            ) : (
              <p className="mt-0.5 text-lg font-bold tabular-nums leading-tight">
                {stat.value}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
