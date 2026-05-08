import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const foodCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFoodCategory: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/food-categories/create-category", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
    getSingleFoodCategory: builder.query<unknown, string | undefined>({
      query: (id) => ({ url: `/food-categories/${id}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
    getAllFoodsCategories: builder.query<{ data: unknown[]; meta: Record<string, unknown> }, QueryArg>({
      query: (args) => ({ url: "/food-categories", method: "GET", params: buildParams(args) }),
      transformResponse: (res: any) => ({ data: res?.data || [], meta: res?.meta || {} }),
      providesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
    updateFoodCategory: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/food-categories/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
    deleteFoodCategory: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/food-categories/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
  }),
});

export const {
  useCreateFoodCategoryMutation,
  useGetAllFoodsCategoriesQuery,
  useGetSingleFoodCategoryQuery,
  useUpdateFoodCategoryMutation,
  useDeleteFoodCategoryMutation,
} = foodCategoryApi;
export default foodCategoryApi;
