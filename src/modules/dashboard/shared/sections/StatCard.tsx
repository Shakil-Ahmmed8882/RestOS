import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  tone?: "primary" | "success" | "warning" | "info";
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600",
  warning: "bg-amber-500/10 text-amber-600",
  info: "bg-sky-500/10 text-sky-600",
};

export function StatCard({ label, value, icon, trend, tone = "primary" }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className={cn("grid h-12 w-12 place-items-center rounded-lg", TONES[tone])}>
        <Icon icon={icon} className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        {trend ? <p className="mt-0.5 text-xs text-muted-foreground">{trend}</p> : null}
      </div>
    </Card>
  );
}
