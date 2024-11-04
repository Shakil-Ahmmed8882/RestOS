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

  

    // createblog: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/blogs/create-blog",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["blog-data"],
    // }),

    // deleteblog: builder.mutation({
    //   query: ({ id, email }) => {
    //     return {
    //       url: `/blogs/${id}/${email}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["blog-data"],
    // }),

  }),
});

export const {
  useGetAllBlogsQuery,
//   useCreateblogMutation,
//   useDeleteblogMutation
} = blogApi;
export default blogApi;
