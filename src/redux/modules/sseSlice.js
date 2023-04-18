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
    },
    setUserSSE: (state, action) => {
      state.sseUserData = [action.payload, ...state.sseUserData];
      state.sseUserLength = state.sseUserData.length;
    },
    deleteAllAdminSseMsg: state => {
      state.sseAdminData = [];
      state.sseAdminLength = '';
    },
    deleteAllUerSseMsg: state => {
      state.sseUserData = [];
      state.sseUserLength = '';
    },
    deleteAllAdminSseLength: state => {
      state.sseAdminLength = '';
    },
    deleteAllUerSseLength: state => {
      state.sseUserLength = '';
    },
    setSSECount: (state, action) => {
      const parseData = action.payload.reduce((acc, cur) => {
        acc[cur.role.toLowerCase()] = cur.count;
        return acc;
      }, {});

      state.sseUserLength = parseData.user;
      state.sseAdminLength = parseData.admin;
    },
    deleteAdminSseData: (state, action) => {
      state.sseAdminData = [...state.sseAdminData].filter(
        item => item.notificationId !== action.payload
      );
      state.sseAdminLength = state.sseAdminLength - 1;
    },
    deleteUserSseData: (state, action) => {
      state.sseUserData = [...state.sseUserData].filter(
        item => item.notificationId !== action.payload
      );
      state.sseUserLength = state.sseUserLength - 1;
    },
  },
});

export const {
  initSSE,
  initSSECount,
  setAdminSSE,
  setUserSSE,
  setSSECount,
  deleteAdminSseData,
  deleteUserSseData,
  deleteAllAdminSseMsg,
  deleteAllUerSseMsg,
  deleteAllAdminSseLength,
  deleteAllUerSseLength,
} = sseSlice.actions;

export default sseSlice.reducer;
