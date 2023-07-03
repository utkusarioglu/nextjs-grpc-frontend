import { persistReducer } from "redux-persist";
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
import appSlice from "./slices/app.slice";
import { authApi } from "./apis/auth.api";
import { feedApi } from "./apis/feed/feed.api";
import { inflationApi } from "./apis/inflation.api";
import { initializationMiddleware } from "./middlewares/initialization.middleware";
import { StorageAssignments } from "./types/store.types";

export const sliceReducers = {
  [appSlice.name]: appSlice.reducer,
  [decadeStatsSlice.name]: decadeStatsSlice.reducer,
  [web3Slice.name]: web3Slice.reducer,
};

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [inflationApi.reducerPath]: inflationApi.reducer,
  [feedApi.reducerPath]: feedApi.reducer,
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
  feedApi.middleware,
  initializationMiddleware,
];

export function persistReducers(storageAssignments: StorageAssignments) {
  return {
    [appSlice.name]: persistReducer(
      {
        key: appSlice.name,
        storage: storageAssignments[appSlice.name],
        blacklist: ["_computed", "_cookie", "isI18nInitialized"],
      },
      appSlice.reducer
    ),

    [web3Slice.name]: persistReducer(
      {
        key: web3Slice.name,
        storage: storageAssignments[web3Slice.name],
        blacklist: ["_cookie", "drivers"],
      },
      web3Slice.reducer
    ),

    [decadeStatsSlice.name]: persistReducer(
      {
        key: decadeStatsSlice.name,
        storage: storageAssignments[decadeStatsSlice.name],
        blacklist: ["_cookie"],
      },
      decadeStatsSlice.reducer
    ),
  };
}
