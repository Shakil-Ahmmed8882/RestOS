import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import type { AnalyticsMatrixResponse } from "@/modules/dashboard/admin/types/analytics.types";

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
  }),
});

export const { useGetAllAnalyticsQuery, useGetAnalyticsMatrixQuery } = analyticsApi;
export default analyticsApi;
