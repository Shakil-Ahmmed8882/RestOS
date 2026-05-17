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
    createFoodCategory: builder.mutation<unknown, FormData>({
      query: (data) => ({
        url: "/food-categories/create-category",
        method: "POST",
        body: data,
      }),
      // Cache is updated optimistically via redux/featureApi/optimistic/foodCategory.
      // No invalidation here — that would trigger a full refetch and race with the patch.
    }),
    getSingleFoodCategory: builder.query<unknown, string | undefined>({
      query: (id) => ({ url: `/food-categories/${id}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
    getAllFoodsCategories: builder.query<
      { data: unknown[]; meta: Record<string, unknown> },
      QueryArg
    >({
      query: (args) => ({
        url: "/food-categories",
        method: "GET",
        params: buildParams(args),
      }),
      transformResponse: (res: any) => {
        const result = res?.data?.result ?? res?.data ?? [];
        return {
          data: Array.isArray(result) ? result : [],
          meta: res?.meta || {},
        };
      },
      providesTags: [API_CACHE_TAGS.FOOD_CATEGORIES],
    }),
    updateFoodCategory: builder.mutation<unknown, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/food-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      // Cache is updated optimistically via redux/featureApi/optimistic/foodCategory.
      // No invalidation here — that would trigger a full refetch and race with the patch.
    }),
    deleteFoodCategory: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/food-categories/${id}`, method: "DELETE" }),
      // Cache is updated optimistically via redux/featureApi/optimistic/foodCategory.
      // No invalidation here — that would trigger a full refetch and race with the patch.
    }),
  }),
});

export const {
  useCreateFoodCategoryMutation,
  useGetAllFoodsCategoriesQuery,
  useLazyGetAllFoodsCategoriesQuery,
  useGetSingleFoodCategoryQuery,
  useUpdateFoodCategoryMutation,
  useDeleteFoodCategoryMutation,
} = foodCategoryApi;
export default foodCategoryApi;
