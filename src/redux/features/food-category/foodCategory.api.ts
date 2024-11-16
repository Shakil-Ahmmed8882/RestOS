import { baseApi } from "../../api/baseApi";

const foodCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    createFoodCategory: builder.mutation({
      // send all of the args here
      query: (data) => {
        return {
          url: `/food-categories/create-category`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["food-category-data"],
    }),


    getSingleFoodCategory: builder.query({
      query: (id: string | undefined) => ({
        url: `/food-categories/${id}`,
        method: "GET",
      }),
      providesTags: ["food-category-data"],
    }),
    getAllFoodsCategories: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/food-categories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["food-category-data"],
    }),
    updateFoodCategory: builder.mutation({
      // send all of the args here
      query: ({ id, data }) => {
        
        return {
          url: `/food-categories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["food-category-data"],
    }),
    deleteFoodCategory: builder.mutation({
      // send all of the args here
      query: (id: string) => {
        return {
          url: `/food-categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["food-category-data"],
    }),
  }),
});

export const {
    useCreateFoodCategoryMutation,
    useGetAllFoodsCategoriesQuery,
    useGetSingleFoodCategoryQuery,
    useUpdateFoodCategoryMutation,
    useDeleteFoodCategoryMutation
} = foodCategoryApi;
export default foodCategoryApi;
