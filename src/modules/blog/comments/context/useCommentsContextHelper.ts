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
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(
    new Set(),
  );

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

  const expandThread = useCallback((commentId: string) => {
    setExpandedThreads((prev) => {
      if (prev.has(commentId)) return prev;
      const next = new Set(prev);
      next.add(commentId);
      return next;
    });
  }, []);

  /**
   * Submit a new comment optimistically. The temp doc carries:
   *  - the authed user (so the avatar + name show instantly)
   *  - a local blob URL for the picked image (revoked on swap)
   *  - a _tempId / _pending flag the API layer uses to splice the
   *    server-confirmed doc back in.
   */
  const submitNewComment = useCallback(
    async (text: string, file?: File | null) => {
      const trimmed = text.trim();
      if (!trimmed || !user) return false;
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const localImageUrl =
        file && typeof window !== "undefined"
          ? URL.createObjectURL(file)
          : undefined;
      try {
        await submitComment({
          blog: blogId,
          comment: trimmed,
          file: file ?? undefined,
          _tempEntry: {
            _id: tempId,
            _tempId: tempId,
            _pending: true,
            comment: trimmed,
            blog: blogId,
            user: {
              _id: user?.id,
              name: user?.name ?? "You",
              photo: user?.photoURL ?? null,
              role: user?.role,
            },
            image: localImageUrl ?? null,
            imagePublicId: null,
            createdAt: new Date().toISOString(),
            replies: [],
            _localImageUrl: localImageUrl,
          },
        }).unwrap();
        return true;
      } catch {
        if (localImageUrl) {
          try {
            URL.revokeObjectURL(localImageUrl);
          } catch {
            /* noop */
          }
        }
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
    expandThread,
    submitNewComment,
    submitting,
  };
};
