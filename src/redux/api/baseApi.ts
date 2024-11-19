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

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKENT_URL,
  credentials: "include",


  
  prepareHeaders: (headers) => {
    // add accessToken to headers for each request
    headers.set("Authorization", `${localStorage.getItem("accessToken")}`);
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryFn,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  
  // console.log("_______________________________________________")
  // console.log(result.error)
  // console.log("_______________________________________________")
  if (result.error?.status === 401) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENT_URL}/auths/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data)
      if (data?.data?.accessToken) {

        localStorage.setItem("accessToken",data?.data?.accessToken)
        console.log(data?.data?.accessToken)
        
        // const user = (api.getState() as RootState).auth.user;
        // api.dispatch(
        //   setUser({
        //     user: user,
        //     token: data?.data?.accessToken,
        //   })
        // );
        result = await baseQuery(args, api, extraOptions);
      } else {
        // api.dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: Tags,
});
