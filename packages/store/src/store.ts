import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import decadeStatsSlice from "./slices/decade-stats.slice";
import { inflationApi } from "./apis/inflation.api";

export const store = configureStore({
  reducer: {
    [decadeStatsSlice.name]: decadeStatsSlice.reducer,
    [inflationApi.reducerPath]: inflationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inflationApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
