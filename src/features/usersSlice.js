import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlUser = import.meta.env.VITE_API_URL_USER

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId, { rejectWithValue }) => {
  if (!userId) {
    return rejectWithValue('User ID is undefined');
  }
  try {
    const response = await axios.get(`${apiUrlUser}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch user');
  }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  try {
    const response = await axios.get(apiUrlUser)
    return response.data;

  } catch (error) {
    console.error("Faild to fetch all users: ", error);
    throw error;
  }
});


export const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
  try {
    const response = await axios.post(apiUrlUser, userData);
    return response.data;
  } catch (error) {
    console.error("Faild to update user: ", error);
    throw error;
  }
});

export const editUser = createAsyncThunk('user/editUser', async (userData) => {
  try {
    const response = await axios.patch(`${apiUrlUser}/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Faild to edit user patch: ", error);
    throw error
  }
});

export const toggleBookmark = createAsyncThunk(
  'users/toggleBookmark',
  async ({ tenderId, userId }, { getState }) => {
    const { user } = getState().user

    const updatedBookmarks = user.bookmarked.includes(tenderId)
      ? user.bookmarked.filter((id) => id !== tenderId)
      : [...user.bookmarked, tenderId]

    const response = await axios.patch(`${apiUrlUser}/${userId}`, {
      bookmarked: updatedBookmarks,
    });

    return { tenderId, updatedBookmarks: response.data.bookmarked };
  }
)

export const applyForTender = createAsyncThunk(
  'user/applyForTender',
  async ({ tenderId, userId }, { getState }) => {
    const { user } = getState().user;

    const updatedApplied = [...user.applied, tenderId];

    const response = await axios.patch(`${apiUrlUser}/${userId}`, {
      applied: updatedApplied,
    });

    return { tenderId, updatedApplied: response.data.applied };
  }
)

export const loginUser = createAsyncThunk('user/loginUser', async (userId) => {
  try {
    const response = await axios.patch(`${apiUrlUser}/${userId}`, { loggedIn: true });
    return response.data;
  } catch (error) {
    console.error("Login faild: ", error);
    throw error;
  }
});

export const checkLoggedInUser = createAsyncThunk('user/checkLoggedInUser', async () => {
  try {
    const response = await axios.get(apiUrlUser);
    const loggedInUser = response.data.find((user) => user.loggedIn === true);
    return loggedInUser || null;
  } catch (error) {
    console.error("Login check faild: ", error);
    throw error
  }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (userId, { dispatch }) => {
  try {
    await axios.patch(`${apiUrlUser}/${userId}`, { loggedIn: false });
    dispatch(clearUserState())
  } catch (error) {
    console.error("Faild to logout: ", error);
    throw error
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    status: 'idle',
    error: null,
    bookmarked: [],
    showProfileEdit: false,
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.bookmarked = [];
    },
    showProfileEditForm: (state) => {
      state.showProfileEdit = true;
    },
    hideProfileEditForm: (state) => {
      state.showProfileEdit = false;
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
      //Edit user
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Toggle bookmarks
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.user.bookmarked = action.payload.updatedBookmarks;
      })
      // Apply for tender
      .addCase(applyForTender.fulfilled, (state, action) => {
        state.user.applied = action.payload.updatedApplied;
      });
  },
});


export default userSlice.reducer

export const selectIsUserLoggedIn = createSelector(
  (state) => state.user,
  (user) => user.loggedIn
);

export const { setLoggedInUser, addBookmark, removeBookmark, clearUserState, } = userSlice.actions;

export const { showProfileEditForm, hideProfileEditForm } = userSlice.actions;