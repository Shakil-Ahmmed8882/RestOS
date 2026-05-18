"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { ConfirmDestructiveSection } from "@/components/rest-os-ui/modal/confirm-destructive";
import {
  useDeleteCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
} from "@/redux/featureApi/commentApi";
import { useCommentsSelector } from "../context/CommentsContext";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { ReplyComposer } from "./ReplyComposer";
import { ReplyItem } from "./ReplyItem";
import type { BlogAuthor, BlogComment } from "@/modules/blog/types/blog.types";

type Props = {
  comment: BlogComment | null | undefined;
};

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draft, setDraft] = useState(comment?.comment ?? "");
  // Image edit state: a freshly-picked file replaces; `removed` clears the existing one.
  const [pickedFile, setPickedFile] = useState<File | null>(null);
  const [pickedPreview, setPickedPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateComment, { isLoading: saving }] = useUpdateCommentOnBlogMutation();
  const [deleteComment, { isLoading: deleting }] = useDeleteCommentOnBlogMutation();

  // Revoke local blob URL on unmount / change.
  useEffect(() => {
    return () => {
      if (pickedPreview) {
        try {
          URL.revokeObjectURL(pickedPreview);
        } catch {
          /* noop */
        }
      }
    };
  }, [pickedPreview]);

  if (!comment) return null;

  const author = authorOf(comment?.user);
  const replies = (comment?.replies ?? []).filter(Boolean);
  const isReplyOpen = replyOpenFor === comment._id;
  const isExpanded = expandedThreads.has(comment._id);
  const commentUserId = getUserId(comment?.user);
  const isOwner = Boolean(
    user?.id && commentUserId && commentUserId === user.id,
  );
  // Edit is owner-only (matches server). Delete can be owner OR ADMIN.
  const canEdit = isOwner;
  const canDelete = isOwner || user?.role === "ADMIN";
  const isPending = Boolean(comment?._pending);
  const busy = saving || deleting;

  // What image should the edit panel show right now?
  // - just picked file → its preview
  // - removed → nothing
  // - otherwise → server image
  const editImageSrc = pickedPreview ?? (removed ? null : comment?.image ?? null);

  const handleReplyClick = () => {
    if (!requireAuth()) return;
    toggleReplyOpen(comment._id);
  };

  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!ACCEPTED.includes(picked.type)) {
      toast.error("Only JPG, PNG, WebP or GIF images are supported.");
      return;
    }
    if (picked.size > MAX_BYTES) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }
    if (pickedPreview) {
      try {
        URL.revokeObjectURL(pickedPreview);
      } catch {
        /* noop */
      }
    }
    setPickedFile(picked);
    setPickedPreview(URL.createObjectURL(picked));
    setRemoved(false);
    e.target.value = "";
  };

  const handleClearImage = () => {
    if (pickedPreview) {
      try {
        URL.revokeObjectURL(pickedPreview);
      } catch {
        /* noop */
      }
    }
    setPickedFile(null);
    setPickedPreview(null);
    // If the server had an image and the user clears, treat as removeImage.
    setRemoved(Boolean(comment?.image));
  };

  const resetEditState = () => {
    setEditing(false);
    setDraft(comment?.comment ?? "");
    if (pickedPreview) {
      try {
        URL.revokeObjectURL(pickedPreview);
      } catch {
        /* noop */
      }
    }
    setPickedFile(null);
    setPickedPreview(null);
    setRemoved(false);
  };

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed && !pickedFile && !removed) {
      resetEditState();
      return;
    }
    try {
      await updateComment({
        id: comment._id,
        blogId,
        // Only send `comment` if it actually changed.
        ...(trimmed !== comment?.comment && { comment: trimmed || undefined }),
        ...(pickedFile && { file: pickedFile }),
        ...(removed && !pickedFile && { removeImage: true }),
      }).unwrap();
      resetEditState();
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't save comment");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment({ id: comment._id, blogId }).unwrap();
      setConfirmOpen(false);
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Couldn't delete comment");
    }
  };

  return (
    <article
      className={`flex items-start gap-3 ${isPending ? "opacity-75" : ""}`}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={author?.photo ?? undefined} alt={author?.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
          {author?.name?.[0]?.toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl bg-silk-with-hover px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-semibold text-foreground">
              {author?.name}
            </span>
          </div>

          {editing ? (
            <div className="mt-2 space-y-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-background text-[15px] text-foreground p-3 border-0 outline-none focus:ring-0 resize-none"
              />

              {editImageSrc && (
                <div className="relative w-full max-w-[360px]">
                  <img
                    src={editImageSrc}
                    alt="comment attachment"
                    className="w-full max-h-[280px] object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    aria-label="Remove image"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium text-foreground bg-primary/5 dark:bg-primary/20 border border-primary/40 hover:bg-primary/10 transition-colors"
                >
                  <Icon icon="solar:gallery-add-linear" className="h-4 w-4" />
                  {editImageSrc ? "Change photo" : "Add photo"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED.join(",")}
                  onChange={handlePickImage}
                  className="hidden"
                />

                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="h-9 px-4 rounded-full bg-primary text-white text-xs font-semibold disabled:opacity-60 inline-flex items-center gap-1.5"
                  >
                    {saving ? (
                      <>
                        <Icon
                          icon="solar:refresh-linear"
                          className="h-3.5 w-3.5 animate-spin"
                        />
                        Saving
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetEditState}
                    disabled={saving}
                    className="h-9 px-4 rounded-full text-xs font-medium text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-[15px] leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
              {comment?.comment}
            </p>
          )}
        </div>

        {comment?.image && !editing && (
          <a
            href={comment.image}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block mt-2 max-w-[360px] group/img"
          >
            <img
              src={comment.image}
              alt="comment attachment"
              loading="lazy"
              className="rounded-2xl max-h-[360px] object-cover cursor-zoom-in transition-transform group-hover/img:scale-[1.01]"
            />
          </a>
        )}

        {/* Action row */}
        {!editing && (
          <div className="flex items-center gap-4 mt-1.5 pl-3 text-[12px] text-muted-foreground">
            <span>{fmtDate(comment?.createdAt)}</span>
            {isPending ? (
              <span className="font-semibold text-primary">Posting…</span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleReplyClick}
                  className="font-semibold hover:text-primary transition-colors"
                  disabled={busy}
                >
                  Reply
                </button>
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
            className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
          >
            <Icon
              icon={
                isExpanded
                  ? "solar:alt-arrow-up-linear"
                  : "solar:alt-arrow-down-linear"
              }
              className="h-3.5 w-3.5"
            />
            {isExpanded ? "Hide" : "See"} {replies.length}{" "}
            {replies.length === 1 ? "reply" : "replies"}
          </button>
        )}

        {isExpanded && replies.length > 0 && (
          <div className="mt-2 ml-3 pl-4 border-l-2 border-zinc-200/60 dark:border-white/[0.06] space-y-3">
            {replies.map((r) =>
              r?._id ? (
                <ReplyItem key={r._id} reply={r} commentId={comment._id} />
              ) : null,
            )}
          </div>
        )}
      </div>

      <MultipageModal
        open={confirmOpen}
        onOpenChange={(next) => !next && setConfirmOpen(false)}
        initialPageId="confirm-comment-delete"
      >
        <MultipageModal.Page id="confirm-comment-delete" maxWidth="max-w-[460px]">
          <ConfirmDestructiveSection
            subject="this comment"
            itemName={(comment?.comment ?? "").slice(0, 80) || "comment"}
            isLoading={deleting}
            onConfirm={handleDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        </MultipageModal.Page>
      </MultipageModal>
    </article>
  );
}
