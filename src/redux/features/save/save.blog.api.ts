import { baseApi } from "../../api/baseApi";

const saveBlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSavedBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            // Check if the param name already exists before appending
            if (!params.has(item.name)) {
              params.append(item.name, item.value);
            }
          });
        }

        return {
          url: `/saves/`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["save-blog"],
    }),
    isBlogSaved: builder.query({
      query: (blogId: string) => {
        return {
          url: `/saves/${blogId}/is-saved`,
          method: "GET",
        };
      },
      providesTags: ["save-blog"],
    }),

    saveBlog: builder.mutation({
      query: (blogId: string) => {
        return {
          url: `/saves/${blogId}/save`,
          method: "POST",
        };
      },
      invalidatesTags: ["save-blog"],
    }),

    unsaveBlog: builder.mutation({
      query: (blogId: string) => {
        return {
          url: `/saves/${blogId}/unsave`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["save-blog"],
    }),
  }),
});

export const {
  useSaveBlogMutation,
  useGetAllSavedBlogsQuery,
  useUnsaveBlogMutation,
  useIsBlogSavedQuery
} = saveBlogApi;
export default saveBlogApi;
