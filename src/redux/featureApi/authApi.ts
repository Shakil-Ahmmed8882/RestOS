import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/auths/register", method: "POST", body: data }),
    }),
    loginUser: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/auths/login", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.AUTH_ME],
    }),
    refreshToken: builder.mutation<unknown, void>({
      query: () => ({ url: "/auths/refresh-token", method: "POST" }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useRefreshTokenMutation } = authApi;
export default authApi;
