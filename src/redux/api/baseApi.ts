import {
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
import { Tags } from ".";
import { RootState } from "../store";
import { setUser } from "../features/auth/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKENT_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    // add accessToken to headers for each request

    const token = (getState() as RootState).auth.token;
    console.log(token)
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryFn,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      // if token access token has any issue get new accessToken
      //  using refresh token and set it to the local state
      const res = await fetch(
        `${import.meta.env.VITE_BACKENT_URL}/auths/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user: user,
            token: data?.data?.accessToken,
          })
        );
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
