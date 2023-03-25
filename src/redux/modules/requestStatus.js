import { current } from '@reduxjs/toolkit';
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
  requestData: {
    selectStatus: 'ALL',
    menuType: 'ALL',
    menu: [
      { name: '전체', type: 'ALL', status: true },
      { name: '비품 요청', type: 'SUPPLY', status: false },
      { name: '반납 요청', type: 'RETURN', status: false },
      { name: '수리 요청', type: 'REPAIR', status: false },
      { name: '보고서 결재', type: 'REPORT', status: false },
    ],
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
  payload => axios.get(`/api/admin/requests/${payload}`),
  response => response.data.data
);

const requestStatusSlice = Redux.slice(
  'Request',
  initialState,
  {
    initRequest: (state, _) => {
      state.requestStatus.getRequest = null;
    },
    initDetail: (state, _) => {
      state.requestDetail.getDetail = null;
    },
    setRequestData: (state, action) => {
      state.requestData.menu = current(state.requestData.menu).map(menu =>
        menu.name === action.payload.name
          ? { ...menu, status: true }
          : { ...menu, status: false }
      );
      state.requestData.menuType = action.payload.type;
      state.requestData.selectStatus = action.payload.status;
    },
  },
  bulider => {
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
  }
);

export const { initRequest, initDetail, setRequestData } =
  requestStatusSlice.actions;
export default requestStatusSlice.reducer;
