// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonProps = {
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_V1_URL }),
  endpoints: () => ({}),
};
