import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from 'axios'

//GET
export const fetchTenders = createAsyncThunk('tender/fetchTenders', async (_, { dispatch }) => {
  try {
    const response = await axios.get('http://localhost:5173/cards');
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
  const response = await axios.post('http://localhost:5173/cards', newTender)
  return response.data
})

//Delete
export const deleteTender = createAsyncThunk('tender/deleteTender', async (tenderId) => {
  try {
    await axios.delete(`http://localhost:5173/cards/${tenderId}`);
    return tenderId;
  } catch (error) {
    console.error('Failed to delete tender:', error);
    throw error;
  }
});

// PUT - to update a tender
export const updateTender = createAsyncThunk('tender/updateTender', async ({ id, updatedData }) => {
  try {
    const response = await axios.put(`http://localhost:5173/cards/${id}`, updatedData);
    return response.data
  } catch (error) {
    console.error('Failed to update tender:', error);
    throw error;
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
  },
})

export default tendersSlice.reducer;

export const { showCreateTenderForm, hideCreateTenderForm } = tendersSlice.actions

export const { setTenderToEdit, clearTenderToEdit } = tendersSlice.actions

export const selectAllTenders = (state) => state.tenders.tenders;

export const selectTendersByUserId = createSelector(
  [selectAllTenders, (state, userId) => userId],
  (tenders, userId) => {
    if (!userId) return tenders;
    return tenders.filter((tender) => tender.userId === userId);
  }
)