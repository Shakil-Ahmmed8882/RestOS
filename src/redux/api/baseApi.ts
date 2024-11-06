import {
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { logout, setUser } from "../features/auth/authSlice";


// Hardcoded token
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJhMmFhMTlhMGQxNWY0NGI4ODQ3M2YiLCJuYW1lIjoic2hha2lsIiwiZW1haWwiOiJzaGFraWxhaG1tZWQ4ODgyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwicGhvdG8iOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yMTkvMjE5OTg2LnBuZyIsImlhdCI6MTczMDgxNjY3MywiZXhwIjoxNzMzNDA4NjczfQ.sDb94INPs1hgSmW-ms1pRhi5-LxOPQ2616R86-ILids";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  // Adding the token to headers for each request
  prepareHeaders: (headers) => {
    headers.set("Authorization", `${token}`);
    return headers;
  },
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
  tagTypes: ["order-data","blog-data","comment-data"]
});