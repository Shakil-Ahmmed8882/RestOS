"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useMyTabContent } from "../hooks/useMyTabContent";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";
import { ProfileGridSkeleton } from "../skeletons/ProfileGridSkeleton";
import { BlogTabCard } from "./tab-cards/BlogTabCard";
import { SavedTabCard } from "./tab-cards/SavedTabCard";
import { OrderTabCard } from "./tab-cards/OrderTabCard";
import { CommentTabCard } from "./tab-cards/CommentTabCard";
import type {
  BlogItem,
  CommentItem,
  OrderItem,
  ProfileTabKey,
  SavedItem,
} from "../types";

type Props = { tab: ProfileTabKey };

const PAGE_SIZE = 12;

const EMPTY_COPY: Record<ProfileTabKey, { title: string; message: string; icon: string }> = {
  blogs: {
    title: "No publications yet",
    message: "Write your first blog to see it here.",
    icon: "solar:gallery-wide-linear",
  },
  saved: {
    title: "Nothing saved",
    message: "Tap the bookmark icon on any blog to save it here.",
    icon: "solar:bookmark-linear",
  },
  orders: {
    title: "No orders yet",
    message: "Your purchase history will appear here.",
    icon: "solar:bag-3-linear",
  },
  comments: {
    title: "No comments yet",
    message: "Join the conversation on any blog to see your replies here.",
    icon: "solar:chat-round-line-linear",
  },
};

export function ProfileTabContent(props: Props) {
  const { tab } = props;
  const [page, setPage] = useState(1);

  // Reset pagination when the tab changes — important since this component
  // is keyed on `tab` by the parent so each switch starts at page 1.
  const { items, meta, isLoading, isFetching } = useMyTabContent({ tab, page, limit: PAGE_SIZE });

  if (isLoading) return <ProfileGridSkeleton count={PAGE_SIZE} />;

  if (!items.length) {
    const copy = EMPTY_COPY[tab];
    return (
      <div className="rounded-2xl bg-silk-with-hover px-6 py-14 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
          <Icon icon={copy.icon} className="size-6" />
        </span>
        <h3 className="text-base font-semibold text-foreground">{copy.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">{copy.message}</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil((meta?.total ?? items.length) / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="space-y-4">
      <TabGrid tab={tab} items={items} />

      <ShowIf condition={totalPages > 1}>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page <span className="font-semibold text-foreground">{page}</span> of {totalPages}
            <ShowIf condition={isFetching}>
              <span className="ml-2 text-muted-foreground/70">Updating…</span>
            </ShowIf>
          </p>
          <div className="flex items-center gap-2">
            <BaseButton
              intent="ghost"
              size="sm"
              className="rounded-full size-9 px-0"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev || isFetching}
              aria-label="Previous page"
            >
              <Icon icon="solar:arrow-left-linear" className="size-4" />
            </BaseButton>
            <BaseButton
              intent="ghost"
              size="sm"
              className="rounded-full size-9 px-0"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={!canNext || isFetching}
              aria-label="Next page"
            >
              <Icon icon="solar:arrow-right-linear" className="size-4" />
            </BaseButton>
          </div>
        </div>
      </ShowIf>
    </div>
  );
}

function TabGrid({ tab, items }: { tab: ProfileTabKey; items: unknown[] }) {
  if (tab === "blogs") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {(items as BlogItem[]).map((b) => (
          <BlogTabCard key={b?._id} blog={b} />
        ))}
      </div>
    );
  }
  if (tab === "saved") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {(items as SavedItem[]).map((s) => (
          <SavedTabCard key={s?._id} item={s} />
        ))}
      </div>
    );
  }
  if (tab === "orders") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {(items as OrderItem[]).map((o) => (
          <OrderTabCard key={o?._id} order={o} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {(items as CommentItem[]).map((c) => (
        <CommentTabCard key={c?._id} item={c} />
      ))}
    </div>
  );
}
