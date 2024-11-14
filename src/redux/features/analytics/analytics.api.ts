import { baseApi } from "../../api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAnalytics: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/analytics`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["analytics-data"],
    }),
  }),
});

export const { useGetAllAnalyticsQuery } = analyticsApi;
export default analyticsApi;
