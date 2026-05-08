import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipes: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/recipes", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.RECIPE_LIST],
    }),
    getSingleRecipe: builder.query<any, string | undefined>({
      query: (id) => ({ url: `/recipes/${id}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.RECIPE_DETAILS],
    }),
    createRecipe: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/recipes/create", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.RECIPE_LIST],
    }),
    updateRecipe: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/recipes/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.RECIPE_LIST, API_CACHE_TAGS.RECIPE_DETAILS],
    }),
    deleteRecipe: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/recipes/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.RECIPE_LIST],
    }),
    getAllRecipeCategories: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/recipe-categories", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.RECIPE_CATEGORIES],
    }),
    createRecipeCategory: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/recipe-categories/create-category", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.RECIPE_CATEGORIES],
    }),
    deleteRecipeCategory: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/recipe-categories/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.RECIPE_CATEGORIES],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useGetSingleRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useGetAllRecipeCategoriesQuery,
  useCreateRecipeCategoryMutation,
  useDeleteRecipeCategoryMutation,
} = recipeApi;
export default recipeApi;
