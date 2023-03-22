import Axios from '../../api/axios';
import Redux from '../redux';

const initialState = {
  requestStatus: {
    getRequest: null,
    isStatusLoading: false,
    isStatusError: false,
  },
  requestDetail: {
    getDetail: null,
    isDetailLoading: false,
    isDetailError: false,
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

export const requestDetail = Redux.asyncThunk(
  'DETAIL',
  payload => axios.get(`/api/requests/${payload}`),
  response => response.data.data
);

const requestStatusSlice = Redux.slice('Request', initialState, {}, bulider => {
  Redux.extraReducer(
    bulider,
    __requestStatus,
    'requestStatus',
    'isStatusLoading',
    'getRequest',
    'isStatusError'
  );
  Redux.extraReducer(
    bulider,
    requestDetail,
    'requestDetail',
    'isDetailLoading',
    'getDetail',
    'isDetailError'
  );
});

export default requestStatusSlice.reducer;
