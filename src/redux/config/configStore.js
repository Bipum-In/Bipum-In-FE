import { configureStore } from '@reduxjs/toolkit';
import requestStatus from '../modules/requestStatus';

const store = configureStore({
  reducer: {
    requestStatus,
  },
});

export default store;
