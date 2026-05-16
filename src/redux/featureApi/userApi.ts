import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<unknown, QueryArg>({
      query: (args) => ({ url: "/users", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.USER_LIST],
    }),
    getSingleUser: builder.query<unknown, string>({
      query: (id) => ({ url: `/users/${id}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    adminCreateUser: builder.mutation<unknown, FormData>({
      query: (data) => ({ url: "/users/create-user", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.USER_LIST],
    }),
    deleteUser: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.USER_LIST],
    }),
    updateUser: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/users/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.USER_LIST, API_CACHE_TAGS.USER_PROFILE],
    }),
    updateUserRoleStatus: builder.mutation<
      unknown,
      { id: string; data: { role?: "USER" | "ADMIN"; status?: "ACTIVE" | "BLOCKED" } }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}/role-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [API_CACHE_TAGS.USER_LIST, API_CACHE_TAGS.USER_PROFILE],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAdminCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserRoleStatusMutation,
} = userApi;
export default userApi;
