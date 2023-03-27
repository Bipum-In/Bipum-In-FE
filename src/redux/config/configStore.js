import { configureStore } from '@reduxjs/toolkit';
import requestStatus from '../modules/requestStatus';
import dashboardStatus from '../modules/dashboardStatus';
import equipmentStatus from '../modules/equipmentStatus';
import partnersList from '../modules/partnersList';
import deptList from '../modules/deptList';
import deptUserList from '../modules/deptUserList';

const store = configureStore({
  reducer: {
    deptUserList,
    deptList,
    partnersList,
    requestStatus,
    dashboardStatus,
    equipmentStatus,
  },
});

export default store;
