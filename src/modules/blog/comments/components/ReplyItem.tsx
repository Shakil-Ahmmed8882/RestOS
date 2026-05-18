"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useDeleteReplyOnCommentMutation,
  useUpdateReplyOnCommentMutation,
} from "@/redux/featureApi/replyApi";
import { useCommentsSelector } from "../context/CommentsContext";
import type { BlogReply, BlogAuthor } from "@/modules/blog/types/blog.types";

type Props = {
  reply: BlogReply | null | undefined;
  commentId: string;
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

export function ReplyItem(props: Props) {
  const { reply, commentId } = props;
  const { blogId, user } = useCommentsSelector();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(reply?.replyText ?? "");
  const [updateReply, { isLoading: saving }] = useUpdateReplyOnCommentMutation();
  const [deleteReply, { isLoading: deleting }] = useDeleteReplyOnCommentMutation();

  if (!reply) return null;

  const author = authorOf(reply?.user);
  const isOwner =
    user?.id && typeof reply?.user === "object" && (reply?.user as any)?._id === user.id;
  const canModify = isOwner || user?.role === "ADMIN";

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    try {
      await updateReply({
        replyId: reply._id,
        commentId,
        replyText: trimmed,
        blogId,
      }).unwrap();
      setEditing(false);
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't save reply");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await deleteReply({ replyId: reply._id, commentId }).unwrap();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't delete reply");
    }
  };

  return (
    <div className="flex items-start gap-3 pt-3">
      <Avatar className="h-8 w-8 flex-shrink-0">
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
            {fmtDate(reply?.createdAt)}
          </span>
        </div>

        {editing ? (
          <div className="mt-2 space-y-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
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
                  setDraft(reply?.replyText ?? "");
                }}
                className="h-8 px-3 rounded-full text-xs font-medium text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-sm text-foreground/90 whitespace-pre-wrap break-words">
            {reply?.replyText}
          </p>
        )}

        {canModify && !editing && (
          <div className="flex items-center gap-3 mt-2 text-[11px] font-medium text-muted-foreground">
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
