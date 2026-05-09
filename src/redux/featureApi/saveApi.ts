import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => {
    if (!params.has(it.name)) params.append(it.name, it.value);
  });
  return params;
};

const saveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSavedBlogs: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/saves/", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.BLOG_SAVED, API_CACHE_TAGS.SAVE_ITEM],
    }),
    isBlogSaved: builder.query<any, string>({
      query: (blogId) => ({ url: `/saves/${blogId}/is-saved`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.SAVE_ITEM],
    }),
    saveBlog: builder.mutation<unknown, string>({
      query: (blogId) => ({ url: `/saves/${blogId}/save`, method: "POST" }),
      invalidatesTags: [API_CACHE_TAGS.BLOG_SAVED, API_CACHE_TAGS.SAVE_ITEM],
    }),
    unsaveBlog: builder.mutation<unknown, string>({
      query: (blogId) => ({ url: `/saves/${blogId}/unsave`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.BLOG_SAVED, API_CACHE_TAGS.SAVE_ITEM],
    }),
  }),
});

export const {
  useGetAllSavedBlogsQuery,
  useIsBlogSavedQuery,
  useSaveBlogMutation,
  useUnsaveBlogMutation,
} = saveApi;
export default saveApi;
