"use client";

import { Icon } from "@iconify/react";
import { useCommentsSelector } from "../context/CommentsContext";
import { CommentsHeader } from "../components/CommentsHeader";
import { CommentComposer } from "../components/CommentComposer";
import { CommentItem } from "../components/CommentItem";
import { CommentsSkeleton } from "../components/CommentsSkeleton";

export function CommentsSection() {
  const { comments, isLoading } = useCommentsSelector();

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
          {comments.map((c) =>
            c?._id ? <CommentItem key={c._id} comment={c} /> : null,
          )}
        </div>
      )}
    </div>
  );
}
