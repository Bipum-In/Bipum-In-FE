import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  adminDashboard: {
    getDashboard: null,
    isDashboardLoading: false,
    isDashboardError: false,
  },
  userDashboard: {
    getDashboard: null,
    isDashboardLoading: false,
    isDashboardError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const adminDashboardStatus = Redux.asyncThunk(
  'ADMIN_DASHBOARD',
  payload => axios.get(`/api/admin/main?largeCategory=${payload.status}`)
);

export const userDashboardStatus = Redux.asyncThunk('USER_DASHBOARD', payload =>
  axios.get(`/api/main?largeCategory=${payload}`)
);

const dashboardStatusSlice = Redux.slice(
  'getDashboard',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      adminDashboardStatus,
      'adminDashboard',
      'isDashboardLoading',
      'getDashboard',
      'isDashboardError'
    );
    Redux.extraReducer(
      bulider,
      userDashboardStatus,
      'userDashboard',
      'isDashboardLoading',
      'getDashboard',
      'isDashboardError'
    );
  }
);

export const { initDashboard } = dashboardStatusSlice.actions;
export default dashboardStatusSlice.reducer;
