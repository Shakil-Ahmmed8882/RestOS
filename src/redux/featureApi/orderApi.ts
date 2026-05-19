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
  food: string | { _id: string; foodName?: string; price?: number; foodImage?: string } | null;
  user: string | { _id?: string; name?: string; email?: string } | null;
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

export interface OrderListResponse {
  success: boolean;
  message?: string;
  data: {
    meta: { total: number; page: number; limit: number };
    result: OrderDoc[];
  };
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<OrderListResponse, QueryArg>({
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

// Derives user-specific pending orders from the list endpoint (server has no
// user-scoped endpoint yet). Called with a large limit so we capture all
// pending lines, then the caller filters by userId client-side.
export function useUserPendingOrders(userId: string | undefined) {
  const result = useGetAllOrdersQuery(
    [{ name: "status", value: "pending" }, { name: "limit", value: "50" }],
    { skip: !userId },
  );

  const pendingOrders: OrderDoc[] = (result.data?.data?.result ?? []).filter(
    (order) => {
      const orderUserId =
        typeof order?.user === "object" && order.user !== null
          ? (order.user as { _id?: string })?._id
          : (order?.user as string | undefined);
      return orderUserId === userId;
    },
  );

  return { ...result, pendingOrders };
}
export default orderApi;
