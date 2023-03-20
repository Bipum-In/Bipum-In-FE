import Axios from '../../api/axios';
import Redux from '../redux';

const initialState = {
  requestStatus: {
    getRequest: null,
    isStatusLoading: false,
    isStatusError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __requestStatus = Redux.asyncThunk(
  'REQUEST',
  payload =>
    axios.get(
      `/api/admin/requests?keyword=${payload.keyword}&type=${payload.type}&status=${payload.status}&page=${payload.page}&size=${payload.size}`
    ),
  response => response.data.data
);

const requestStatusSlice = Redux.slice(
  'getRequest',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      __requestStatus,
      'requestStatus',
      'isStatusLoading',
      'getRequest',
      'isStatusError'
    );
  }
);

export default requestStatusSlice.reducer;
