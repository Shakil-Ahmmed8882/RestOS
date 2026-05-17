"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useDeleteBlogMutation } from "@/redux/featureApi/blogApi";
import blogApi from "@/redux/featureApi/blogApi";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import type { TBlog } from "@/modules/dashboard/admin/blogs/types";

export function useOptimisticDeleteBlog() {
  const [deleteBlog, mutation] = useDeleteBlogMutation();
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const run = useCallback(
    async (blogId: string) => {
      const undoFns: Array<() => void> = [];

      try {
        const state = store.getState();
        const argsList = blogApi.util.selectCachedArgsForQuery(
          state,
          "getAllBlogs",
        );
        argsList.forEach((args) => {
          undoFns.push(
            dispatch(
              blogApi.util.updateQueryData(
                "getAllBlogs",
                args,
                (draft: any) => {
                  const list: TBlog[] | undefined = draft?.data ?? draft;
                  if (!Array.isArray(list)) return;
                  const idx = list.findIndex((b) => b._id === blogId);
                  if (idx !== -1) list.splice(idx, 1);
                  if (draft?.meta?.total) {
                    draft.meta.total = Math.max(0, draft.meta.total - 1);
                  }
                },
              ),
            ).undo,
          );
        });
      } catch {
        // best-effort
      }

      const rollback = () => undoFns.forEach((fn) => fn());

      try {
        await deleteBlog(blogId).unwrap();
        toast.success("Blog deleted");
        return true;
      } catch (e: any) {
        rollback();
        toast.error(e?.data?.message ?? "Failed to delete blog");
        return false;
      }
    },
    [dispatch, store, deleteBlog],
  );

  return { run, isLoading: mutation.isLoading };
}
