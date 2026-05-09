import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = Record<string, string> | undefined;

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFood: builder.mutation<unknown, FormData>({
      query: (data) => ({ url: "/foods/create-food", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_LIST],
    }),
    getTopSellingFoods: builder.query<{ data: unknown[]; meta: Record<string, unknown> }, void>({
      query: () => ({ url: "/foods/top-selling-food", method: "GET" }),
      transformResponse: (res: any) => ({ data: res?.data || [], meta: res?.meta || {} }),
      providesTags: [API_CACHE_TAGS.FOOD_LIST],
    }),
    getSingleFood: builder.query<any, string | undefined>({
      query: (id) => ({ url: `/foods/${id}`, method: "GET" }),
      transformResponse: (res: any) => res?.data || {},
      providesTags: [API_CACHE_TAGS.FOOD_DETAILS],
    }),
    getAllFoods: builder.query<{ data: unknown[]; meta: Record<string, unknown> }, QueryArg>({
      query: (params) => ({ url: "/foods", method: "GET", params: params }),
      transformResponse: (res: any) => ({ data: res?.data || [], meta: res?.meta || {} }),
      providesTags: [API_CACHE_TAGS.FOOD_LIST],
    }),
    updateFood: builder.mutation<unknown, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/foods/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_LIST, API_CACHE_TAGS.FOOD_DETAILS],
    }),
    deleteFood: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/foods/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_LIST],
    }),
    addFoodReview: builder.mutation<unknown, { foodId: string; rating: number; comment?: string }>({
      query: ({ foodId, rating, comment }) => ({
        url: `/foods/${foodId}/review`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_DETAILS],
    }),
    getFoodCategories: builder.query<{ data: any[] }, void>({
      query: () => ({ url: "/food-categories", method: "GET" }),
      transformResponse: (res: any) => ({ data: res?.data || [] }),
    }),
  }),
});

export const {
  useCreateFoodMutation,
  useGetTopSellingFoodsQuery,
  useGetSingleFoodQuery,
  useGetAllFoodsQuery,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useAddFoodReviewMutation,
  useGetFoodCategoriesQuery,
} = foodApi;
export default foodApi;
