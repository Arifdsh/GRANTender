import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApplyListForTenders = createAsyncThunk('apply/fetchApplyListForTenders', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const loggedInUser = state.user.user;
  const loggedInUserId = loggedInUser.id
 
  try {
    const applyResponse = await axios.get('http://localhost:5173/applyList');
    const userResponse = await axios.get('http://localhost:5173/user')
    const tenderResponse = await axios.get('http://localhost:5173/cards');

    const appliedTenders = applyResponse.data
    .filter(apply => apply.tenderOwnerId === loggedInUserId)
    .map(apply => {
      const applicant = userResponse.data.find(user => user.id === apply.userId);
      const tenderOwner = tenderResponse.data.find(tender => tender.id === apply.cardId); 
      return {
        ...apply,
        applicantName: applicant ? applicant.name : "Unknown",
        tenderOwnerName: tenderOwner ? tenderOwner.owner : "Unknown"
      };
    }).reverse();
  
  return appliedTenders;
  } catch (error) {
    console.error("Error fetching apply list:", error);
    return rejectWithValue(error.response.data);
  }
});

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
    applyData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplyListForTenders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplyListForTenders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applyData = action.payload; 
      })
      .addCase(fetchApplyListForTenders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(submitApplyList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitApplyList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applyData.push(action.payload)
      })
      .addCase(submitApplyList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default applySlice.reducer;
