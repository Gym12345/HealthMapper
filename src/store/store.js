import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import hospitalSlice from './slices/hospitalSlice';

// redux 상태관리 store
const store = configureStore({
  reducer: {
    auth: authSlice, //사용자인증 states 및 actions
    hospital: hospitalSlice, //병원 조회 states 및 actions
  },
});

export default store;
