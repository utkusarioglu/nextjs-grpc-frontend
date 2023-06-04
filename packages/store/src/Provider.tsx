import { type FC, type ReactNode } from "react";
import { Provider } from "react-redux";
import { storeFactory, StorageAssignments } from "./store";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
  children: ReactNode;
  storageAssignments: StorageAssignments;
  loadingViewComponent: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  storageAssignments,
  loadingViewComponent,
}) => {
  const { store, persistor } = storeFactory(storageAssignments);
  return (
    <Provider store={store}>
      <PersistGate loading={loadingViewComponent} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
