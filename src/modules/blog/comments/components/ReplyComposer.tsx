"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { useAddReplyToCommentMutation } from "@/redux/featureApi/replyApi";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCommentsSelector } from "../context/CommentsContext";

type Props = {
  commentId: string;
  onSubmitted?: () => void;
};

export function ReplyComposer(props: Props) {
  const { commentId, onSubmitted } = props;
  const { blogId } = useCommentsSelector();
  const { requireAuth } = useRequireAuth();
  const [value, setValue] = useState("");
  const [addReply, { isLoading: submitting }] = useAddReplyToCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    const text = value.trim();
    if (!text) return;
    try {
      await addReply({ commentId, replyText: text, blogId }).unwrap();
      setValue("");
      onSubmitted?.();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Couldn't post reply");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a reply…"
        className="flex-1 h-9 px-3 rounded-full bg-silk-with-hover text-sm text-foreground placeholder:text-muted-foreground/70 border-0 outline-none focus:ring-0"
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
