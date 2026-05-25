"use client";

import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { STEP_RAIL, type StepKey } from "@/modules/cart/sections/payment-demo/steps";

type Props = {
  // The step the user is *about to take next*. Renders as the "you are here"
  // pulse; later steps are muted upcoming tiles.
  current: StepKey;
};

export function StepRail({ current }: Props) {
  const currentIndex = STEP_RAIL.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-between gap-1 px-1">
      {STEP_RAIL.map((step, i) => {
        const isCurrent = i === currentIndex;
        return (
          <Fragment key={step.key}>
            <div className="flex min-w-0 flex-col items-center gap-1.5">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                  isCurrent
                    ? "bg-primary text-white shadow-[0_0_0_4px_hsl(var(--primary)/0.18)]"
                    : "bg-zinc-100 text-muted-foreground dark:bg-white/[0.04]",
                ].join(" ")}
              >
                <Icon icon={step.icon} className="h-5 w-5" />
              </div>
              <span
                className={[
                  "text-[10px] font-medium tracking-wide truncate",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {i < STEP_RAIL.length - 1 && (
              <Icon
                icon="solar:arrow-right-linear"
                className="h-4 w-4 shrink-0 text-zinc-300 dark:text-white/20"
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
