import { afterRehydrationFactory } from "./utils/rehydration.utils";
import EncryptedStorage from "react-native-encrypted-storage";
// @ts-expect-error: Lacking type definition by wallet-connect
import type { UniversalProvider } from "@web3modal/react-native";
import {
  DEFAULT_MIDDLEWARE_OPTIONS,
  CONCAT_MIDDLEWARE,
  type StorageFactoryProps,
  configureStore,
  sliceReducers,
  apiReducers,
  persistReducers,
  setupListeners,
  persistStore,
  type WithPersistor,
} from "store";

const storageAssignments = {
  app: EncryptedStorage,
  decadeStats: EncryptedStorage,
  web3: EncryptedStorage,
};

interface MakeStoreProps {
  universalProvider: UniversalProvider;
  web3Modal: {
    openModal: any;
    closeModal: any;
  };
}

/**
 * @dev
 * #1 Type inconsistency occurring due to multiple different
 *    store instances being created for different projects.
 */
export const makeStore = (reactProps: MakeStoreProps) => {
  return storeFactory({
    storageAssignments,
    // @ts-expect-error: #1
    afterRehydration: afterRehydrationFactory(
      reactProps.universalProvider,
      reactProps.web3Modal,
    ),
  });
};

// export const store = (reactProps) => makeStore(reactProps);

// export const wrapper = createWrapper(makeStore);

// TODO find type for this `any
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware(DEFAULT_MIDDLEWARE_OPTIONS).concat(...CONCAT_MIDDLEWARE);

export function storeFactory({
  storageAssignments,
  afterRehydration,
}: StorageFactoryProps) {
  const makeStore = (context: any) => {
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
  };

  return makeStore;
}

export type Store = ReturnType<ReturnType<typeof storeFactory>>;
export type StoreWithPersistor = ReturnType<ReturnType<typeof storeFactory>> &
  WithPersistor;

export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
