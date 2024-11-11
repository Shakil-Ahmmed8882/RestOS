import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/users`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["comment-data"],
    }),
    getSingleUser: builder.query({
      // send all of the args here
      query: () => {
        return {
          url: `/users/single-user`,
          method: "GET",
        };
      },
      providesTags: ["user-data"],
    }),

    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user-data"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["comment-data"],
    }),

    deleteUser: builder.mutation({
      query: (id:string) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user-data"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = profileApi;
export default profileApi;
