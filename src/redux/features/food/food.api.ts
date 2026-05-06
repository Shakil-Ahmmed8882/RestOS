import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    createFood: builder.mutation({
      // send all of the args here
      query: (data) => {
        return {
          url: `/foods/create-food`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["food-data"],
    }),


    getTopSellingFoods: builder.query({
      query: () => ({ url: "/foods/top-selling-food", method: "GET" }),
      transformResponse: (response: any) => ({
        data: response?.data || [],
        meta: response?.meta || {},
      }),
      providesTags: ["food-data"],
    }),

    getSinglefood: builder.query({
      query: (id: string | undefined) => ({
        url: `/foods/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data || {};
      },
      providesTags: ["food-data"],
    }),
    getAllFoods: builder.query({
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
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response?.data || [],
          meta: response?.meta || {},
        };
      },
      providesTags: ["food-data"],
    }),
    updateFood: builder.mutation({
      // send all of the args here
      query: ({ id, data }) => {
        
        console.log({id,data})
        return {
          url: `foods/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["food-data"],
    }),
    deleteFood: builder.mutation({
      // send all of the args here
      query: (id: string) => {
        return {
          url: `foods/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["food-data"],
    }),
  }),
});

export const {
  useGetAllFoodsQuery,
  useGetTopSellingFoodsQuery,
  useGetSinglefoodQuery,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useCreateFoodMutation
} = foodApi;
export default foodApi;
