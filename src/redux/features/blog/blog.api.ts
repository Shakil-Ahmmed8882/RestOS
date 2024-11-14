import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/blogs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog-data"],
    }),

    createBlog: builder.mutation({
      query: (data) => {
        return {
          url: "/blogs/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["blog-data"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/blogs/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["blog-data"],
    }),

    deleteblog: builder.mutation({
      query: (id: string) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blog-data"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteblogMutation,
} = blogApi;
export default blogApi;
