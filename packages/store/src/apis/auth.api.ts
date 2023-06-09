import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginApiResponse {
  authId: string;
  username: string;
}

export interface LoginWithUserPassParams {
  username: string;
  password: string;
}

export interface LoginWithSessionIdParams {
  authId: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_V1_URL }),
  endpoints: (builder) => ({
    loginWithSessionId: builder.mutation<
      LoginApiResponse,
      LoginWithSessionIdParams
    >({
      query: (body) => ({
        url: "auth/login/auth-id",
        method: "POST",
        body,
      }),
    }),
    loginWithUserPass: builder.mutation<
      LoginApiResponse,
      LoginWithUserPassParams
    >({
      query: (body) => ({
        url: "auth/login/user-pass",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      // TODO decide whether you want to transfer authId as a cookie or in the body,
      // right now react native is not able to logout
      query: () => ({
        method: "POST",
        url: "auth/logout",
      }),
    }),
  }),
});

export const useLoginWithUserPassMutation =
  authApi.useLoginWithUserPassMutation;

export const useLogoutMutation = authApi.useLogoutMutation;
