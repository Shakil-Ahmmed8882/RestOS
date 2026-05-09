import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSearchResults: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/search", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.SEARCH_RESULT],
    }),
  }),
});

export const { useGetAllSearchResultsQuery } = searchApi;
export default searchApi;
