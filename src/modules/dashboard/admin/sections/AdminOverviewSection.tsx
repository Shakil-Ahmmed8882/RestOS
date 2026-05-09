"use client";

import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BaseImage } from "@/components/common/BaseImage";
import { useGetAnalyticsMatrixQuery } from "@/redux/featureApi/analyticsApi";
import { DonutBreakdownChartLayout } from "@/components/rest-os-ui/charts/donut-breakdown-chart/DonutBreakdownChartLayout";
import { LineChartLayout } from "@/components/rest-os-ui/charts/line-chart/LineChartLayout";
import type {
  DonutSlice,
  SliceStyleMap,
} from "@/components/rest-os-ui/charts/donut-breakdown-chart/types";
import type {
  LineSeries,
  LineSeriesStyleMap,
} from "@/components/rest-os-ui/charts/line-chart/types";
import type {
  AnalyticsMatrix,
  RecentOrder,
  RecentUser,
  TopFood,
} from "../types/analytics.types";
import { cn } from "@/lib/utils";

// ─── design tokens ─────────────────────────────────────────────────────────────
// Primary ≈ hsl(336 100% 63%) — rose/pink. All accents branch from this.
const PRIMARY = "hsl(336 100% 63%)";
const PRIMARY_80 = "hsl(336 100% 71%)";
const PRIMARY_50 = "hsl(336 100% 80%)";

// Semantic colours kept minimal — only for status badges where meaning matters
const STATUS_HEX: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#10b981",
  preparing: "#3b82f6",
  delivered: "#8b5cf6",
  cancelled: "#ef4444",
};
const STATUS_ICON: Record<string, string> = {
  pending: "solar:clock-circle-bold-duotone",
  confirmed: "solar:check-circle-bold-duotone",
  preparing: "solar:chef-hat-bold-duotone",
  delivered: "solar:delivery-bold-duotone",
  cancelled: "solar:close-circle-bold-duotone",
};
const ROLE_HEX: Record<string, string> = { USER: PRIMARY, ADMIN: PRIMARY_80 };

// Engagement uses a primary-adjacent palette
const ENG_HEX: Record<string, string> = {
  upvote: PRIMARY,
  downvote: "#ef4444",
  comment: PRIMARY_80,
  blog: PRIMARY_50,
  "unsave-blog": "#8b5cf6",
};

// ─── helpers ───────────────────────────────────────────────────────────────────
function initials(n: string) {
  return n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
function fmt$(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
function fallback(map: Record<string, string>, k: string, i: number) {
  const d = [PRIMARY, PRIMARY_80, PRIMARY_50, "#8b5cf6", "#ef4444", "#10b981"];
  return map[k] ?? d[i % d.length];
}

// ─── card shell ────────────────────────────────────────────────────────────────
function DCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("dash-card overflow-hidden dark:bg-zinc-900/50", className)}>{children}</div>
  );
}

