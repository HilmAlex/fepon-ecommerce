import Cookies from "js-cookie";
import { createContext, Dispatch, ReactChild, useReducer } from "react";

interface StoreContextType {
  state: StoreStateType;
  dispatch: Dispatch<ActionStoreType>;
}

interface StoreStateType {
  darkMode: boolean;
}

interface ActionStoreType {
  type: string;
}

interface StoreProviderProps {
  children: ReactChild;
}

export const Store = createContext<StoreContextType>(
  null as unknown as StoreContextType
);

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
};

function reducer(state: StoreStateType, action: ActionStoreType) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    default:
      return state;
  }
}

export function StoreProvider(props: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
