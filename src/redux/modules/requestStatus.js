import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import Axios from 'api/axios';

const initialState = {
  requestStatus: {
    getRequest: null,
    isStatusError: false,
  },
  requestDetail: {
    getDetail: null,
    isDetailError: false,
  },
  requestData: {
    selectStatus: '',
    menuType: '',
    supplyId: '',
    modelName: '',
    menu: [
      { name: '전체', type: '', status: true },
      { name: '비품 요청', type: 'SUPPLY', status: false },
      { name: '반납 요청', type: 'RETURN', status: false },
      { name: '수리 요청', type: 'REPAIR', status: false },
      { name: '보고서 결재 요청', type: 'REPORT', status: false },
    ],
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __requestStatus = createAsyncThunk(
  'REQUEST',
  async (payload, thunkAPI) => {
    return await axios
      .get(
        `/api${payload.path}/requests?keyword=${payload.keyword}&type=${payload.type}&status=${payload.status}&page=${payload.page}&size=${payload.size}`
      )
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

export const requestDetail = createAsyncThunk(
  'DETAIL',
  async (payload, thunkAPI) => {
    return await axios
      .get(`/api${payload.path}/requests/${payload.detailId}`)
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

const requestStatusExtraReducer = bulider => {
  bulider.addCase(__requestStatus.fulfilled, (state, action) => {
    const { requestStatus } = state;
    requestStatus.isStatusError = false;
    requestStatus.getRequest = action.payload;
  });
  bulider.addCase(__requestStatus.rejected, state => {
    const { requestStatus } = state;
    requestStatus.isStatusError = true;
  });
};

const requestDetailExtraReducer = bulider => {
  bulider.addCase(requestDetail.fulfilled, (state, action) => {
    const { requestDetail } = state;
    requestDetail.isDetailError = false;
    requestDetail.getDetail = action.payload;
  });
  bulider.addCase(requestDetail.rejected, state => {
    const { requestDetail } = state;
    requestDetail.isDetailError = true;
  });
};

const requestStatusSlice = createSlice({
  name: 'Request',
  initialState,
  reducers: {
    initRequest: (state, _) => {
      state.requestStatus.getRequest = null;
    },
    initDetail: (state, _) => {
      state.requestDetail.getDetail = null;
    },
    initRequestData: (state, action) => {
      !action.payload?.menu &&
        (state.requestData.menu = current(state.requestData.menu).map(menu =>
          menu.name === '전체'
            ? { ...menu, status: true }
            : { ...menu, status: false }
        ));
      !action.payload?.menuType && (state.requestData.menuType = '');
      !action.payload?.selectStatus && (state.requestData.selectStatus = '');
      !action.payload?.supplyId && (state.requestData.supplyId = '');
      !action.payload?.modelName && (state.requestData.modelName = '');
    },
    setRequestData: (state, action) => {
      state.requestData.menu =
        current(state.requestData.menu).map(menu =>
          menu.name === action.payload.name
            ? { ...menu, status: true }
            : { ...menu, status: false }
        ) || state.requestData.menu;

      state.requestData.menuType =
        action.payload.type || state.requestData.menuType;

      state.requestData.selectStatus =
        action.payload.status || state.requestData.selectStatus;

      state.requestData.supplyId =
        action.payload.supplyId || state.requestData.supplyId;

      state.requestData.modelName =
        action.payload.modelName || state.requestData.modelName;
    },
  },
  extraReducers: bulider => {
    requestStatusExtraReducer(bulider);
    requestDetailExtraReducer(bulider);
  },
});

export const { initRequest, initDetail, initRequestData, setRequestData } =
  requestStatusSlice.actions;
export default requestStatusSlice.reducer;
