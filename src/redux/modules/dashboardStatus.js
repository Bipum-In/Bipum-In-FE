import Axios from '../../api/axios';
import Redux from '../redux';

const initialState = {
  dashboardStatus: {
    getDashboard: null,
    isDashboardLoading: false,
    isDashboardError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __dashboardStatus = Redux.asyncThunk('DASHBOARD', payload =>
  axios.get(`/api/admin/main?largeCategory=${payload.status}`)
);

const dashboardStatusSlice = Redux.slice(
  'getDashboard',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      __dashboardStatus,
      'dashboardStatus',
      'isDashboardLoading',
      'getDashboard',
      'isDashboardError'
    );
  }
);

export default dashboardStatusSlice.reducer;
