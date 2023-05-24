import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DecadeStats {
  countryName: string;
  countryCode: string;
  decade: number;
  count: number;
  average: number;
  max: number;
  min: number;
  median: number;
  range: number;
  stdDev: number;
  variance: number;
}

interface DecadeStatsApiResponse {
  decadeStats: DecadeStats[];
}

// const DOMAIN = "https://nextjs-grpc.utkusarioglu.com";
const url = process.env.NEXT_PUBLIC_NEXT_API_URL;

console.log({ url });

export const inflationApi = createApi({
  reducerPath: "inflationApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/api/v1/` }),
  endpoints: (builder) => ({
    getDecadeStats: builder.query<DecadeStatsApiResponse, string[]>({
      query: (codes) => ({
        url: `decade-stats`,
        params: { codes },
      }),
    }),
  }),
});

// export const getData = mockApi.useGetDataQuery;
export const useInflationDecadeStats = inflationApi.useGetDecadeStatsQuery;