// Bigger, bolder header that matches the inspiration screenshot
function DHead({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between px-4 pb-2 pt-3">
      <div>
        <p className="text-[18px] font-bold text-foreground leading-tight">
          {title}
        </p>
        {sub && <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// Slightly tinted muted background wrapping charts for contrast/highlight
function ChartShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-3 mb-2 rounded-xl px-3 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  sub,
  loading,
  accent,
}: {
  label: string;
  value: string | number;
  icon: string;
  sub?: string;
  loading?: boolean;
  accent?: string;
}) {
  const color = accent ?? PRIMARY;
  return (
    <DCard className="flex items-center gap-3 px-4 py-3">
      <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
        style={{
          backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
        }}
      >
        <Icon icon={icon} className="h-5 w-5" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
          {label}
        </p>
        {loading ? (
          <Skeleton className="mt-1 h-6 w-16" />
        ) : (
          <p className="mt-0.5 text-lg font-bold tabular-nums leading-tight tracking-tight">
            {value}
          </p>
        )}
        {sub && (
          <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>
        )}
      </div>
    </DCard>
  );
}

// ─── ring progress (SVG) ───────────────────────────────────────────────────────
function Ring({
  pct,
  color,
  label,
  sub,
}: {
  pct: number;
  color: string;
  label: string;
  sub: string;
}) {
  const r = 38,
    circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 100) / 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            className="text-muted/60"
          />
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeDasharray={`${circ}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 48 48)"
            style={{ transition: "stroke-dashoffset 0.9s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-[15px] font-extrabold tabular-nums leading-none"
            style={{ color }}
          >
            {Math.round(pct)}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[13px] font-semibold">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

// ─── charts ────────────────────────────────────────────────────────────────────
function EngagementLine({
  m,
  loading,
}: {
  m?: AnalyticsMatrix;
  loading: boolean;
}) {
  const sorted = [...(m?.engagementByType ?? [])].sort(
    (a, b) => a.count - b.count,
  );
  const series: LineSeries<"eng">[] = [
    {
      id: "eng",
      label: "Interactions",
      data: sorted.map((e) => ({ x: e.type, y: e.count })),
    },
  ];
  const styles: LineSeriesStyleMap<"eng"> = {
    eng: {
      fillUnder: true,
      fillOpacity: 0.12,
      strokeWidth: 2.5,
      curveType: "monotone",
      showDots: true,
    },
  };
  return (
    <LineChartLayout
      series={loading ? [] : series}
      styles={styles}
      isLoading={loading}
      dimensions={{ height: 210 }}
      yAxis={{ ticks: 4 }}
      tooltip={{ formatValue: (v) => `${v} actions` }}
    />
  );
}

function RoleDonut({ m, loading }: { m?: AnalyticsMatrix; loading: boolean }) {
  const data: DonutSlice[] = (m?.usersByRole ?? []).map((r) => ({
    id: r.role,
    label: r.role === "ADMIN" ? "Admins" : "Users",
    value: r.count,
  }));
  const styles: SliceStyleMap = Object.fromEntries(
    (m?.usersByRole ?? []).map((r, i) => [
      r.role,
      { color: fallback(ROLE_HEX, r.role, i) },
    ]),
  );
  return (
    <div className="dark:text-foreground flex justify-center">
      <DonutBreakdownChartLayout
        data={data}
        styles={styles as any}
        isLoading={loading}
        dimensions={{ size: 200, thickness: 30 }}
        formatValue={(v) => `${v}`}
      />
    </div>
  );
}

function EngDonut({ m, loading }: { m?: AnalyticsMatrix; loading: boolean }) {
  const data: DonutSlice[] = (m?.engagementByType ?? []).map((e) => ({
    id: e.type,
    label: e.type.replace(/-/g, " "),
    value: e.count,
  }));
  const styles: SliceStyleMap = Object.fromEntries(
    (m?.engagementByType ?? []).map((e, i) => [
      e.type,
      { color: fallback(ENG_HEX, e.type, i) },
    ]),
  );
  return (
    <div className="dark:text-foreground flex justify-center">
      <DonutBreakdownChartLayout
        data={data}
        styles={styles as any}
        isLoading={loading}
        dimensions={{ size: 200, thickness: 30 }}
        formatValue={(v) => `${v}`}
      />
    </div>
  );
}

// ─── order status bars ─────────────────────────────────────────────────────────
function StatusBars({ m, loading }: { m?: AnalyticsMatrix; loading: boolean }) {
  if (loading)
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  const total = (m?.ordersByStatus ?? []).reduce((s, x) => s + x.revenue, 0);
  if (!total && !m?.ordersByStatus?.length)
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No order data yet
      </p>
    );
  return (
    <div className="space-y-4">
      {(m?.ordersByStatus ?? []).map((s) => {
        const pct = total > 0 ? (s.revenue / total) * 100 : 0;
        const col = STATUS_HEX[s.status] ?? PRIMARY;
        return (
          <div key={s.status} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div
                  className="grid h-7 w-7 place-items-center rounded-lg"
                  style={{ backgroundColor: `${col}18` }}
                >
                  <Icon
                    icon={STATUS_ICON[s.status] ?? "solar:chart-bold-duotone"}
                    className="h-3.5 w-3.5"
                    style={{ color: col }}
                  />
                </div>
                <span className="capitalize">{s.status}</span>
                <span className="text-xs text-muted-foreground">
                  ({s.count} orders)
                </span>
              </div>
              <span className="text-sm font-bold tabular-nums">
                ${s.revenue.toFixed(0)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  backgroundColor: col,
                  transition: "width 0.8s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── recent orders ─────────────────────────────────────────────────────────────
function RecentOrders({
  orders,
  loading,
}: {
  orders?: RecentOrder[];
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="space-y-2.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-5 w-18 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  if (!orders?.length)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No recent orders
      </p>
    );
  return (
    <div className="space-y-1">
      {orders.map((o, i) => (
        <div key={o._id}>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/40">
            <BaseImage
              src={o.food.foodImage}
              alt={o.food.foodName}
              width={40}
              height={40}
              containerClassName="h-9 w-9 shrink-0 rounded-lg"
              className="object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {o.food.foodName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {o.user.name} · {fmtDate(o.createdAt)}
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-end gap-0.5">
              <span className="text-sm font-semibold tabular-nums">
                ${o.totalPrice.toFixed(2)}
              </span>
              <Badge
                variant="secondary"
                className="h-4 px-1.5 text-[9px] capitalize font-semibold leading-none"
                style={{
                  backgroundColor: `${STATUS_HEX[o.status] ?? "#6b7280"}18`,
                  color: STATUS_HEX[o.status] ?? "#6b7280",
                }}
              >
                {o.status}
              </Badge>
            </div>
          </div>
          {i < orders.length - 1 && <Separator className="opacity-50" />}
        </div>
      ))}
    </div>
  );
}

// ─── recent users ──────────────────────────────────────────────────────────────
function RecentUsers({
  users,
  loading,
}: {
  users?: RecentUser[];
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="space-y-2.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>
    );
  if (!users?.length)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No recent users
      </p>
    );
  return (
    <div className="space-y-1">
      {users.map((u, i) => (
        <div key={u._id}>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/40">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={u.photo} alt={u.name} />
              <AvatarFallback className="text-xs font-semibold">
                {initials(u.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{u.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {u.email}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="h-4 shrink-0 px-1.5 text-[9px] font-semibold leading-none"
              style={{
                backgroundColor: `${ROLE_HEX[u.role] ?? PRIMARY}18`,
                color: ROLE_HEX[u.role] ?? PRIMARY,
              }}
            >
              {u.role}
            </Badge>
          </div>
          {i < users.length - 1 && <Separator className="opacity-50" />}
        </div>
      ))}
    </div>
  );
}

// ─── top foods ─────────────────────────────────────────────────────────────────
function TopFoods({ foods, loading }: { foods?: TopFood[]; loading: boolean }) {
  if (loading)
    return (
      <div className="space-y-2.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-14" />
          </div>
        ))}
      </div>
    );
  if (!foods?.length)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No food data
      </p>
    );
  return (
    <div className="space-y-1">
      {foods.map((f, i) => (
        <div key={f._id}>
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/40">
            <BaseImage
              src={f.foodImage}
              alt={f.foodName}
              width={40}
              height={40}
              containerClassName="h-9 w-9 shrink-0 rounded-lg"
              className="object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{f.foodName}</p>
              <p className="truncate text-xs capitalize text-muted-foreground">
                {f.foodCategory}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className="text-sm font-semibold tabular-nums"
                style={{ color: PRIMARY }}
              >
                ${f.price.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">{f.orders} orders</p>
            </div>
          </div>
          {i < foods.length - 1 && <Separator className="opacity-50" />}
        </div>
      ))}
    </div>
  );
}

// ─── activity pulse ────────────────────────────────────────────────────────────
function ActivityPulse({
  m,
  loading,
}: {
  m?: AnalyticsMatrix;
  loading: boolean;
}) {
  const items = [
    {
      label: "Today",
      value: m?.todayActivity ?? 0,
      icon: "solar:sun-bold-duotone",
      color: PRIMARY,
    },
    {
      label: "This month",
      value: m?.thisMonthActivity ?? 0,
      icon: "solar:calendar-bold-duotone",
      color: PRIMARY_80,
    },
    {
      label: "Last month",
      value: m?.lastMonthActivity ?? 0,
      icon: "solar:calendar-date-bold-duotone",
      color: PRIMARY_50,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex flex-col items-center gap-1.5 rounded-xl bg-muted/30 dark:bg-muted/20 px-2 py-4 text-center"
        >
          <div
            className="grid h-9 w-9 place-items-center rounded-full"
            style={{
              backgroundColor: `color-mix(in srgb, ${it.color} 15%, transparent)`,
            }}
          >
            <Icon
              icon={it.icon}
              className="h-4 w-4"
              style={{ color: it.color }}
            />
          </div>
          {loading ? (
            <Skeleton className="h-6 w-8 mt-1" />
          ) : (
            <span
              className="text-xl font-extrabold tabular-nums leading-tight"
              style={{ color: it.color }}
            >
              {it.value}
            </span>
          )}
          <span className="text-[11px] text-muted-foreground">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── page ──────────────────────────────────────────────────────────────────────
export function AdminOverviewSection() {
  const { data: res, isLoading: loading } = useGetAnalyticsMatrixQuery();
  const m = res?.data;

  // derived
  const totalStatus = (m?.ordersByStatus ?? []).reduce(
    (s, x) => s + x.count,
    0,
  );
  const confirmedCnt =
    m?.ordersByStatus?.find((s) => s.status === "confirmed")?.count ?? 0;
  const pendingCnt =
    m?.ordersByStatus?.find((s) => s.status === "pending")?.count ?? 0;
  const confirmedPct = totalStatus > 0 ? (confirmedCnt / totalStatus) * 100 : 0;
  const userCnt = m?.usersByRole?.find((r) => r.role === "USER")?.count ?? 0;
  const userPct = m?.totalUsers ? (userCnt / m.totalUsers) * 100 : 0;
  const foodPct = m?.totalFoods
    ? ((m.availableFoods ?? 0) / m.totalFoods) * 100
    : 0;
  const totalEng = (m?.engagementByType ?? []).reduce((s, e) => s + e.count, 0);

  return (
    <div className="space-y-3">
      {/* ── primary stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={m?.totalOrders ?? 0}
          icon="solar:bag-3-bold-duotone"
          loading={loading}
        />
        <StatCard
          label="Confirmed"
          value={confirmedCnt}
          icon="solar:check-circle-bold-duotone"
          loading={loading}
          accent="#10b981"
        />
        <StatCard
          label="Pending"
          value={pendingCnt}
          icon="solar:clock-circle-bold-duotone"
          loading={loading}
          accent="#f59e0b"
        />
        <StatCard
          label="Total Users"
          value={m?.totalUsers ?? 0}
          icon="solar:users-group-rounded-bold-duotone"
          loading={loading}
        />
      </div>

      {/* ── secondary stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Menu Items"
          value={m?.totalFoods ?? 0}
          icon="solar:dish-bold-duotone"
          loading={loading}
        />
        <StatCard
          label="Avg Rating"
          value={`${m?.avgRating ?? 0}/5`}
          icon="solar:star-bold-duotone"
          loading={loading}
          accent="#f59e0b"
        />
        <StatCard
          label="Total Revenue"
          value={fmt$(m?.totalRevenue ?? 0)}
          icon="solar:wallet-money-bold-duotone"
          loading={loading}
          accent="#10b981"
        />
        <StatCard
          label="Engagement"
          value={totalEng}
          icon="solar:chart-bold-duotone"
          loading={loading}
        />
      </div>

      {/* ── charts: donuts + engagement trend ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DCard>
          <DHead
            title="Users by Role"
            sub={`${m?.totalUsers ?? 0} total`}
          />
          <ChartShell>
            <RoleDonut m={m} loading={loading} />
          </ChartShell>
        </DCard>

        <DCard>
          <DHead
            title="Engagement Breakdown"
            sub="By type"
          />
          <ChartShell>
            <EngDonut m={m} loading={loading} />
          </ChartShell>
        </DCard>
      </div>
      

      {/* ── activity pulse + revenue status ── */}
      <div className="flex gap-3 lg:flex-row">
        <DCard className="lg:w-[30%]">
          <DHead title="Activity Pulse" sub="Events by period" />
          <div className="px-3 pb-3">
            <ActivityPulse m={m} loading={loading} />
          </div>
        </DCard>


        <DCard className="lg:flex-1">
          <DHead
            title="Revenue by Status"
            sub="Per fulfillment stage"
          />
          <div className="px-4 pb-3">
            <StatusBars m={m} loading={loading} />
          </div>
        </DCard>
      </div>
<DCard>
          <DHead
            title="Engagement Trend"
            sub="Interaction counts"
          />
          <ChartShell className="px-2">
            <EngagementLine m={m} loading={loading} />
          </ChartShell>
        </DCard>
      {/* ── recent orders ── */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <DCard>
        <DHead title="Recent Orders" sub="Latest 5 transactions" />
        <div className="px-3 pb-3">
          <RecentOrders orders={m?.recentOrders} loading={loading} />
        </div>
      </DCard>

      {/* ── recent users ── */}
      <DCard>
        <DHead title="Recent Users" sub="Newest members" />
        <div className="px-3 pb-3">
          <RecentUsers users={m?.recentUsers} loading={loading} />
        </div>
      </DCard>
      </div>
      
    </div>
  );
}
