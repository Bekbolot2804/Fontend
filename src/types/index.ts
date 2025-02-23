export interface CounterState {
  count: number;
}

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export interface CounterActionTypes {
  type: typeof INCREMENT | typeof DECREMENT;
}

// Для корзины
export interface Help {
  id: number;
  name: string;
  description: string;
  image_url?: string;
}

export interface CartItem extends Help {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const ADD_TO_CART = 'ADD_TO_CART';

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Help;
}

export type CartActionTypes = AddToCartAction;