import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from 'axios'
const apiUrlCards = import.meta.env.VITE_API_URL_CARDS

//GET
export const fetchTenders = createAsyncThunk('tender/fetchTenders', async (_, { dispatch }) => {
  try {
    const response = await axios.get(apiUrlCards);
    const tenders = response.data.reverse()

    const today = new Date().toISOString().split('T')[0];

    tenders.forEach((tender) => {
      if (tender.expirationDate && tender.expirationDate < today) {
        dispatch(deleteTender(tender.id));
      }
    })

    return tenders.filter(tender => !tender.expirationDate || tender.expirationDate >= today)

  } catch (error) {
    console.error('Failed to fetch tenders:', error);
    return []
  }
})

//POST
export const createTender = createAsyncThunk('tender/createTender', async (newTender) => {
  try {
    const response = await axios.post(apiUrlCards, newTender)
    return response.data

  } catch (error) {
    console.error('Failed to post tender:', error);
    throw error;
  }
})

//Delete
export const deleteTender = createAsyncThunk('tender/deleteTender', async (tenderId, { rejectWithValue }) => {
  try {
    await axios.delete(`${apiUrlCards}/${tenderId}`);
    return tenderId;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Tender not found for deletion:', tenderId);
      return rejectWithValue('Tender not found');
    }
    console.error('Failed to delete tender:', error);
    throw error;
  }
});

// PUT - to update a tender
export const updateTender = createAsyncThunk('tender/updateTender', async ({ id, updatedData }) => {
  try {
    const response = await axios.put(`${apiUrlCards}/${id}`, updatedData);
    return response.data
  } catch (error) {
    console.error('Failed to update tender:', error);
    throw error;
  }
});

// fetch tenders created by the logged in user
export const fetchTendersByCreator = createAsyncThunk('cards/fetchTendersByCreator', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(apiUrlCards);
    const tenders = response.data.filter((tender) => tender.userId === userId);
    return tenders;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const tendersSlice = createSlice({
  name: 'tenders',
  initialState: {
    tenders: [],
    tenderToEdit: null,
    bookmarks: {},
    status: 'idle',
    error: null,
    showCreateTender: false,
    selectedTenderId: null,
    selectedTenderUserId: null,
    isEditing: false,
    applyShow: false,
  },
  reducers: {
    setTenderToEdit: (state, action) => {
      state.tenderToEdit = action.payload
    },
    clearTenderToEdit: (state) => {
      state.tenderToEdit = null
    },
    showCreateTenderForm: (state) => {
      state.showCreateTender = true;
    },
    hideCreateTenderForm: (state) => {
      state.showCreateTender = false;
    },
    setSelectedTenderId: (state, action) => {
      state.selectedTenderId = action.payload;
    },
    setSelectedTenderUserId: (state, action) => {
      state.selectedTenderUserId = action.payload
    },
    showApplyForm: (state) => {
      state.applyShow = true;
    },
    hideApplyForm: (state) => {
      state.applyShow = false;
    },
  },
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
      .addCase(deleteTender.fulfilled, (state, action) => {
        state.tenders = state.tenders.filter(tender => tender.id !== action.payload);
      })
      .addCase(updateTender.fulfilled, (state, action) => {
        const index = state.tenders.findIndex(tender => tender.id === action.payload.id);
        if (index !== -1) {
          state.tenders[index] = action.payload
        }
        state.tenderToEdit = null
      })
      // fetchTendersByCreator
      .addCase(fetchTendersByCreator.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTendersByCreator.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tenders = action.payload;
      })
      .addCase(fetchTendersByCreator.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
})

export default tendersSlice.reducer;

export const { showApplyForm, hideApplyForm } = tendersSlice.actions;

export const { setSelectedTenderId, setSelectedTenderUserId } = tendersSlice.actions;

export const { showCreateTenderForm, hideCreateTenderForm } = tendersSlice.actions

export const { setTenderToEdit, clearTenderToEdit } = tendersSlice.actions

export const selectSelectedTenderId = (state) => state.tenders.selectedTenderId;
export const selectSelectedTenderOwnerId = (state) => state.tenders.selectedTenderUserId;

export const selectAllTenders = (state) => state.tenders.tenders;

export const selectTendersByUserId = createSelector(
  [selectAllTenders, (state, userId) => userId],
  (tenders, userId) => {
    if (!userId) return tenders;
    return tenders.filter((tender) => tender.userId === userId);
  }
)