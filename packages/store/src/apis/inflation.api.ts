import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DecadeStatsApiResponse } from "./inflation.api.types";

export const inflationApi = createApi({
  reducerPath: "inflationApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_V1_URL }),
  endpoints: (builder) => ({
    fetchDecadeStats: builder.query<DecadeStatsApiResponse, string[]>({
      query: (codes) => ({
        url: "decade-stats",
        params: { codes },
      }),
    }),
  }),
});

export const useDecadeStats = inflationApi.useFetchDecadeStatsQuery;
