import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import type { BlogItem } from "@/modules/blog/types/blog.types";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

export type BlogStatus = "pending" | "approved" | "test-approved";

export type MyBlogsQuery = {
  user: string;
  searchTerm?: string;
  status?: BlogStatus | "all";
  page?: number;
  limit?: number;
  sort?: string;
};

export type BlogsMeta = { total: number; page: number; limit: number };

export type BlogsListResponse = {
  success: boolean;
  message: string;
  meta?: BlogsMeta;
  data: BlogItem[];
};

const buildMyBlogParams = (q: MyBlogsQuery) => {
  const params = new URLSearchParams();
  params.set("user", q.user);
  if (q.searchTerm) params.set("searchTerm", q.searchTerm);
  if (q.status && q.status !== "all") params.set("status", q.status);
  if (q.page) params.set("page", String(q.page));
  if (q.limit) params.set("limit", String(q.limit));
  params.set("sort", q.sort ?? "-createdAt");
  return params;
};

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/blogs", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.BLOG_LIST],
    }),
    getMyBlogs: builder.query<BlogsListResponse, MyBlogsQuery>({
      query: (q) => ({ url: "/blogs", method: "GET", params: buildMyBlogParams(q) }),
      providesTags: [API_CACHE_TAGS.BLOG_LIST, API_CACHE_TAGS.BLOG_MY],
    }),
    getSingleBlog: builder.query<any, string | undefined>({
      query: (id) => ({ url: `/blogs/${id}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.BLOG_DETAILS],
    }),
    createBlog: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/blogs/create", method: "POST", body: data }),
      invalidatesTags: [
        API_CACHE_TAGS.BLOG_LIST,
        API_CACHE_TAGS.BLOG_MY,
        API_CACHE_TAGS.ANALYTICS_BLOG,
      ],
    }),
    updateBlog: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/blogs/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [
        API_CACHE_TAGS.BLOG_LIST,
        API_CACHE_TAGS.BLOG_MY,
        API_CACHE_TAGS.BLOG_DETAILS,
        API_CACHE_TAGS.ANALYTICS_BLOG,
      ],
    }),
    deleteBlog: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/blogs/${id}`, method: "DELETE" }),
      invalidatesTags: [
        API_CACHE_TAGS.BLOG_LIST,
        API_CACHE_TAGS.BLOG_MY,
        API_CACHE_TAGS.ANALYTICS_BLOG,
      ],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetMyBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
export default blogApi;
