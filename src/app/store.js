import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/usersSlice"
import tendersReducer from "../features/tendersSlice"
import searchReducer from "../features/searchSlice"


export const store = configureStore({
    reducer: {
        user: userReducer,
        tenders: tendersReducer,
        search: searchReducer,
    },
});