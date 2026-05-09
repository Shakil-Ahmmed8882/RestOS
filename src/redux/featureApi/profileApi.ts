import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const profileApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSingleUser: builder.query<unknown, void>({
      query: () => ({ url: "/users/single-user", method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    createUser: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/users", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE, API_CACHE_TAGS.USER_LIST],
    }),
    updateUserProfile: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/users/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    deleteUserProfile: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE, API_CACHE_TAGS.USER_LIST],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
} = profileApi;
export default profileApi;
