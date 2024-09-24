import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlCards = import.meta.env.VITE_API_URL_CARDS
const apiUrlUser = import.meta.env.VITE_API_URL_USER
const apiUrlApplyList = import.meta.env.VITE_API_URL_APPLY_LIST

export const fetchApplyListForTenders = createAsyncThunk('apply/fetchApplyListForTenders', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const loggedInUser = state.user.user;
  const loggedInUserId = loggedInUser.id

  try {
    const applyResponse = await axios.get(apiUrlApplyList);
    const userResponse = await axios.get(apiUrlUser)
    const tenderResponse = await axios.get(apiUrlCards);

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
    const response = await axios.post('apiUrlApplyList', formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const selectIncomingApplicationsCount = createSelector(
  [(state) => state.apply.applyData, (state) => state.user.user],
  (applications, loggedInUser) => {
    return applications.filter((application) => application.tenderOwnerId === loggedInUser?.id).length;
  }
);
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

