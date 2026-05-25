"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useCommentsSelector } from "../context/CommentsContext";
import { CommentsHeader } from "../components/CommentsHeader";
import { CommentComposer } from "../components/CommentComposer";
import { CommentItem } from "../components/CommentItem";
import { CommentsSkeleton } from "../components/CommentsSkeleton";
import { useIntersection } from "@/components/rest-os-ui/infinite-scroll/hooks/useIntersection";

const PAGE_SIZE = 10;

export function CommentsSection() {
  const { comments, isLoading } = useCommentsSelector();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset the window whenever the underlying comment set shrinks below it
  // (e.g. blog switch in the drawer) so the sentinel re-engages cleanly.
  useEffect(() => {
    if (visibleCount > Math.max(PAGE_SIZE, comments.length)) {
      setVisibleCount(Math.max(PAGE_SIZE, Math.min(comments.length, PAGE_SIZE)));
    }
    // Intentionally only react to length — re-renders from row mutations
    // (count bumps, optimistic swaps) shouldn't reset the window.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments.length]);

  const visibleComments = useMemo(
    () => comments.slice(0, visibleCount),
    [comments, visibleCount],
  );

  const hasMore = visibleCount < comments.length;
  const { ref: sentinelRef, isIntersecting } = useIntersection<HTMLDivElement>(
    { rootMargin: "240px" },
    hasMore,
  );

  useEffect(() => {
    if (isIntersecting && hasMore) {
      setVisibleCount((v) => Math.min(v + PAGE_SIZE, comments.length));
    }
  }, [isIntersecting, hasMore, comments.length]);

  return (
    <div className="space-y-6 ">
      <CommentsHeader />
      <CommentComposer />

      {isLoading ? (
        <CommentsSkeleton count={4} />
      ) : comments.length === 0 ? (
        <div className="rounded-2xl bg-silk-with-hover !p-14 text-center">
          <Icon
            icon="solar:chat-round-dots-linear"
            className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-base font-semibold text-foreground">
            Be the first to comment
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Share what you think about this post.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {visibleComments.map((c) =>
            c?._id ? <CommentItem key={c._id} comment={c} /> : null,
          )}

          {hasMore && (
            <div
              ref={sentinelRef}
              className="py-6 flex items-center justify-center text-xs text-muted-foreground"
            >
              <Icon
                icon="solar:refresh-linear"
                className="h-3.5 w-3.5 animate-spin mr-1.5"
              />
              Loading more comments…
            </div>
          )}
        </div>
      )}
    </div>
  );
}
