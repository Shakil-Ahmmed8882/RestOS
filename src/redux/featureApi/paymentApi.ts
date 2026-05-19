import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

// Backend accepts either a single orderId or an array of orderIds.
// When orderIds[] is sent, the server creates ONE SSLCommerz session that
// sums all order totals — the user pays once for the whole cart.
export type InitiatePaymentRequest =
  | { orderId: string }
  | { orderIds: string[] };

export interface InitiatePaymentResponseData {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  sessionkey?: string;
  orderIds?: string[];
  totalAmount?: number;
}

export interface InitiatePaymentResponse {
  success: boolean;
  message?: string;
  data: InitiatePaymentResponseData;
}

export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled" | string;

export interface PaymentOrderRef {
  _id: string;
  foodName?: string;
  status?: string;
  paymentStatus?: string;
  totalPrice?: number;
}

export interface PaymentDoc {
  _id: string;
  orderId: PaymentOrderRef | string | null;
  userId: string;
  amount: number;
  currency: string;
  transactionId: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface PaymentHistoryResponse {
  success: boolean;
  message?: string;
  data: PaymentDoc[];
  meta?: { total: number; page: number; limit: number; pages: number };
}

export interface PaymentDetailsResponse {
  success: boolean;
  message?: string;
  data: PaymentDoc;
}

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<InitiatePaymentResponse, InitiatePaymentRequest>({
      query: (body) => ({ url: "/payments/initiate", method: "POST", body }),
    }),
    getPaymentHistory: builder.query<
      PaymentHistoryResponse,
      { page?: number; limit?: number } | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.page) params.append("page", String(args.page));
        if (args?.limit) params.append("limit", String(args.limit));
        return { url: "/payments/history", method: "GET", params };
      },
      providesTags: [API_CACHE_TAGS.PAYMENT_HISTORY],
    }),
    getPaymentDetails: builder.query<PaymentDetailsResponse, string>({
      query: (paymentId) => ({ url: `/payments/${paymentId}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: API_CACHE_TAGS.PAYMENT_DETAILS, id }],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentDetailsQuery,
} = paymentApi;
export default paymentApi;
