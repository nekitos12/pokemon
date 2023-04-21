import {ReactNode, useMemo} from 'react';
import { Provider } from 'react-redux';
import {createReduxStore} from "./store.ts";

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
  } = props;

  const store = useMemo(createReduxStore, []);

  return (
    <Provider store={store}>
      {children}
      </Provider>
  );
};
