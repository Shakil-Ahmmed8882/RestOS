import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSinglefood: builder.query({
      query: (id: string | undefined) => ({
        url: `/foods/${id}`,
        method: "GET",
      }),
    }),
    getAllFoods: builder.query({
      query: () => ({
        url: "/foods",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllFoodsQuery, useGetSinglefoodQuery } = foodApi;
export default foodApi;
