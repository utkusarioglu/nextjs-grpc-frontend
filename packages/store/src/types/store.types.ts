import { configureStore } from "@reduxjs/toolkit";
import type { Persistor } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiReducers, persistReducers } from "../store-elements";

type Nullish = void | null;

interface StorageAssignment {
  getItem(name: string): string | Nullish | Promise<string | Nullish>;
  setItem(name: string, value: string): Nullish | Promise<Nullish>;
  removeItem(name: string): Nullish | Promise<Nullish>;
}

export type StorageAssignments = Record<
  "auth" | "decadeStats" | "web3",
  StorageAssignment
>;

export type WithPersistor = {
  __persistor: Persistor;
};

export type AfterRehydration = (store: PrivateStore) => void | Promise<void>;

// export type PersistedReducerDefinition = {
//   // key: keyof StorageAssignments;
//   slice: Slice;
// } & Omit<PersistConfig<Slice>, "storage" | "key">;

export interface StorageFactoryProps {
  storageAssignments: StorageAssignments;
  afterRehydration: AfterRehydration;
}

const mockStorageAssignments = {
  auth: localStorage,
  web3: localStorage,
  decadeStats: localStorage,
};

const privateStore = configureStore({
  reducer: {
    ...persistReducers(mockStorageAssignments),
    ...apiReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(privateStore.dispatch);

export type PrivateStore = typeof privateStore;
export type PrivateStoreWithPersistor = PrivateStore & {
  __persistor: Persistor;
};

export type PrivateRootState = ReturnType<PrivateStore["getState"]>;
export type PrivateAppDispatch = PrivateStore["dispatch"];
