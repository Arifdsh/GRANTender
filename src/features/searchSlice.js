import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    all: "",
    minPrice: "",
    maxPrice: "",
    startDate: "",
    endDate: "",
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            return { ...state, ...action.payload }
        },
        resetFilters: () => initialState,
    },
})

export const { setFilters, resetFilters } = searchSlice.actions

export default searchSlice.reducer