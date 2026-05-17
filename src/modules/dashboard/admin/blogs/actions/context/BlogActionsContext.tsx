"use client";

import { type ReactNode } from "react";
import { makeSelectorContext } from "@/components/rest-os-ui/shared-context/makeSelectorContext";
import { useContextSelector } from "@/components/rest-os-ui/shared-context/useContextSelector";
import { useBlogActionsContextHelper } from "./useBlogActionsContextHelper";

type TBlogActions = ReturnType<typeof useBlogActionsContextHelper>;

export const { Context, Provider } = makeSelectorContext<TBlogActions>("BlogActions");

export const BlogActionsProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useBlogActionsContextHelper()}>{children}</Provider>;
};

export const useBlogActionsSelector = () => ({
  mode: useContextSelector(Context, "BlogActions", (s) => s.mode),
  target: useContextSelector(Context, "BlogActions", (s) => s.target),
  isOpen: useContextSelector(Context, "BlogActions", (s) => s.isOpen),
  openEdit: useContextSelector(Context, "BlogActions", (s) => s.openEdit),
  openDelete: useContextSelector(Context, "BlogActions", (s) => s.openDelete),
  close: useContextSelector(Context, "BlogActions", (s) => s.close),
});
