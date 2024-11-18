import { baseApi } from "../../api/baseApi";

const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSearchResults: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/search",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const {
  useGetAllSearchResultsQuery
} = searchApi;
export default searchApi;
