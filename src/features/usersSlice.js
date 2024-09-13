import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  status: 'idle',
  error: null,
};

// GET
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('http://localhost:5173/user');
  return response.data;
});

// POST
export const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
  const response = await axios.post('http://localhost:5173/user', userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      const { name, id } = action.payload; // Extract only name and id
      state.user = { name, id }; // Update state with only name and id
      localStorage.setItem('loggedInUser', JSON.stringify({ name, id })); // Store name and id in localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('loggedInUser'); // Clear user from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle GET request
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle POST request
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setLoggedInUser, logout } = userSlice.actions
export default userSlice.reducer
