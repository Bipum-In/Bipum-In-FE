import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sseAdminData: [],
  sseUserData: [],
  sseAdminLength: null,
  sseUserLength: null,
};

const sseSlice = createSlice({
  name: 'sseData',
  initialState,
  reducers: {
    initSSE: state => {
      state.sseData = [];
    },
    setAdminSSE: (state, action) => {
      state.sseAdminData = [action.payload, ...state.sseAdminData];
      state.sseAdminLength = state.sseAdminData.length;
      localStorage.setItem('sseAdminLength', state.sseAdminLength);
    },
    setUserSSE: (state, action) => {
      state.sseUserData = [action.payload, ...state.sseUserData];
      state.sseUserLength = state.sseUserData.length;
      localStorage.setItem('sseUserLength', state.sseUserLength);
    },
    deleteAdminSseData: (state, action) => {
      state.sseAdminData = [...state.sseAdminData].filter(
        item => item.notificationId !== action.payload
      );
    },
    deleteUserSseData: (state, action) => {
      state.sseUserData = [...state.sseUserData].filter(
        item => item.notificationId !== action.payload
      );
    },
  },
});

export const {
  initSSE,
  setAdminSSE,
  setUserSSE,
  deleteAdminSseData,
  deleteUserSseData,
} = sseSlice.actions;

export default sseSlice.reducer;
