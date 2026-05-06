import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCommentsOnSingleBlog: builder.query({
      query: (id: string) => ({
        url: `/comments/${id}`,
        method: "GET",
      }),
      transformResponse: (res: any) => res?.data ?? [],
      providesTags: ["comment-data"],
    }),

    addCommentOnBlog: builder.mutation({
      query: ({ blog, comment }: { blog: string; comment: string; _optimisticEntry?: any }) => ({
        url: "/comments",
        method: "POST",
        body: { blog, comment },
      }),
      // ── Optimistic update: insert the pending comment instantly ──────────
      async onQueryStarted({ blog, comment, _optimisticEntry }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blog, (draft) => {
            draft.unshift(_optimisticEntry);
          })
        );
        try {
          const { data } = await queryFulfilled;
          // Replace the optimistic entry with the real one from the server
          dispatch(
            commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blog, (draft) => {
              const idx = draft.findIndex((c: any) => c._id === _optimisticEntry._id);
              if (idx !== -1 && data?.data?.[0]) {
                draft.splice(idx, 1, data.data[0]);
              } else if (idx !== -1) {
                draft[idx] = { ...draft[idx], _pending: false };
              }
            })
          );
        } catch {
          // Roll back on error
          patchResult.undo();
        }
      },
      invalidatesTags: ["analytics-data"],
    }),

    updateCommentOnBlog: builder.mutation({
      query: ({ id, comment }: { id: string; comment: string }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: { comment },
      }),
      // Optimistic edit
      async onQueryStarted({ id, comment, blogId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blogId, (draft) => {
            const c = draft.find((x: any) => x._id === id);
            if (c) c.comment = comment;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["analytics-data"],
    }),

    deleteCommentOnBlog: builder.mutation({
      query: ({ id }: { id: string; blogId: string }) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      // Optimistic delete
      async onQueryStarted({ id, blogId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blogId, (draft) => {
            const idx = draft.findIndex((c: any) => c._id === id);
            if (idx !== -1) draft.splice(idx, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["analytics-data"],
    }),
  }),
});

export const {
  useGetAllCommentsOnSingleBlogQuery,
  useAddCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
  useDeleteCommentOnBlogMutation,
} = commentApi;
export default commentApi;
