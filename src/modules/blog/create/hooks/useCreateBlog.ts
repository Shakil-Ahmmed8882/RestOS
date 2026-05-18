"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateBlogMutation } from "@/redux/featureApi/blogApi";
import { useAppSelector } from "@/redux/hooks";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export type CreateBlogState = {
  title: string;
  category: string;
  tagsCSV: string;
  description: string;
  instructionsLines: string;
  file: File | null;
  preview: string | null;
};

const INITIAL: CreateBlogState = {
  title: "",
  category: "",
  tagsCSV: "",
  description: "",
  instructionsLines: "",
  file: null,
  preview: null,
};

export function useCreateBlog(onCreated?: () => void) {
  const user = useAppSelector((s) => s?.auth?.user);
  const [state, setState] = useState<CreateBlogState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [createBlog, { isLoading: submitting }] = useCreateBlogMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (next: Partial<CreateBlogState>) =>
    setState((s) => ({ ...s, ...next }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!ACCEPTED.includes(picked.type)) {
      toast.error("Only JPG, PNG or WebP images are supported.");
      return;
    }
    if (picked.size > MAX_BYTES) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }
    if (state.preview) {
      try {
        URL.revokeObjectURL(state.preview);
      } catch {
        /* noop */
      }
    }
    update({
      file: picked,
      preview: URL.createObjectURL(picked),
    });
    e.target.value = "";
  };

  const clearImage = () => {
    if (state.preview) {
      try {
        URL.revokeObjectURL(state.preview);
      } catch {
        /* noop */
      }
    }
    update({ file: null, preview: null });
  };

  const reset = () => {
    if (state.preview) {
      try {
        URL.revokeObjectURL(state.preview);
      } catch {
        /* noop */
      }
    }
    setState(INITIAL);
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!user?.id) {
      setError("You must be signed in to publish.");
      return false;
    }
    if (!state.title.trim()) {
      setError("Add a title.");
      return false;
    }
    if (!state.category.trim()) {
      setError("Pick a category.");
      return false;
    }
    if (!state.description.trim()) {
      setError("Write a short description.");
      return false;
    }
    if (!state.file) {
      setError("Cover image is required.");
      return false;
    }

    const tags = state.tagsCSV
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const instructions = state.instructionsLines
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const fd = new FormData();
    fd.append("file", state.file);
    fd.append(
      "data",
      JSON.stringify({
        title: state.title.trim(),
        category: state.category.trim(),
        tags,
        description: state.description.trim(),
        instructions: instructions.length > 0 ? instructions : ["—"],
        author: { user: user.id, name: user.name ?? "Author" },
      }),
    );

    try {
      await createBlog(fd as unknown as Record<string, unknown>).unwrap();
      toast.success("Sent for review", {
        description: "Your story is pending approval and will appear shortly.",
      });
      reset();
      onCreated?.();
      return true;
    } catch (e: any) {
      const msg = e?.data?.message ?? "Couldn't publish your story.";
      setError(msg);
      toast.error(msg);
      return false;
    }
  };

  return {
    user,
    state,
    update,
    fileInputRef,
    handleFile,
    clearImage,
    reset,
    handleSubmit,
    submitting,
    error,
  };
}
