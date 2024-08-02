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
    deleteOrder: builder.mutation({
      query: ({ id, email }) => {
        return {
          url: `/orders/${id}/${email}`,
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
} = orderApi;
export default orderApi;
