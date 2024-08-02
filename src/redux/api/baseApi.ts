import {
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryFn,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error?.status === 401) {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     if (data?.data?.accessToken) {
  //       const user = (api.getState() as RootState).auth.user;
  //       api.dispatch(
  //         setUser({
  //           user: user,
  //           token: data?.data?.accessToken,
  //         })
  //       );
  //       result = await baseQuery(args, api, extraOptions);
  //     } else {
  //       api.dispatch(logout());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["order-data"]
});