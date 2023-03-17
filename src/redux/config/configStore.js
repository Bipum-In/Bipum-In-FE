import { configureStore } from '@reduxjs/toolkit';
import requestStatus from '../modules/requestStatus';
import dashboardStatus from '../modules/dashboardStatus';

const store = configureStore({
  reducer: {
    requestStatus,
    dashboardStatus,
  },
});

export default store;
