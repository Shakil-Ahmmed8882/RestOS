"use client";

import { Icon } from "@iconify/react";
import { SaveButton } from "@/modules/saves";
import type { SaveType } from "@/modules/dashboard/user/saved/types";

type Props = {
  name: string;
  type: SaveType;
  itemId: string;
};

export function SavedTombstoneCard({ name, type, itemId }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon icon="solar:shield-warning-bold-duotone" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {name || "Untitled"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            This {type} was removed by its author.
          </p>
        </div>
      </div>

      <div className="mt-4 self-start">
        <SaveButton
          type={type}
          itemId={itemId}
          variant="ghost"
          size="sm"
          confirmOnUnsave
          itemName={name || (type === "blog" ? "this blog" : "this food")}
        />
      </div>
    </article>
  );
}
