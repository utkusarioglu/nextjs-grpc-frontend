import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import decadeStatsSlice from "./slices/decade-stats.slice";
import web3Slice from "./slices/web3.slice";
import authSlice from "./slices/auth.slice";
import { authApi } from "./apis/auth.api";
import { inflationApi } from "./apis/inflation.api";
import { authentication } from "./middlewares/authentication.middleware";
import { StorageAssignments } from "./types/store.types";

export const sliceReducers = {
  [authSlice.name]: authSlice.reducer,
  [decadeStatsSlice.name]: decadeStatsSlice.reducer,
  [web3Slice.name]: web3Slice.reducer,
};

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [inflationApi.reducerPath]: inflationApi.reducer,
};

export const DEFAULT_MIDDLEWARE_OPTIONS = {
  serializableCheck: {
    ignoredActions: [
      "next-redux-cookie-wrapper/SERVE_COOKIES",
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
    ],
  },
};

export const CONCAT_MIDDLEWARE = [
  authApi.middleware,
  inflationApi.middleware,
  authentication,
];

import { persistReducer } from "redux-persist";

export function persistReducers(storageAssignments: StorageAssignments) {
  return {
    [authSlice.name]: persistReducer(
      {
        key: authSlice.name,
        storage: storageAssignments[authSlice.name],
        blacklist: ["_computed"],
      },
      authSlice.reducer
    ),

    [web3Slice.name]: persistReducer(
      {
        key: web3Slice.name,
        storage: storageAssignments[web3Slice.name],
        blacklist: ["drivers"],
      },
      web3Slice.reducer
    ),

    [decadeStatsSlice.name]: persistReducer(
      {
        key: decadeStatsSlice.name,
        storage: storageAssignments[decadeStatsSlice.name],
      },
      decadeStatsSlice.reducer
    ),
  };
}
