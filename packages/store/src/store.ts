import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import decadeStatsSlice from "./slices/decade-stats.slice";
import authSlice from "./slices/auth.slice";
import { authApi } from "./apis/auth.api";
import { inflationApi } from "./apis/inflation.api";

export interface StorageAssignments {
  // TODO remove `any`
  authSlice: any;
  // TODO remove `any`
  decadeStatsSlice: any;
}

interface StoreFactoryReturn {
  persistor: Persistor;
  // TODO remove `any`
  store: any;
}

type StoreFactory = (s: StorageAssignments) => StoreFactoryReturn;

export const storeFactory: StoreFactory = ({
  authSlice: authSliceStorage,
  decadeStatsSlice: decadeStatsSliceStorage,
}) => {
  const persistedAuthSliceReducer = persistReducer(
    {
      key: "authSlice",
      storage: authSliceStorage,
    },
    authSlice.reducer
  );

  const persistedDecadeStatsReducer = persistReducer(
    {
      key: "decadeStatsSlice",
      storage: decadeStatsSliceStorage,
    },
    decadeStatsSlice.reducer
  );

  const store = configureStore({
    reducer: {
      [authSlice.name]: persistedAuthSliceReducer,
      [decadeStatsSlice.name]: persistedDecadeStatsReducer,

      [authApi.reducerPath]: authApi.reducer,
      [inflationApi.reducerPath]: inflationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(authApi.middleware)
        .concat(inflationApi.middleware),
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);
  return { store, persistor };
};

type Store = ReturnType<typeof storeFactory>["store"];

export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
