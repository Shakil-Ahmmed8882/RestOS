import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/blogs", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.BLOG_LIST],
    }),
    getSingleBlog: builder.query<any, string | undefined>({
      query: (id) => ({ url: `/blogs/${id}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.BLOG_DETAILS],
    }),
    createBlog: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/blogs/create", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.BLOG_LIST, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    updateBlog: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/blogs/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.BLOG_LIST, API_CACHE_TAGS.BLOG_DETAILS, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    deleteBlog: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/blogs/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.BLOG_LIST, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
export default blogApi;
