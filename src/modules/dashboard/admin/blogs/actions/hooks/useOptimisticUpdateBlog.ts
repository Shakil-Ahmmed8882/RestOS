"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useUpdateBlogMutation } from "@/redux/featureApi/blogApi";
import blogApi from "@/redux/featureApi/blogApi";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import type { TBlog } from "@/modules/dashboard/admin/blogs/types";

export type BlogUpdatePayload = {
  title?: string;
  category?: string;
  tags?: string[];
  description?: string;
  status?: "pending" | "approved" | "test-approved";
};

type Vars = {
  blogId: string;
  payload: BlogUpdatePayload;
};

export function useOptimisticUpdateBlog() {
  const [updateBlog, mutation] = useUpdateBlogMutation();
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const run = useCallback(
    async ({ blogId, payload }: Vars) => {
      const undoFns: Array<() => void> = [];

      // Detail cache patch
      undoFns.push(
        dispatch(
          blogApi.util.updateQueryData(
            "getSingleBlog",
            blogId,
            (draft: any) => {
              if (!draft) return;
              const target = draft.data ?? draft;
              Object.assign(target, payload);
            },
          ),
        ).undo,
      );

      // List cache patches
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
                  if (idx !== -1) {
                    list[idx] = { ...list[idx], ...payload };
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
        await updateBlog({ id: blogId, data: payload }).unwrap();
        toast.success("Blog updated");
        return true;
      } catch (e: any) {
        rollback();
        toast.error(e?.data?.message ?? "Failed to update blog");
        return false;
      }
    },
    [dispatch, store, updateBlog],
  );

  return { run, isLoading: mutation.isLoading };
}
