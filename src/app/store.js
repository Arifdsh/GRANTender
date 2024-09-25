import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/usersSlice"
import tendersReducer from "../features/tendersSlice"
import searchReducer from "../features/searchSlice"
import applyReducer from "../features/applySlice"
import confirmReducer from '../features/confirmSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        tenders: tendersReducer,
        search: searchReducer,
        apply: applyReducer,
        confirm: confirmReducer,
    },
});

export default store;