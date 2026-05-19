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

// ── /orders/me endpoints ─────────────────────────────────────────────────────

export interface MyOrder {
  _id: string;
  food: { _id: string; name?: string; image?: string; price?: number } | null;
  foodName: string;
  price: number;
  totalPrice: number;
  quantity: number;
  status: "pending" | "confirmed" | "canceled";
  paymentStatus: "pending" | "completed" | "failed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface MyOrdersQuery {
  status?: "pending" | "confirmed" | "canceled";
  paymentStatus?: "pending" | "completed" | "failed" | "cancelled";
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface MyOrdersResponse {
  success: boolean;
  message?: string;
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: MyOrder[];
}

export interface MyOrdersSummaryData {
  totalOrderCount: number;
  totalOrderPrice: number;
  totalPurchaseCount: number;
  totalPurchasePrice: number;
  byStatus: {
    pending:   { count: number; totalPrice: number };
    confirmed: { count: number; totalPrice: number };
    canceled:  { count: number; totalPrice: number };
  };
}

export interface MyOrdersSummaryResponse {
  success: boolean;
  data: MyOrdersSummaryData;
}

export interface CancelPendingResponse {
  success: boolean;
  data: { cancelled: number };
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<OrderListResponse, QueryArg>({
      query: (args) => ({ url: "/orders", method: "GET", params: buildParams(args) }),
      providesTags: [API_CACHE_TAGS.ORDER_LIST, API_CACHE_TAGS.ORDER_PENDING],
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
    getMyOrders: builder.query<MyOrdersResponse, MyOrdersQuery>({
      query: (q) => {
        const params = new URLSearchParams();
        Object.entries(q).forEach(([k, v]) => {
          if (v !== undefined && v !== "" && v !== null) params.set(k, String(v));
        });
        return { url: `/orders/me?${params.toString()}`, method: "GET" };
      },
      providesTags: [API_CACHE_TAGS.ORDER_LIST, API_CACHE_TAGS.ORDER_PENDING],
    }),
    getMyOrdersSummary: builder.query<MyOrdersSummaryResponse, void>({
      query: () => ({ url: "/orders/me/summary", method: "GET" }),
      providesTags: [API_CACHE_TAGS.ORDER_SUMMARY],
    }),
    cancelMyPendingOrders: builder.mutation<CancelPendingResponse, void>({
      query: () => ({ url: "/orders/me/pending", method: "DELETE" }),
      invalidatesTags: [
        API_CACHE_TAGS.ORDER_LIST,
        API_CACHE_TAGS.ORDER_PENDING,
        API_CACHE_TAGS.ORDER_SUMMARY,
      ],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllOrderSummaryQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrdersSummaryQuery,
  useCancelMyPendingOrdersMutation,
} = orderApi;

// Fetches pending orders for a specific user. Passes user + status as query
// params so the backend can filter server-side (avoids needing admin access
// to read all orders). Falls back to client-side userId filter as a safety net
// in case the backend returns more rows than expected.
export function useUserPendingOrders(userId: string | undefined) {
  const result = useGetAllOrdersQuery(
    userId
      ? [
          { name: "status", value: "pending" },
          { name: "user",   value: userId },
          { name: "limit",  value: "50" },
        ]
      : undefined,
    { skip: !userId },
  );

  const pendingOrders: OrderDoc[] = (result.data?.data?.result ?? []).filter(
    (order) => {
      const orderUserId =
        typeof order?.user === "object" && order.user !== null
          ? (order.user as { _id?: string })?._id
          : (order?.user as string | undefined);
      return !orderUserId || orderUserId === userId;
    },
  );

  return { ...result, pendingOrders };
}
export default orderApi;
