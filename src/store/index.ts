import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Импорт redux-thunk
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware(), // Правильное добавление thunk
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;