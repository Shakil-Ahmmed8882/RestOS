import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArgItem = { name: string; value: string };

const voteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVotesOnSingleBlog: builder.query<unknown, { blogId: string; args?: QueryArgItem[] }>({
      query: ({ blogId, args }) => {
        const params = new URLSearchParams();
        args?.forEach((it) => {
          if (!params.has(it.name)) params.append(it.name, it.value);
        });
        return { url: `/votes/${blogId}`, method: "GET", params };
      },
      providesTags: [API_CACHE_TAGS.VOTE_ITEM],
    }),
    getSingleVoteOfUserOnBlog: builder.query<unknown, string>({
      query: (blogId) => ({ url: `/votes/single-user/blog/${blogId}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.VOTE_ITEM],
    }),
    addVoteOnBlog: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/votes", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.VOTE_ITEM, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
    removeVoteOnBlog: builder.mutation<unknown, string>({
      query: (blogId) => ({ url: `/votes/${blogId}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.VOTE_ITEM, API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
  }),
});

export const {
  useGetAllVotesOnSingleBlogQuery,
  useGetSingleVoteOfUserOnBlogQuery,
  useAddVoteOnBlogMutation,
  useRemoveVoteOnBlogMutation,
} = voteApi;
export default voteApi;
