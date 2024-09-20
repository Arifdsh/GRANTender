import { createSlice, createAsyncThunk, createSelector  } from '@reduxjs/toolkit';
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
    const { user } = getState().user

    const updatedBookmarks = user.bookmarked.includes(tenderId)
      ? user.bookmarked.filter((id) => id !== tenderId)
      : [...user.bookmarked, tenderId]

    const response = await axios.patch(`http://localhost:5173/user/${userId}`, {
      bookmarked: updatedBookmarks,
    });

    return { tenderId, updatedBookmarks: response.data.bookmarked };
  }
);

export const loginUser = createAsyncThunk('user/loginUser', async (userId) => {
  const response = await axios.patch(`http://localhost:5173/user/${userId}`, { loggedIn: true });
  return response.data;
});

export const checkLoggedInUser = createAsyncThunk('user/checkLoggedInUser', async () => {
  const response = await axios.get('http://localhost:5173/user');
  const loggedInUser = response.data.find((user) => user.loggedIn === true);
  return loggedInUser || null;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (userId, { dispatch }) => {
  await axios.patch(`http://localhost:5173/user/${userId}`, { loggedIn: false });
  dispatch(clearUserState())
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users:[],
    status: 'idle',
    error: null,
    bookmarked: [],
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.bookmarked = [];
    },
  },
  extraReducers: (builder) => {
    builder
       // Handle user login
       .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Check for logged-in user during app initialization
      .addCase(checkLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Handle user logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.bookmarked = [];
      })
      // Fetch user details
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Fetch all users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // Update user details
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Toggle bookmarks
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.user.bookmarked = action.payload.updatedBookmarks;
      });
  },
});



export const selectIsUserLoggedIn = createSelector(
  (state) => state.user,
  (user) => user.loggedIn
);

export const { setLoggedInUser, addBookmark, removeBookmark, clearUserState,  } = userSlice.actions;
export default userSlice.reducer
