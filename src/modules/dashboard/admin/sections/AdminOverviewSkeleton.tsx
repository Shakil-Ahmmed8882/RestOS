import { BaseSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/BaseSkeleton";

function CardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`dash-card overflow-hidden dark:bg-zinc-900/50 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <CardShell className="flex items-center gap-3 px-4 py-3">
      <BaseSkeleton className="h-10 w-10 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <BaseSkeleton className="h-2.5 w-16" />
        <BaseSkeleton className="h-5 w-20" />
      </div>
    </CardShell>
  );
}

function DonutCardSkeleton() {
  return (
    <CardShell>
      <div className="px-4 pb-2 pt-3 space-y-1.5">
        <BaseSkeleton className="h-4 w-32" />
        <BaseSkeleton className="h-3 w-20" />
      </div>
      <div className="mx-3 mb-2 rounded-xl px-3 py-4 flex justify-center">
        <BaseSkeleton className="h-[180px] w-[180px] rounded-full" />
      </div>
    </CardShell>
  );
}

function ListRowSkeleton({ avatar }: { avatar: "square" | "circle" }) {
  return (
    <div className="flex items-center gap-2.5 px-2 py-2">
      <BaseSkeleton
        className={
          avatar === "circle"
            ? "h-8 w-8 rounded-full shrink-0"
            : "h-9 w-9 rounded-lg shrink-0"
        }
      />
      <div className="min-w-0 flex-1 space-y-1.5">
        <BaseSkeleton className="h-3 w-40" />
        <BaseSkeleton className="h-2.5 w-28" />
      </div>
      <BaseSkeleton className="h-4 w-14 shrink-0 rounded-full" />
    </div>
  );
}

export function AdminOverviewSkeleton() {
  return (
    <div className="space-y-3">
      {/* primary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={`p-${i}`} />
        ))}
      </div>

      {/* secondary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={`s-${i}`} />
        ))}
      </div>

      {/* donuts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DonutCardSkeleton />
        <DonutCardSkeleton />
      </div>

      {/* activity pulse + revenue */}
      <div className="flex gap-3 lg:flex-row">
        <CardShell className="lg:w-[30%]">
          <div className="px-4 pb-2 pt-3 space-y-1.5">
            <BaseSkeleton className="h-4 w-28" />
            <BaseSkeleton className="h-3 w-24" />
          </div>
          <div className="px-3 pb-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-muted/30 dark:bg-muted/20 px-2 py-4"
              >
                <BaseSkeleton className="h-9 w-9 rounded-full" />
                <BaseSkeleton className="h-5 w-8" />
                <BaseSkeleton className="h-2.5 w-16" />
              </div>
            ))}
          </div>
        </CardShell>

        <CardShell className="lg:flex-1">
          <div className="px-4 pb-2 pt-3 space-y-1.5">
            <BaseSkeleton className="h-4 w-36" />
            <BaseSkeleton className="h-3 w-32" />
          </div>
          <div className="px-4 pb-3 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <BaseSkeleton className="h-3 w-24" />
                  <BaseSkeleton className="h-3 w-16" />
                </div>
                <BaseSkeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </CardShell>
      </div>

      {/* engagement trend line */}
      <CardShell>
        <div className="px-4 pb-2 pt-3 space-y-1.5">
          <BaseSkeleton className="h-4 w-36" />
          <BaseSkeleton className="h-3 w-28" />
        </div>
        <div className="mx-3 mb-2 rounded-xl px-2 py-4">
          <BaseSkeleton className="h-[210px] w-full" />
        </div>
      </CardShell>

      {/* recent orders + recent users */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CardShell>
          <div className="px-4 pb-2 pt-3 space-y-1.5">
            <BaseSkeleton className="h-4 w-32" />
            <BaseSkeleton className="h-3 w-36" />
          </div>
          <div className="px-3 pb-3 space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <ListRowSkeleton key={i} avatar="square" />
            ))}
          </div>
        </CardShell>
        <CardShell>
          <div className="px-4 pb-2 pt-3 space-y-1.5">
            <BaseSkeleton className="h-4 w-32" />
            <BaseSkeleton className="h-3 w-28" />
          </div>
          <div className="px-3 pb-3 space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <ListRowSkeleton key={i} avatar="circle" />
            ))}
          </div>
        </CardShell>
      </div>
    </div>
  );
}
