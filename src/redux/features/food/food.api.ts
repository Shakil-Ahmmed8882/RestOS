import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoods: builder.query({
      query: () => ({
        url: "/foods",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllFoodsQuery } = foodApi;
export default foodApi