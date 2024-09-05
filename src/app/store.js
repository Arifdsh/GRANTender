import { configureStore } from "@reduxjs/toolkit";
import applyReducer from '../features/applySlice'

export const store=configureStore({
    reducer:{
        apply: applyReducer,
    },
});