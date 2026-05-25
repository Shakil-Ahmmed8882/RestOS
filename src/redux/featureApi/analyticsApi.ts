import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import type { AnalyticsMatrixResponse } from "@/modules/dashboard/admin/types/analytics.types";
import type { UserAnalyticsResponse } from "@/modules/dashboard/user/analytics/types";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAnalytics: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/analytics", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.ANALYTICS_OVERVIEW, API_CACHE_TAGS.ANALYTICS_BLOG, API_CACHE_TAGS.ANALYTICS_FOOD],
    }),
    getAnalyticsMatrix: builder.query<AnalyticsMatrixResponse, void>({
      query: () => ({ url: "/analytics/matrix", method: "GET" }),
      providesTags: [API_CACHE_TAGS.ANALYTICS_OVERVIEW],
    }),
    getMyAnalytics: builder.query<UserAnalyticsResponse, number | void>({
      query: (days) => {
        const params = new URLSearchParams();
        params.append("days", String(days ?? 30));
        return { url: "/users/me/analytics", method: "GET", params };
      },
      providesTags: [API_CACHE_TAGS.ANALYTICS_USER],
    }),
    getUserAnalytics: builder.query<UserAnalyticsResponse, { userId: string; days?: number }>({
      query: ({ userId, days }) => {
        const params = new URLSearchParams();
        params.append("days", String(days ?? 30));
        return { url: `/users/${userId}/analytics`, method: "GET", params };
      },
      providesTags: [API_CACHE_TAGS.ANALYTICS_USER],
    }),
  }),
});

export const {
  useGetAllAnalyticsQuery,
  useGetAnalyticsMatrixQuery,
  useGetMyAnalyticsQuery,
  useGetUserAnalyticsQuery,
} = analyticsApi;
export default analyticsApi;
