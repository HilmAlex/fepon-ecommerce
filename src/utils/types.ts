import { Dispatch, ReactChild } from "react";

export interface slugProductProps {
  _type: string;
  current: string;
}

export interface imageProductProps {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface productProps {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  slug: slugProductProps;
  image: imageProductProps;
  brand: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export interface dataProps {
  products?: productProps[];
  error?: string;
  loading: boolean;
}

export interface productScreenStateType {
  product: productProps | null;
  error?: string;
  loading: boolean;
}

export interface cartType{
  cartItems: Array<productProps>
}
export interface StoreStateType {
  darkMode: boolean;
  cart: cartType;
}

export interface DispatchStorePayloadType {
  _key: string;
  name: string;
  countInStock: number;
  slug: string;
  price: number;
  image: string;
  quantity: number;
}
export interface DispatchStoreType {
  type: string;
  payload: DispatchStorePayloadType;
}

export interface StoreContextType {
  state: StoreStateType;
  dispatch: Dispatch<DispatchStoreType>;
}

export interface StoreProviderProps {
  children: ReactChild;
}
