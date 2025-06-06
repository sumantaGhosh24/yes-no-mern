import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {setCredentials} from "../features/auth/authSlice";
import {BACKEND_URL} from "../../config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_URL}`,
  credentials: "include",
  prepareHeaders: (headers, {getState}: {getState: any}) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult: any = await baseQuery(
      "/refresh_token",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult?.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "your login has expired.";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Category", "Question", "Wallet", "Entry", "Transaction"],
  endpoints: (_builder) => ({}),
});
