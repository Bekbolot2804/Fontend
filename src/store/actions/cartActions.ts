import { ADD_TO_CART, Help } from '../../types';

export const addToCart = (item: Help) => ({
  type: ADD_TO_CART,
  payload: item
});