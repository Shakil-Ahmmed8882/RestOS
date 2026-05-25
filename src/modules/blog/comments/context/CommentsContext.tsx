"use client";

import { type ReactNode } from "react";
import { makeSelectorContext } from "@/components/rest-os-ui/shared-context/makeSelectorContext";
import { useContextSelector } from "@/components/rest-os-ui/shared-context/useContextSelector";
import { useCommentsContextHelper } from "./useCommentsContextHelper";

type TComments = ReturnType<typeof useCommentsContextHelper>;

export const { Context, Provider } = makeSelectorContext<TComments>("BlogComments");

type Props = {
  blogId: string;
  children: ReactNode;
};

export const CommentsProvider = ({ blogId, children }: Props) => {
  return <Provider value={useCommentsContextHelper({ blogId })}>{children}</Provider>;
};

export const useCommentsSelector = () => ({
  blogId: useContextSelector(Context, "BlogComments", (s) => s.blogId),
  user: useContextSelector(Context, "BlogComments", (s) => s.user),
  comments: useContextSelector(Context, "BlogComments", (s) => s.comments),
  isLoading: useContextSelector(Context, "BlogComments", (s) => s.isLoading),
  sort: useContextSelector(Context, "BlogComments", (s) => s.sort),
  setSort: useContextSelector(Context, "BlogComments", (s) => s.setSort),
  replyOpenFor: useContextSelector(Context, "BlogComments", (s) => s.replyOpenFor),
  toggleReplyOpen: useContextSelector(Context, "BlogComments", (s) => s.toggleReplyOpen),
  expandedThreads: useContextSelector(Context, "BlogComments", (s) => s.expandedThreads),
  toggleThread: useContextSelector(Context, "BlogComments", (s) => s.toggleThread),
  expandThread: useContextSelector(Context, "BlogComments", (s) => s.expandThread),
  submitNewComment: useContextSelector(Context, "BlogComments", (s) => s.submitNewComment),
  submitting: useContextSelector(Context, "BlogComments", (s) => s.submitting),
});
