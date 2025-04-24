import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import priceReducer from './slices/priceSlice';
import millReducer from './slices/millSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    prices: priceReducer,
    mills: millReducer,
    users: userReducer
  }
});

export default store;