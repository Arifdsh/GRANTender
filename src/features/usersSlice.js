import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const response = await axios.get(`http://localhost:5173/user/${userId}`);
  return response.data;
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const response = await axios.get('http://localhost:5173/user')
  return response.data;
});


export const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
  const response = await axios.post('http://localhost:5173/user', userData);
  return response.data;
});

export const toggleBookmark = createAsyncThunk(
  'users/toggleBookmark',
  async ({ tenderId, userId }, { getState }) => {
    const { user } = getState().user;

    //if(!user || !user.id) return

    const updatedBookmarks = user.bookmarked.includes(tenderId)
      ? user.bookmarked.filter((id) => id !== tenderId)
      : [...user.bookmarked, tenderId]

    const response = await axios.patch(`http://localhost:5173/user/${userId}`, {
      bookmarked: updatedBookmarks,
    });

    return { tenderId, updatedBookmarks: response.data.bookmarked };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    users:[],
    status: 'idle',
    error: null,
    bookmarked: [],
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      const { name, id } = action.payload
      state.user = { name, id, bookmarked: state.user.bookmarked || []  }
      localStorage.setItem('loggedInUser', JSON.stringify({ name, id }))
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('loggedInUser')
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
       // Handle fetch all users
       .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // Store the list of users in the state
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
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
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.user.bookmarked = action.payload.updatedBookmarks
      });
  },
});

export const { setLoggedInUser, logout, addBookmark, removeBookmark } = userSlice.actions;
export default userSlice.reducer
