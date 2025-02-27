import { combineReducers, configureStore } from "@reduxjs/toolkit";
import helpsReducer from './slices/helpsSlice'
import userReducer from './slices/userSlice'
import helpReducer from './slices/helpSlice'
import lesionReducer from './slices/lesionSlice'
import lesionsReducer from './slices/lesionsSlice'

export const store = configureStore ({
    reducer: combineReducers({
        helps: helpsReducer,
        user: userReducer,
        help: helpReducer,
        lesion: lesionReducer,
        lesions: lesionsReducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch