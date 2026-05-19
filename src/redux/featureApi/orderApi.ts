import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

const buildParams = (args: QueryArg) => {
  const params = new URLSearchParams();
  args?.forEach((it) => params.append(it.name, it.value));
  return params;
};

// Mirrors backend `orderValidations.createOrderZodSchema` — field names are
// non-negotiable. The server wraps the response as data: [[Order], [Order], ...]
// (one inner array per cart line) so the hook caller flattens it.
export interface CreateOrderCartItem {
  food: string;
  user: string;
  foodName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface CreateOrderRequest {
  cartItems: CreateOrderCartItem[];
}

export interface OrderDoc {
  _id: string;
  food: string;
  user: string;
  foodName?: string;
  status?: "pending" | "confirmed" | "cancelled" | string;
  paymentStatus?: "pending" | "completed" | "failed" | string;
  totalPrice?: number;
  quantity?: number;
  createdAt?: string;
}

export interface CreateOrderResponse {
  statusCode?: number;
  success: boolean;
  message?: string;
  // Server returns a nested array — one inner array per submitted cart line.
  data: OrderDoc[][] | OrderDoc[];
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<unknown, QueryArg>({
      query: (args) => ({ url: "/orders", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.ORDER_LIST],
    }),
    getAllOrderSummary: builder.query<unknown, { userId: string; args?: QueryArg }>({
      query: ({ userId, args }) => ({
        url: `/orders/summary/${userId}`,
        method: "GET",
        params: buildParams(args),
      }),
      providesTags: [API_CACHE_TAGS.ORDER_SUMMARY],
    }),
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (data) => ({ url: "/orders/create-order", method: "POST", body: data }),
      invalidatesTags: [
        API_CACHE_TAGS.ORDER_LIST,
        API_CACHE_TAGS.ORDER_PURCHASED,
        API_CACHE_TAGS.ORDER_SUMMARY,
      ],
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
