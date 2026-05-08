import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

const ACCESS_TOKEN_KEY = "accessToken";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(API_CACHE_TAGS),
  endpoints: () => ({}),
});
