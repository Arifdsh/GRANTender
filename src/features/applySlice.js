import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitApplyList = createAsyncThunk('apply/submitApplyList', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5173/applyList', formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const applySlice = createSlice({
  name: 'apply',
  initialState: {
    applyData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitApplyList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitApplyList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tenderData = action.payload;
      })
      .addCase(submitApplyList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default applySlice.reducer;
