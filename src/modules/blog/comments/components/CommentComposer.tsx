"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCommentsSelector } from "../context/CommentsContext";

type Props = {
  placeholder?: string;
  autoFocus?: boolean;
};

export function CommentComposer(props: Props) {
  const { placeholder = "Write your comments here…", autoFocus } = props;
  const { user, requireAuth } = useRequireAuth();
  const { submitNewComment, submitting } = useCommentsSelector();
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!value.trim()) return;
    const ok = await submitNewComment(value);
    if (ok) setValue("");
  };

  const handleFocusGuard = () => {
    // Opening the sign-in modal eagerly while focusing is too aggressive —
    // the gate fires on submit instead, matching what most blog apps do.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start gap-3 rounded-2xl bg-silk-with-hover p-3 sm:p-4 transition-colors"
    >
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarImage src={user?.photoURL ?? undefined} alt={user?.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
          {user?.name?.[0]?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 flex items-center gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocusGuard}
          rows={1}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="flex-1 resize-none bg-transparent border-0 outline-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground/70 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              void handleSubmit(e as any);
            }
          }}
        />
        <button
          type="submit"
          disabled={submitting || !value.trim()}
          aria-label="Post comment"
          className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm shadow-primary/30 disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {submitting ? (
            <Icon icon="solar:refresh-linear" className="h-4 w-4 animate-spin" />
          ) : (
            <Icon icon="solar:plain-2-bold" className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  );
}
