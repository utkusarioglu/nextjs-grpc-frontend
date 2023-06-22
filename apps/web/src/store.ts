import localStorage from "redux-persist/lib/storage";
import { cookieStorage } from "src/utils/cookie.utils";
import { afterRehydration } from "./utils/rehydration.utils";
import { type Context } from "next-redux-wrapper";
import { createWrapper } from "next-redux-wrapper";
import {
  wrapMakeStore,
  nextReduxCookieMiddleware,
} from "next-redux-cookie-wrapper";
import {
  type StorageFactoryProps,
  type WithPersistor,
  sliceReducers,
  apiReducers,
  configureStore,
  persistReducers,
  setupListeners,
  persistStore,
  CONCAT_MIDDLEWARE,
  DEFAULT_MIDDLEWARE_OPTIONS,
} from "store";

const storageAssignments = {
  auth: localStorage, // TODO change this to cookie later if need be
  decadeStats: localStorage,
  web3: localStorage,
};

// TODO find type for this `any
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware(DEFAULT_MIDDLEWARE_OPTIONS)
    .prepend(
      nextReduxCookieMiddleware({
        subtrees: ["web3", "auth"],
      })
    )
    .concat(...CONCAT_MIDDLEWARE);

export function storeFactory({
  storageAssignments,
  afterRehydration,
}: StorageFactoryProps) {
  const makeStore = (context: Context) => {
    const isServer = !global.window;
    if (isServer) {
      return configureStore({
        reducer: {
          ...sliceReducers,
          ...apiReducers,
        },
        middleware,
      });
    } else {
      const store = configureStore({
        reducer: {
          ...persistReducers(storageAssignments),
          ...apiReducers,
        },
        middleware,
      });

      setupListeners(store.dispatch);

      const persistor = persistStore(store, {}, () => {
        afterRehydration(store);
      });

      const storeWithPersistor: typeof store & WithPersistor = {
        ...store,
        __persistor: persistor,
      };

      return storeWithPersistor;
    }
  };

  const makeStoreWithCookiePersistence = wrapMakeStore(makeStore);

  return makeStoreWithCookiePersistence;
}

export type Store = ReturnType<ReturnType<typeof storeFactory>>;
export type StoreWithPersistor = ReturnType<ReturnType<typeof storeFactory>> &
  WithPersistor;

export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

export const makeStore = storeFactory({
  storageAssignments,
  afterRehydration,
});

export const wrapper = createWrapper(makeStore);
