import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSinglefood: builder.query({
      query: (id: string | undefined) => ({
        url: `/foods/${id}`,
        method: "GET",
      }),
    }
  ),
    getAllFoods: builder.query({
      // send all of the args here 
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/foods",
          method: "GET",
          params: params
        };
      },
    }),
  }),
});

export const { useGetAllFoodsQuery, useGetSinglefoodQuery } = foodApi;
export default foodApi;
