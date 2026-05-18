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
    <div className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-zinc-900/60 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/60 dark:ring-white/[0.04]">
      {/* soft primary corner glow — lifts the card off a white background
         without resorting to a hard border or heavy shadow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
      />

      <div className="relative flex items-start justify-between">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon={icon} className="h-4 w-4 text-primary" />
        </div>
        {hasDelta && (
          <span
            className={`text-[11px] font-semibold inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 ${
              positive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-zinc-500/10 text-zinc-500"
            }`}
          >
            <Icon
              icon={
                positive
                  ? "solar:alt-arrow-up-linear"
                  : "solar:alt-arrow-down-linear"
              }
              className="h-3 w-3"
            />
            {Math.abs(delta!)}%
          </span>
        )}
      </div>
      <p className="relative text-xs text-muted-foreground mt-5">{label}</p>
      <p className="relative text-2xl font-bold tracking-tight text-foreground mt-1">
        {value}
      </p>
    </div>
  );
}
