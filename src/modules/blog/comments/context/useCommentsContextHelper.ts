"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useGetAllCommentsOnSingleBlogQuery,
  useAddCommentOnBlogMutation,
} from "@/redux/featureApi/commentApi";
import { useAppSelector } from "@/redux/hooks";
import type { BlogComment } from "@/modules/blog/types/blog.types";

export type CommentsSort = "newest" | "popular";

type Props = {
  blogId: string;
};

export const useCommentsContextHelper = (props: Props) => {
  const { blogId } = props;
  const user = useAppSelector((s) => s?.auth?.user);

  const { data, isLoading, isFetching, error, refetch } =
    useGetAllCommentsOnSingleBlogQuery(blogId, { skip: !blogId });

  const [sort, setSort] = useState<CommentsSort>("newest");
  const [replyOpenFor, setReplyOpenFor] = useState<string | null>(null);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());

  const [submitComment, { isLoading: submitting }] =
    useAddCommentOnBlogMutation();

  const comments = useMemo<BlogComment[]>(() => {
    const list = (data ?? []) as BlogComment[];
    if (sort === "popular") {
      return [...list].sort(
        (a, b) => (b?.replies?.length ?? 0) - (a?.replies?.length ?? 0),
      );
    }
    return [...list].sort(
      (a, b) =>
        new Date(b?.createdAt ?? 0).getTime() -
        new Date(a?.createdAt ?? 0).getTime(),
    );
  }, [data, sort]);

  const toggleReplyOpen = useCallback((commentId: string | null) => {
    setReplyOpenFor((prev) => (prev === commentId ? null : commentId));
  }, []);

  const toggleThread = useCallback((commentId: string) => {
    setExpandedThreads((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  }, []);

  const submitNewComment = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !user) return false;
      const optimisticId = `optimistic-${Date.now()}`;
      try {
        await submitComment({
          blog: blogId,
          comment: trimmed,
          _optimisticEntry: {
            _id: optimisticId,
            comment: trimmed,
            blog: blogId,
            user: {
              _id: user?.id,
              name: user?.name ?? "You",
              photo: user?.photoURL ?? undefined,
            },
            createdAt: new Date().toISOString(),
            replies: [],
            _pending: true,
          },
        }).unwrap();
        return true;
      } catch {
        return false;
      }
    },
    [blogId, submitComment, user],
  );

  return {
    blogId,
    user,
    comments,
    isLoading,
    isFetching,
    error,
    refetch,
    sort,
    setSort,
    replyOpenFor,
    toggleReplyOpen,
    expandedThreads,
    toggleThread,
    submitNewComment,
    submitting,
  };
};
