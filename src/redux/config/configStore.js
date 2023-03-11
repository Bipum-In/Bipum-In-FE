import { configureStore } from '@reduxjs/toolkit';
import getMainSlice from '../modules/main';

const store = configureStore({
  reducer: {
    getMainSlice,
  },
});

export default store;
