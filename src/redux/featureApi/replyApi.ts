import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import type { BlogComment, BlogReply } from "@/modules/blog/types/blog.types";

/**
 * Reply endpoints. Server returns the parent Comment with `replies`
 * embedded; our optimistic helpers splice the array on the comment doc
 * inside the comments-list cache and swap by `_tempId` once the server
 * confirms.
 */

type AddReplyArgs = {
  commentId: string;
  blogId: string;
  replyText: string;
  _tempEntry?: BlogReply;
};

type UpdateReplyArgs = {
  commentId: string;
  replyId: string;
  blogId: string;
  replyText: string;
};

type DeleteReplyArgs = {
  commentId: string;
  replyId: string;
  blogId: string;
};

const extractServerComment = (resp: any): BlogComment | undefined =>
  resp?.data && !Array.isArray(resp.data) ? (resp.data as BlogComment) : undefined;

const replyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReplyToComment: builder.mutation<any, AddReplyArgs>({
      query: ({ commentId, replyText, blogId }) => ({
        url: `/replies/${commentId}/reply`,
        method: "POST",
        body: { replyText, blogId },
      }),
      async onQueryStarted(
        { commentId, blogId, _tempEntry },
        { dispatch, queryFulfilled },
      ) {
        if (!_tempEntry) {
          await queryFulfilled.catch(() => undefined);
          return;
        }
        const tempId = _tempEntry._tempId ?? _tempEntry._id;
        const patch = dispatch(
          (
            baseApi.util as any
          ).updateQueryData(
            "getAllCommentsOnSingleBlog",
            blogId,
            (draft: BlogComment[]) => {
              const c = draft.find((x) => x?._id === commentId);
              if (!c) return;
              if (!Array.isArray(c.replies)) c.replies = [];
              // Insert at the top so the user sees their reply land
              // immediately instead of scrolling. Server-confirmed swap
              // below preserves this position via the _tempId lookup.
              c.replies.unshift(_tempEntry);
            },
          ),
        );
        try {
          const { data } = await queryFulfilled;
          const serverComment = extractServerComment(data);
          dispatch(
            (
              baseApi.util as any
            ).updateQueryData(
              "getAllCommentsOnSingleBlog",
              blogId,
              (draft: BlogComment[]) => {
                const idx = draft.findIndex((x) => x?._id === commentId);
                if (idx === -1) return;
                const c = draft[idx];
                if (serverComment?._id) {
                  // Find the freshly-added reply on the server doc — assume
                  // the one missing from our current cached replies (by id)
                  // is the new one. Fallback: last reply in the server list.
                  const localIds = new Set(
                    (c.replies ?? [])
                      .map((r) => r?._id)
                      .filter((v): v is string => Boolean(v) && !v.startsWith("temp-")),
                  );
                  const serverReplies = serverComment.replies ?? [];
                  const newReply =
                    serverReplies.find((r) => r?._id && !localIds.has(r._id)) ??
                    serverReplies[serverReplies.length - 1];

                  // Swap the temp reply in place — preserves the top position.
                  if (newReply) {
                    c.replies = (c.replies ?? []).map((r) =>
                      r?._tempId === tempId || r?._id === tempId
                        ? { ...newReply, _pending: false }
                        : r,
                    );
                  } else {
                    c.replies = (c.replies ?? []).map((r) =>
                      r?._tempId === tempId || r?._id === tempId
                        ? { ...r, _pending: false }
                        : r,
                    );
                  }
                  // Refresh any other fields on the parent comment (e.g.
                  // updatedAt) without clobbering reply order.
                  const { replies: _ignored, ...rest } = serverComment;
                  Object.assign(c, rest);
                } else {
                  c.replies = (c.replies ?? []).map((r) =>
                    r?._tempId === tempId || r?._id === tempId
                      ? { ...r, _pending: false }
                      : r,
                  );
                }
              },
            ),
          );
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),

    updateReplyOnComment: builder.mutation<any, UpdateReplyArgs>({
      query: ({ replyId, commentId, replyText, blogId }) => ({
        url: `/replies/comments/${commentId}/reply/${replyId}`,
        method: "PATCH",
        body: { replyText, blogId },
      }),
      async onQueryStarted(
        { commentId, replyId, replyText, blogId },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          (
            baseApi.util as any
          ).updateQueryData(
            "getAllCommentsOnSingleBlog",
            blogId,
            (draft: BlogComment[]) => {
              const c = draft.find((x) => x?._id === commentId);
              if (!c?.replies) return;
              const r = c.replies.find((x) => x?._id === replyId);
              if (r) r.replyText = replyText;
            },
          ),
        );
        try {
          const { data } = await queryFulfilled;
          const serverComment = extractServerComment(data);
          if (!serverComment?._id) return;
          dispatch(
            (
              baseApi.util as any
            ).updateQueryData(
              "getAllCommentsOnSingleBlog",
              blogId,
              (draft: BlogComment[]) => {
                const idx = draft.findIndex((x) => x?._id === commentId);
                if (idx !== -1) draft[idx] = { ...serverComment };
              },
            ),
          );
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),

    deleteReplyOnComment: builder.mutation<any, DeleteReplyArgs>({
      query: ({ replyId, commentId }) => ({
        url: `/replies/comments/${commentId}/reply/${replyId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { commentId, replyId, blogId },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          (
            baseApi.util as any
          ).updateQueryData(
            "getAllCommentsOnSingleBlog",
            blogId,
            (draft: BlogComment[]) => {
              const c = draft.find((x) => x?._id === commentId);
              if (!c?.replies) return;
              c.replies = c.replies.filter((r) => r?._id !== replyId);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
  }),
});

export const {
  useAddReplyToCommentMutation,
  useUpdateReplyOnCommentMutation,
  useDeleteReplyOnCommentMutation,
} = replyApi;
export default replyApi;
