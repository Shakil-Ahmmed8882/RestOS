import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommentsOnSingleBlog: builder.query<any[], string>({
      query: (id) => ({ url: `/comments/${id}`, method: "GET" }),
      transformResponse: (res: any) => res?.data ?? [],
      providesTags: [API_CACHE_TAGS.COMMENT_LIST],
    }),
    addCommentOnBlog: builder.mutation<
      any,
      { blog: string; comment: string; _optimisticEntry?: any }
    >({
      query: ({ blog, comment }) => ({
        url: "/comments",
        method: "POST",
        body: { blog, comment },
      }),
      async onQueryStarted({ blog, _optimisticEntry }, { dispatch, queryFulfilled }) {
        if (!_optimisticEntry) {
          await queryFulfilled.catch(() => undefined);
          return;
        }
        const patchResult = dispatch(
          commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blog, (draft) => {
            draft.unshift(_optimisticEntry);
          }),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blog, (draft) => {
              const idx = draft.findIndex((c: any) => c._id === _optimisticEntry._id);
              if (idx !== -1 && data?.data?.[0]) draft.splice(idx, 1, data.data[0]);
              else if (idx !== -1) draft[idx] = { ...draft[idx], _pending: false };
            }),
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    updateCommentOnBlog: builder.mutation<
      any,
      { id: string; comment: string; blogId: string }
    >({
      query: ({ id, comment }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: { comment },
      }),
      async onQueryStarted({ id, comment, blogId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blogId, (draft) => {
            const c = draft.find((x: any) => x._id === id);
            if (c) c.comment = comment;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    deleteCommentOnBlog: builder.mutation<any, { id: string; blogId: string }>({
      query: ({ id }) => ({ url: `/comments/${id}`, method: "DELETE" }),
      async onQueryStarted({ id, blogId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          commentApi.util.updateQueryData("getAllCommentsOnSingleBlog", blogId, (draft) => {
            const idx = draft.findIndex((c: any) => c._id === id);
            if (idx !== -1) draft.splice(idx, 1);
          }),
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
  useGetAllCommentsOnSingleBlogQuery,
  useAddCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
  useDeleteCommentOnBlogMutation,
} = commentApi;
export default commentApi;
