import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string | null } }).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: Object.values(API_CACHE_TAGS),
  endpoints: () => ({}),
});
