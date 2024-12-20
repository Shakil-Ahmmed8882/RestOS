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


    getSinglefood: builder.query({
      query: (id: string | undefined) => ({
        url: `/foods/${id}`,
        method: "GET",
      }),
      providesTags: ["food-data"],
    }),
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
          params: params,
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
  useGetSinglefoodQuery,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useCreateFoodMutation
} = foodApi;
export default foodApi;
