import { configureStore } from '@reduxjs/toolkit';
import requestStatus from '../modules/requestStatus';
import dashboardStatus from '../modules/dashboardStatus';
import equipmentStatus from '../modules/equipmentStatus';
import partnersList from '../modules/partnersList';
import authReducer from '../modules/authSlice';
import sseAlertList from '../modules/sseAlertList';
import userInfo from '../modules/userInfoSlice';
import searchHeader from '../modules/searchHeader';

const store = configureStore({
  reducer: {
    partnersList,
    requestStatus,
    dashboardStatus,
    equipmentStatus,
    authReducer,
    sseAlertList,
    userInfo,
    searchHeader,
  },
});

export default store;
