import { api } from 'api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminDashboard: {
    getDashboard: null,
    isDashboardError: false,
  },
  userDashboard: {
    getDashboard: null,
    isDashboardError: false,
  },
  commonSupplyDtos: {
    getCommonSupplyDtos: null,
    isCommonSupplyDtosError: false,
  },
};

export const adminDashboardStatus = createAsyncThunk(
  'ADMIN_DASHBOARD',
  async (payload, thunkAPI) => {
    return await api
      .get(`/api/admin/main?largeCategory=${payload.status}`)
      .then(response => thunkAPI.fulfillWithValue(response.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

export const userDashboardStatus = createAsyncThunk(
  'USER_DASHBOARD',
  async (payload, thunkAPI) => {
    return await api
      .get(`/api/main?largeCategory=${payload}`)
      .then(response => thunkAPI.fulfillWithValue(response.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

export const commonSupplyDtos = createAsyncThunk(
  'COMMON_SUPPLY_DTOS',
  async (payload, thunkAPI) => {
    return await api
      .get(`/api/main/common?largeCategory=${payload}`)
      .then(response => thunkAPI.fulfillWithValue(response.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

const adminDashboardExtraReducer = bulider => {
  bulider.addCase(adminDashboardStatus.fulfilled, (state, action) => {
    const { adminDashboard } = state;
    adminDashboard.isDashboardError = false;
    adminDashboard.getDashboard = action.payload;
  });
  bulider.addCase(adminDashboardStatus.rejected, state => {
    const { adminDashboard } = state;
    adminDashboard.isDashboardError = true;
  });
};

const userDashboardStatusExtraReducer = bulider => {
  bulider.addCase(userDashboardStatus.fulfilled, (state, action) => {
    const { userDashboard } = state;
    userDashboard.isDashboardError = false;
    userDashboard.getDashboard = action.payload;
  });
  bulider.addCase(userDashboardStatus.rejected, state => {
    const { userDashboard } = state;
    userDashboard.isDashboardError = true;
  });
};

const commonSupplyDtosExtraReducer = bulider => {
  bulider.addCase(commonSupplyDtos.fulfilled, (state, action) => {
    const { commonSupplyDtos } = state;
    commonSupplyDtos.isCommonSupplyDtosError = false;
    commonSupplyDtos.getCommonSupplyDtos = action.payload;
  });
  bulider.addCase(commonSupplyDtos.rejected, state => {
    const { commonSupplyDtos } = state;
    commonSupplyDtos.isCommonSupplyDtosError = true;
  });
};

const dashboardStatusSlice = createSlice({
  name: 'getDashboard',
  initialState,
  reducers: {},
  extraReducers: bulider => {
    adminDashboardExtraReducer(bulider);
    userDashboardStatusExtraReducer(bulider);
    commonSupplyDtosExtraReducer(bulider);
  },
});

export const { initDashboard } = dashboardStatusSlice.actions;
export default dashboardStatusSlice.reducer;
