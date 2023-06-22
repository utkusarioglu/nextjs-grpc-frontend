import { type FC, type ReactNode } from "react";
import { Provider } from "react-redux";
import {
  type PrivateStoreWithPersistor,
  type PrivateStore,
  type WithPersistor,
} from "../types/store.types";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
  store: PrivateStore;
  children: ReactNode;
  loadingViewComponent: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  store,
  children,
  loadingViewComponent,
}) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={loadingViewComponent}
        persistor={(store as PrivateStoreWithPersistor).__persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};
