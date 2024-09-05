import { createSlice } from '@reduxjs/toolkit';

const applySlice = createSlice({
  name: 'apply',
  initialState: {
    applications: [],
  },
  reducers: {
    addApplicationData: (state, action) => {
      state.applications.push(action.payload);
    },
  },
});

export const { addApplicationData } = applySlice.actions;
export default applySlice.reducer;  // This exports the reducer function