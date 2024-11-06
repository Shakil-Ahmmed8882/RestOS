import { baseApi } from "../../api/baseApi";

const replyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReplyToComment: builder.mutation({
      query: ({
        commentId,
        comment,
      }: {
        commentId: string;
        comment: string;
      }) => {
        return {
          url: `/replies/${commentId}/reply`,
          method: "POST",
          body: { comment },
        };
      },
      invalidatesTags: ["comment-data"],
    }),

    updateReplyOnComment: builder.mutation({
      query: ({
        replyId,
        commentId,
        replyText,
      }: {
        replyId: string;
        commentId: string;
        replyText: string;
      }) => {
        return {
          url: `/replies/comments/${commentId}/reply/${replyId}`,
          method: "PATCH",
          body: { comment: replyText },
        };
      },
      invalidatesTags: ["comment-data"],
    }),

    deleteReplyOnComment: builder.mutation({
      query: ({
        replyId,
        commentId,
      }: {
        replyId: string;
        commentId: string;
      }) => {
        return {
          url: `replies/comments/${commentId}/reply/${replyId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment-data"],
    }),
  }),
});

export const {
  useAddReplyToCommentMutation,
  useUpdateReplyOnCommentMutation,
  useDeleteReplyOnCommentMutation,
} = replyApi;
export default replyApi;
