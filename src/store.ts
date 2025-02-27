import { combineReducers, configureStore } from "@reduxjs/toolkit";
import helpsReducer from './slices/helpsSlice'
import userReducer from './slices/userSlice'
import helpReducer from './slices/helpSlice'
import decayReducer from './slices/lesionSlice'
import decaysReducer from './slices/lesionsSlice'

export const store = configureStore ({
    reducer: combineReducers({
        helps: helpsReducer,
        user: userReducer,
        help: helpReducer,
        decay: decayReducer,
        decays: decaysReducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch