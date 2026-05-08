import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<any, QueryArg>({
      query: (args) => ({ url: "/orders", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.ORDER_LIST],
    }),
    getAllOrderSummary: builder.query<any, { userId: string; args?: QueryArg }>({
      query: ({ userId, args }) => ({
        url: `/orders/summary/${userId}`,
        method: "GET",
        params: buildParams(args),
      }),
      providesTags: [API_CACHE_TAGS.ORDER_LIST],
    }),
    createOrder: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/orders/create-order", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.ORDER_LIST, API_CACHE_TAGS.ORDER_PURCHASED],
    }),
    updateOrder: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/orders/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.ORDER_LIST, API_CACHE_TAGS.ORDER_HISTORY],
    }),
    deleteOrder: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/orders/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.ORDER_LIST],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllOrderSummaryQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
export default orderApi;
