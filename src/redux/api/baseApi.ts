import {
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
import { Tags } from ".";
// import { logout, setUser } from "../features/auth/authSlice";


// Hardcoded token
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzJmNzRhNzY1Y2Q1ODNjN2VhYjkxODUiLCJuYW1lIjoiVXNlciAyIiwiZW1haWwiOiJ1c2VyeEAyLmNvbSIsInJvbGUiOiJVU0VSIiwicGhvdG8iOiIvL2V4YW1wbGUxLmNvbS9waG90by5qcGciLCJpYXQiOjE3MzExNjMzMDQsImV4cCI6MTczMzc1NTMwNH0.JDc52pHRuOzLpMFcEOagmJkmp05gTpPI1ip1FSWwNhI";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1",
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
  tagTypes: Tags
});