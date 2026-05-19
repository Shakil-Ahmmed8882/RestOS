import { createApi } from "@reduxjs/toolkit/query/react";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import { baseQueryWithLogger } from "@/redux/featureApi/baseQueryLogger";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithLogger,
  tagTypes: Object.values(API_CACHE_TAGS),
  endpoints: () => ({}),
});
