import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

const replyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReplyToComment: builder.mutation<
      unknown,
      { commentId: string; replyText: string; blogId: string }
    >({
      query: ({ commentId, replyText, blogId }) => ({
        url: `/replies/${commentId}/reply`,
        method: "POST",
        body: { replyText, blogId },
      }),
      invalidatesTags: [API_CACHE_TAGS.COMMENT_LIST, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    updateReplyOnComment: builder.mutation<
      unknown,
      { replyId: string; commentId: string; replyText: string; blogId: string }
    >({
      query: ({ replyId, commentId, replyText, blogId }) => ({
        url: `/replies/comments/${commentId}/reply/${replyId}`,
        method: "PATCH",
        body: { replyText, blogId },
      }),
      invalidatesTags: [API_CACHE_TAGS.COMMENT_LIST, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    deleteReplyOnComment: builder.mutation<unknown, { replyId: string; commentId: string }>({
      query: ({ replyId, commentId }) => ({
        url: `/replies/comments/${commentId}/reply/${replyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_CACHE_TAGS.COMMENT_LIST, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
  }),
});

export const {
  useAddReplyToCommentMutation,
  useUpdateReplyOnCommentMutation,
  useDeleteReplyOnCommentMutation,
} = replyApi;
export default replyApi;
