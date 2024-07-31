import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllFoods: builder.query({
    //   query: () => ({
    //     url: "/users",
    //     method: "GET",
    //   }),
    // }),
    createUser: builder.mutation({
      query: (data) => {

        
          return {
         url: "/users/create-user",
         method: "POST",
         body: data
       }
      }
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
export default userApi