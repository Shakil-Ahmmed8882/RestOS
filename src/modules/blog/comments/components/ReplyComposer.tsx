"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAddReplyToCommentMutation } from "@/redux/featureApi/replyApi";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCommentsSelector } from "../context/CommentsContext";
import type { BlogReply } from "@/modules/blog/types/blog.types";

type Props = {
  commentId: string;
  onSubmitted?: () => void;
};

export function ReplyComposer(props: Props) {
  const { commentId, onSubmitted } = props;
  const { blogId, user, expandThread } = useCommentsSelector();
  const { requireAuth } = useRequireAuth();
  const [value, setValue] = useState("");
  const [addReply, { isLoading: submitting }] = useAddReplyToCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    const text = value.trim();
    if (!text || !user) return;

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const temp: BlogReply = {
      _id: tempId,
      _tempId: tempId,
      _pending: true,
      // The server stores the body on `comment`; we set both so reads
      // via `reply.comment ?? reply.replyText` work in either order.
      comment: text,
      replyText: text,
      user: {
        _id: user?.id,
        name: user?.name ?? "You",
        photo: user?.photoURL ?? null,
        role: user?.role,
      },
      createdAt: new Date().toISOString(),
    };

    // Clear input immediately — optimistic row already shows in the
    // thread. Restore the draft if the server rejects.
    setValue("");
    // Auto-expand so the user sees their reply land at the top instead
    // of staying hidden behind a collapsed "See replies" toggle.
    expandThread(commentId);
    try {
      await addReply({
        commentId,
        blogId,
        replyText: text,
        _tempEntry: temp,
      }).unwrap();
      onSubmitted?.();
    } catch (err: any) {
      setValue(text);
      toast.error(err?.data?.message ?? "Couldn't post reply");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex items-center gap-2"
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={user?.photoURL ?? undefined} alt={user?.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-semibold">
          {user?.name?.[0]?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a reply…"
        className="flex-1 h-9 px-3.5 rounded-full bg-silk text-[13px] text-foreground placeholder:text-muted-foreground/70 border-0 outline-none focus:ring-0"
      />
      <button
        type="submit"
        disabled={submitting || !value.trim()}
        className="h-9 px-4 rounded-full bg-primary text-white text-xs font-semibold disabled:opacity-60 hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5"
      >
        {submitting ? (
          <Icon icon="solar:refresh-linear" className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Icon icon="solar:plain-2-bold" className="h-3.5 w-3.5" />
        )}
        Reply
      </button>
    </form>
  );
}
