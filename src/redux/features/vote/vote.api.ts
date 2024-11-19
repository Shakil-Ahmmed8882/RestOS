import { baseApi } from "../../api/baseApi";

const voteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllVotesOnSingleBlog: builder.query({
      // Wrap `blogId` and `args` in a single parameter object
      query: ({ blogId, args }: { blogId: string; args: { name: string; value: string }[] }) => {
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
          url: `/votes/${blogId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["vote-data"],
    }),

    getSingleVoteOfUserOnBlog: builder.query({
      query: (blogId: string) => {
        return {
          url: `/votes/single-user/blog/${blogId}`,
          method: "GET",
        };
      },
      providesTags: ["vote-data"],
    }),

    addVoteOnBlog: builder.mutation({
      query: (data) => {
        return {
          url: "/votes",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["vote-data","analytics-data"],
    }),

    removeVoteOnBlog: builder.mutation({
      query: (blogId: string) => {
        return {
          url: `/votes/${blogId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["vote-data","analytics-data"],
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
