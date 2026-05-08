import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

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
  }),
});

export const { useGetAllAnalyticsQuery } = analyticsApi;
export default analyticsApi;
