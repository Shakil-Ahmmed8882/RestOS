import { baseApi } from "../../api/baseApi";

const replyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReplyToComment: builder.mutation({
      query: (data) => {
        const { replyText, blogId } = data;
        return {
          url: `/replies/${data?.commentId}/reply`,
          method: "POST",
          body: { replyText, blogId },
        };
      },
      invalidatesTags: ["comment-data","analytics-data"],
    }),

    updateReplyOnComment: builder.mutation({
      query: ({
        replyId,
        commentId,
        replyText,
        blogId
      }: {
        replyId: string;
        commentId: string;
        replyText: string;
        blogId: string;
      }) => {
        return {
          url: `/replies/comments/${commentId}/reply/${replyId}`,
          method: "PATCH",
          body: { replyText,blogId },
        };
      },
      invalidatesTags: ["comment-data","analytics-data"],
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
      invalidatesTags: ["comment-data","analytics-data"],
    }),
  }),
});

export const {
  useAddReplyToCommentMutation,
  useUpdateReplyOnCommentMutation,
  useDeleteReplyOnCommentMutation,
} = replyApi;
export default replyApi;
