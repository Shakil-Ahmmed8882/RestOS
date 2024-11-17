import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getSinglefood: builder.query({
    //   query: (id: string | undefined) => ({
    //     url: `/foods/${id}`,
    //     method: "GET",
    //   }),
    // }),

    getAllOrders: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order-data"],
    }),

    getAllOrderSummary: builder.query({
      // send all of the args here
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/orders/summary/${import.meta.env.VITE_TEST_USER_ID}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order-data"],
    }),

    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/orders/create-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["order-data"],
    }),

    updateOrder: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/orders/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["order-data"],
    }),

    deleteOrder: builder.mutation({
      query: (id:string) => {
        return {
          url: `/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["order-data"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrderSummaryQuery,
  useUpdateOrderMutation
} = orderApi;
export default orderApi;
