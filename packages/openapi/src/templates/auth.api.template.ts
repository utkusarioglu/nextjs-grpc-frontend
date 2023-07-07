import { createApi } from "@reduxjs/toolkit/query/react";
import { commonProps } from "./common";

export const apiTemplate = createApi({
  ...commonProps,
  reducerPath: "authApi",
});
