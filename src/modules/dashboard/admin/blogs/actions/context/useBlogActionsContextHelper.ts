"use client";

import { useCallback, useState } from "react";

export type TBlogActionMode = "edit" | "delete" | null;

export type TBlogActionTarget = {
  blogId: string;
  blogTitle: string;
};

export const useBlogActionsContextHelper = () => {
  const [mode, setMode] = useState<TBlogActionMode>(null);
  const [target, setTarget] = useState<TBlogActionTarget | null>(null);

  const openEdit = useCallback((t: TBlogActionTarget) => {
    setTarget(t);
    setMode("edit");
  }, []);

  const openDelete = useCallback((t: TBlogActionTarget) => {
    setTarget(t);
    setMode("delete");
  }, []);

  const close = useCallback(() => {
    setMode(null);
    setTarget(null);
  }, []);

  return {
    mode,
    target,
    isOpen: mode !== null,
    openEdit,
    openDelete,
    close,
  };
};
