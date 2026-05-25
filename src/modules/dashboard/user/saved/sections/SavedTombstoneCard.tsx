"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import { useUnsave } from "@/modules/dashboard/user/saved/hooks/useUnsave";
import type { SaveType } from "@/modules/dashboard/user/saved/types";

type Props = {
  name: string;
  type: SaveType;
  itemId: string;
};

export function SavedTombstoneCard({ name, type, itemId }: Props) {
  const unsave = useUnsave();

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

      <button
        type="button"
        onClick={() => unsave.remove(type, itemId)}
        disabled={unsave.isLoading}
        className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15 disabled:opacity-60"
      >
        <ShowIf
          condition={unsave.isLoading}
          fallback={
            <>
              <Icon icon="solar:trash-bin-trash-bold-duotone" className="h-3.5 w-3.5" />
              Remove
            </>
          }
        >
          <Icon icon="svg-spinners:ring-resize" className="h-3.5 w-3.5" />
          Removing…
        </ShowIf>
      </button>
    </article>
  );
}
