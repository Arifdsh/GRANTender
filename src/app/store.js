import { configureStore } from "@reduxjs/toolkit";
import applyReducer from '../features/applySlice'
import userReducer from "../features/usersSlice";

export const store=configureStore({
    reducer:{
        apply: applyReducer,
        user: userReducer,
    },
});