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
  },
});

export const { initSSE, setAdminSSE, setUserSSE } = sseSlice.actions;

export default sseSlice.reducer;
