import { createSlice } from '@reduxjs/toolkit';

const confirmSlice = createSlice({
    name: 'confirm',
    initialState: {
        isVisible: false,
        selectedTenderId: null,
    },
    reducers: {
        showConfirm: (state, action) => {
            state.isVisible = true;
            state.selectedTenderId = action.payload;
        },
        hideConfirm: (state) => {
            state.isVisible = false;
            state.selectedTenderId = null;
        },
    },
});

export const { showConfirm, hideConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;