"use client";

import { Icon } from "@iconify/react";

type Props = {
  icon: string;
  label: string;
  value: string;
  delta?: number;
};

export function StatCard(props: Props) {
  const { icon, label, value, delta } = props;
  const hasDelta = typeof delta === "number";
  const positive = (delta ?? 0) >= 0;

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between">
        <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-white/[0.04] flex items-center justify-center">
          <Icon
            icon={icon}
            className="h-4 w-4 text-zinc-700 dark:text-zinc-300"
          />
        </div>
        {hasDelta && (
          <span
            className={`text-[11px] font-semibold ${
              positive ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {positive ? "+" : ""}
            {delta}%
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-5">{label}</p>
      <p className="text-2xl font-bold tracking-tight text-foreground mt-1">
        {value}
      </p>
    </div>
  );
}
