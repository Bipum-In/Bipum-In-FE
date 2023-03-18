import { configureStore } from '@reduxjs/toolkit';
import requestStatus from '../modules/requestStatus';
import dashboardStatus from '../modules/dashboardStatus';
import equipmentStatus from '../modules/equipmentStatus';

const store = configureStore({
  reducer: {
    requestStatus,
    dashboardStatus,
    equipmentStatus,
  },
});

export default store;
