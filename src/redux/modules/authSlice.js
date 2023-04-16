import { createSlice } from '@reduxjs/toolkit';
import QUERY from 'constants/query';

const initialState = {
  isLoggedIn: !!localStorage.getItem(QUERY.STORAGE.LOCAL_NAME),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: state => {
      state.isLoggedIn = true;
    },
    logoutSuccess: state => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
