import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auths/register",
          method: "POST",
          body: data,
        };
      },
    }),

    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auths/login",
          method: "POST",
          body: data,
        };
      },
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApi;
export default authApi;
