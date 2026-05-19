"use client";

import { Icon } from "@iconify/react";
import { ShowIf } from "@/components/common/ShowIf";
import { Button } from "@/components/ui/button";
import type { usePurchasedList } from "@/modules/dashboard/user/purchases/hooks/usePurchasedList";

type Props = {
  purchases: ReturnType<typeof usePurchasedList>;
};

export function PurchasesPagination(props: Props) {
  const { purchases } = props;
  const { meta, page, setPage } = purchases;

  const totalPages = meta?.pages ?? 1;
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
      <p className="text-xs text-muted-foreground tabular-nums">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage(Math.max(1, page - 1))}
        >
          <Icon icon="solar:alt-arrow-left-linear" className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => setPage(Math.min(totalPages, page + 1))}
        >
          Next
          <Icon icon="solar:alt-arrow-right-linear" className="ml-1 h-4 w-4" />
        </Button>
        <ShowIf condition={false}>
          <span className="sr-only" />
        </ShowIf>
      </div>
    </div>
  );
}
