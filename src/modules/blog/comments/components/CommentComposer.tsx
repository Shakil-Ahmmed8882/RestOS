"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCommentsSelector } from "../context/CommentsContext";

type Props = {
  placeholder?: string;
  autoFocus?: boolean;
};

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function CommentComposer(props: Props) {
  const { placeholder = "Write a comment…", autoFocus } = props;
  const { user, requireAuth } = useRequireAuth();
  const { submitNewComment, submitting } = useCommentsSelector();
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke the local URL when the picked file changes or the composer unmounts.
  useEffect(() => {
    return () => {
      if (preview) {
        try {
          URL.revokeObjectURL(preview);
        } catch {
          /* noop */
        }
      }
    };
  }, [preview]);

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (preview) {
      try {
        URL.revokeObjectURL(preview);
      } catch {
        /* noop */
      }
    }
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
    e.target.value = "";
  };

  const handleClearImage = () => {
    if (preview) {
      try {
        URL.revokeObjectURL(preview);
      } catch {
        /* noop */
      }
    }
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!value.trim() && !file) return;

    // Snapshot so we can restore on failure.
    const snapshotValue = value;
    const snapshotFile = file;
    const snapshotPreview = preview;

    // Clear immediately — the optimistic row already shows in the list
    // through commentApi.onQueryStarted, so the composer should be empty
    // the moment the user hits Post.
    setValue("");
    setFile(null);
    setPreview(null);

    const ok = await submitNewComment(snapshotValue, snapshotFile);
    if (!ok) {
      // Rollback: restore the draft so the user can retry without
      // losing what they typed.
      setValue(snapshotValue);
      setFile(snapshotFile);
      setPreview(snapshotPreview);
      toast.error("Couldn't post your comment. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-silk p-3 sm:p-4 space-y-3"
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={user?.photoURL ?? undefined} alt={user?.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
            {user?.name?.[0]?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="flex-1 min-h-[44px] resize-none bg-transparent border-0 outline-none focus:ring-0 text-[15px] text-foreground placeholder:text-muted-foreground/70 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              void handleSubmit(e as unknown as React.FormEvent);
            }
          }}
        />
      </div>

      {preview && (
        <div className="relative w-full max-w-[300px] ml-[52px] overflow-hidden rounded-2xl ring-1 ring-zinc-200/60 dark:ring-white/[0.06]">
          <img
            src={preview}
            alt="attachment preview"
            className="block w-full max-h-[280px] object-cover"
          />
          <button
            type="button"
            onClick={handleClearImage}
            aria-label="Remove image"
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pl-[52px]">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-medium text-primary bg-primary/10 hover:bg-primary/15 transition-colors"
          title="Attach image"
        >
          <Icon icon="solar:gallery-add-linear" className="h-4 w-4" />
          Photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          onChange={handlePick}
          className="hidden"
        />

        <button
          type="submit"
          disabled={submitting || (!value.trim() && !file)}
          className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-sm font-semibold shadow-sm shadow-primary/30 disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {submitting ? (
            <>
              <Icon
                icon="solar:refresh-linear"
                className="h-4 w-4 animate-spin"
              />
              Posting
            </>
          ) : (
            <>
              <Icon icon="solar:plain-2-bold" className="h-4 w-4" />
              Post
            </>
          )}
        </button>
      </div>
    </form>
  );
}
