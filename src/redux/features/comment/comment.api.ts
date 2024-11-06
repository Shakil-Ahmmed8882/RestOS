import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getAllCommentsOnSingleBlog: builder.query({
      // send all of the args here
      query: (id:string) => {
        // const params = new URLSearchParams();

        // if (args) {
        //   args.forEach((item: { name: string; value: string }) => {
        //     params.append(item.name, item.value as string);
        //   });
        // }

        return {
          url: `/comments/${id}`,
          method: "GET",
        //   params: params,
        };
      },
      providesTags: ["comment-data"],
    }),

  

    addCommentOnBlog: builder.mutation({
      query: (data) => {
        return {
          url: "/comments",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment-data"],
    }),

    updateCommentOnBlog: builder.mutation({
        query: ({ id, comment }: { id: string, comment: string }) => {
        
        return {
          url: `/comments/${id}`,
          method: "PATCH",
          body: {comment}
        };
      },
      invalidatesTags: ["comment-data"],
    }),


    deleteCommentOnBlog: builder.mutation({
      query: (id:string) => {
        return {
          url: `/comments/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment-data"],
    }),

  }),
});

export const {
  useGetAllCommentsOnSingleBlogQuery,
  useAddCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
  useDeleteCommentOnBlogMutation
  
} = commentApi;
export default commentApi;
