import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mills';

const initialState = {
  mills: [],
  millerMills: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

// Get all mills
export const getMills = createAsyncThunk(
  'mills/getAll',
  async (filters, thunkAPI) => {
    try {
      let url = API_URL;
      if (filters) {
        const queryParams = new URLSearchParams(filters).toString();
        url = `${API_URL}?${queryParams}`;
      }
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get miller's mills
export const getMillerMills = createAsyncThunk(
  'mills/getMillerMills',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.get(`${API_URL}/miller`, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create mill
export const createMill = createAsyncThunk(
  'mills/create',
  async (millData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(API_URL, millData, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update mill
export const updateMill = createAsyncThunk(
  'mills/update',
  async ({ id, millData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.put(`${API_URL}/${id}`, millData, config);
      return response.data;
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const millSlice = createSlice({
  name: 'mills',
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
      .addCase(getMills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mills = action.payload;
      })
      .addCase(getMills.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMillerMills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMillerMills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.millerMills = action.payload;
      })
      .addCase(getMillerMills.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.millerMills.push(action.payload);
      })
      .addCase(createMill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        const index = state.millerMills.findIndex(mill => mill._id === action.payload._id);
        if (index !== -1) {
          state.millerMills[index] = action.payload;
        }
      })
      .addCase(updateMill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = millSlice.actions;
export default millSlice.reducer;