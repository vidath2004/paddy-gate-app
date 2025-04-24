import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/admin';

const initialState = {
  users: [],
  allMills: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

// Get all users
export const getUsers = createAsyncThunk(
  'users/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.get(`${API_URL}/users`, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user status
export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ id, accountStatus }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.put(`${API_URL}/users/${id}/status`, { accountStatus }, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all mills (including unverified)
export const getAllMills = createAsyncThunk(
  'users/getAllMills',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.get(`${API_URL}/mills`, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify mill
export const verifyMill = createAsyncThunk(
  'users/verifyMill',
  async ({ id, verificationStatus }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.put(`${API_URL}/mills/${id}/verify`, { verificationStatus }, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allMills = action.payload;
      })
      .addCase(getAllMills.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyMill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyMill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        const index = state.allMills.findIndex(mill => mill._id === action.payload._id);
        if (index !== -1) {
          state.allMills[index] = action.payload;
        }
      })
      .addCase(verifyMill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;