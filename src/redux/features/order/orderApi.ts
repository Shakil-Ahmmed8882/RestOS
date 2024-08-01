import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getSinglefood: builder.query({
    //   query: (id: string | undefined) => ({
    //     url: `/foods/${id}`,
    //     method: "GET",
    //   }),
    // }),

    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/orders/create-order",
          method: "POST",
          body: data,
        };
      },
    }),

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
    }),
  }),
});

export const { useGetAllOrdersQuery, useCreateOrderMutation } = orderApi;
export default orderApi;
