import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
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
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user-data"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user-data"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
} = userApi;
export default userApi;
