import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

//GET
export const fetchTenders = createAsyncThunk('tender/fetchTenders', async ()=>{
    const response = await axios.get('http://localhost:5173/cards')
    return response.data
})

//POST
export const createTender = createAsyncThunk('tender/createTender', async (newTender)=>{
    const response = await axios.post('http://localhost:5173/cards', newTender)
    return response.data
})

const tendersSlice = createSlice({
    name: 'tenders',
    initialState: {
      tenders: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTenders.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTenders.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.tenders = action.payload;
        })
        .addCase(fetchTenders.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(createTender.fulfilled, (state, action) => {
          state.tenders.push(action.payload);
        })
    },
  })
  
  export default tendersSlice.reducer;