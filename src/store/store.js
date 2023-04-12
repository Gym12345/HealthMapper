import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

// redux 상태관리 store
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
