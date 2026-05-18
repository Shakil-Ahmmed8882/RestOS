"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { ConfirmDestructiveSection } from "@/components/rest-os-ui/modal/confirm-destructive";
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
    role: u?.role,
  };
}

function getUserId(user: unknown): string | undefined {
  if (typeof user === "string") return user;
  return (user as { _id?: string })?._id;
}

export function ReplyItem(props: Props) {
  const { reply, commentId } = props;
  const { blogId, user } = useCommentsSelector();
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const initialText = reply?.comment ?? reply?.replyText ?? "";
  const [draft, setDraft] = useState(initialText);
  const [updateReply, { isLoading: saving }] = useUpdateReplyOnCommentMutation();
  const [deleteReply, { isLoading: deleting }] = useDeleteReplyOnCommentMutation();

  if (!reply) return null;

  const author = authorOf(reply?.user);
  const isPending = Boolean(reply?._pending);
  const replyUserId = getUserId(reply?.user);
  const isOwner = Boolean(user?.id && replyUserId && replyUserId === user.id);
  // Edit owner-only; Delete owner OR ADMIN.
  const canEdit = isOwner;
  const canDelete = isOwner || user?.role === "ADMIN";
  const busy = saving || deleting;

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
    try {
      await deleteReply({
        replyId: reply._id,
        commentId,
        blogId,
      }).unwrap();
      setConfirmOpen(false);
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't delete reply");
    }
  };

  return (
    <div className={`flex items-start gap-2.5 ${isPending ? "opacity-75" : ""}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={author?.photo ?? undefined} alt={author?.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-semibold">
          {author?.name?.[0]?.toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl bg-silk-with-hover px-3.5 py-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">
              {author?.name}
            </span>
          </div>

          {editing ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                className="w-full rounded-xl bg-background text-sm text-foreground p-2.5 border-0 outline-none focus:ring-0 resize-none"
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
                    setDraft(initialText);
                  }}
                  className="h-8 px-3 rounded-full text-xs font-medium text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
              {reply?.comment ?? reply?.replyText}
            </p>
          )}
        </div>

        {!editing && (
          <div className="flex items-center gap-3 mt-1 pl-3 text-[11px] text-muted-foreground">
            <span>{fmtDate(reply?.createdAt)}</span>
            {isPending ? (
              <span className="font-semibold text-primary">Posting…</span>
            ) : (
              <>
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    disabled={busy}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(true)}
                    disabled={busy}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <MultipageModal
        open={confirmOpen}
        onOpenChange={(next) => !next && setConfirmOpen(false)}
        initialPageId="confirm-reply-delete"
      >
        <MultipageModal.Page id="confirm-reply-delete" maxWidth="max-w-[460px]">
          <ConfirmDestructiveSection
            subject="this reply"
            itemName={initialText.slice(0, 60) || "reply"}
            isLoading={deleting}
            onConfirm={handleDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        </MultipageModal.Page>
      </MultipageModal>
    </div>
  );
}
