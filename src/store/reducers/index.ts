import { combineReducers } from 'redux';
import { counterReducer } from './counterReducer';
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;