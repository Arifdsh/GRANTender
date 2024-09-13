import { configureStore } from "@reduxjs/toolkit"
import applyReducer from '../features/applySlice'
import userReducer from "../features/usersSlice"
import tendersReducer from "../features/tendersSlice"

export const store = configureStore({
    reducer: {
        apply: applyReducer,
        user: userReducer,
        tenders: tendersReducer,
    },
});