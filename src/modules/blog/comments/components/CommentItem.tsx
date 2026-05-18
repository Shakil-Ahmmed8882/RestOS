"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useDeleteCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
} from "@/redux/featureApi/commentApi";
import { useCommentsSelector } from "../context/CommentsContext";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { ReplyComposer } from "./ReplyComposer";
import { ReplyItem } from "./ReplyItem";
import type { BlogComment, BlogAuthor } from "@/modules/blog/types/blog.types";

type Props = {
  comment: BlogComment | null | undefined;
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function authorOf(user: unknown): BlogAuthor {
  if (!user) return { name: "Anonymous" };
  if (typeof user === "string") return { name: "User" };
  const u = user as Record<string, any>;
  return {
    _id: u?._id,
    name: u?.name ?? "User",
    photo: u?.photo ?? null,
  };
}

export function CommentItem(props: Props) {
  const { comment } = props;
  const {
    blogId,
    user,
    replyOpenFor,
    toggleReplyOpen,
    expandedThreads,
    toggleThread,
  } = useCommentsSelector();
  const { requireAuth } = useRequireAuth();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment?.comment ?? "");
  const [updateComment, { isLoading: saving }] = useUpdateCommentOnBlogMutation();
  const [deleteComment, { isLoading: deleting }] = useDeleteCommentOnBlogMutation();

  if (!comment) return null;

  const author = authorOf(comment?.user);
  const replies = comment?.replies ?? [];
  const isReplyOpen = replyOpenFor === comment._id;
  const isExpanded = expandedThreads.has(comment._id);
  const isOwner =
    user?.id && typeof comment?.user === "object" && (comment?.user as any)?._id === user.id;
  const canModify = isOwner || user?.role === "ADMIN";
  const isPending = Boolean((comment as any)?._pending);

  const handleReplyClick = () => {
    if (!requireAuth()) return;
    toggleReplyOpen(comment._id);
  };

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    try {
      await updateComment({
        id: comment._id,
        comment: trimmed,
        blogId,
      }).unwrap();
      setEditing(false);
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't save comment");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment({ id: comment._id, blogId }).unwrap();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't delete comment");
    }
  };

  return (
    <div
      className={`flex items-start gap-3 ${isPending ? "opacity-70" : ""}`}
    >
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarImage src={author?.photo ?? undefined} alt={author?.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
          {author?.name?.[0]?.toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground">
            {author?.name}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {fmtDate(comment?.createdAt)}
          </span>
          {isPending && (
            <span className="text-[10px] font-semibold text-primary">
              Posting…
            </span>
          )}
        </div>

        {editing ? (
          <div className="mt-2 space-y-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              className="w-full rounded-xl bg-silk-with-hover text-sm text-foreground p-3 border-0 outline-none focus:ring-0 resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="h-8 px-3 rounded-full bg-primary text-white text-xs font-semibold disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setDraft(comment?.comment ?? "");
                }}
                className="h-8 px-3 rounded-full text-xs font-medium text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-sm text-foreground/90 whitespace-pre-wrap break-words">
            {comment?.comment}
          </p>
        )}

        {/* Action row */}
        {!editing && (
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={handleReplyClick}
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Icon icon="solar:chat-round-linear" className="h-3.5 w-3.5" />
              Reply
            </button>
            {canModify && (
              <>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="hover:text-primary transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="hover:text-primary transition-colors"
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </>
            )}
          </div>
        )}

        {isReplyOpen && !editing && (
          <ReplyComposer
            commentId={comment._id}
            onSubmitted={() => toggleReplyOpen(comment._id)}
          />
        )}

        {replies.length > 0 && (
          <button
            type="button"
            onClick={() => toggleThread(comment._id)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <Icon
              icon={
                isExpanded
                  ? "solar:alt-arrow-up-linear"
                  : "solar:alt-arrow-down-linear"
              }
              className="h-3.5 w-3.5"
            />
            {isExpanded ? "Hide" : "See"} {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </button>
        )}

        {isExpanded && replies.length > 0 && (
          <div className="mt-1 ml-2 pl-3 border-l border-zinc-200/60 dark:border-white/[0.06] space-y-1">
            {replies.map((r) =>
              r?._id ? (
                <ReplyItem key={r._id} reply={r} commentId={comment._id} />
              ) : null,
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="More"
        className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground/60 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
      >
        <Icon icon="solar:menu-dots-bold" className="h-4 w-4" />
      </button>
    </div>
  );
}
