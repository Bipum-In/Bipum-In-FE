import Axios from 'api/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  adminSseAlert: {
    getAdminSseAlert: { content: [], lastPage: false },
  },
  userSseAlert: {
    getUserSseAlert: { content: [], lastPage: false },
  },
  sseDatas: {
    sseAdminData: [],
    sseUserData: [],
    sseAdminLength: null,
    sseUserLength: null,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __adminSseAlert = createAsyncThunk(
  'ADMIN_SSE_ALERT',
  async (payload, thunkAPI) => {
    return await axios
      .get(`/api/admin/main/alarm?page=${payload.page}&size=${payload.size}`)
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

export const __userSseAlert = createAsyncThunk(
  'USER_SSE_ALERT',
  async (payload, thunkAPI) => {
    return await axios
      .get(`/api/main/alarm?page=${payload.page}&size=${payload.size}`)
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

const adminSseAlertExtraReducer = bulider => {
  bulider.addCase(__adminSseAlert.fulfilled, (state, action) => {
    const { adminSseAlert } = state;
    adminSseAlert.getAdminSseAlert = {
      ...adminSseAlert.getAdminSseAlert,
      content: [...adminSseAlert.getAdminSseAlert.content].concat(
        action.payload.content
      ),
      lastPage: action.payload.last,
    };
  });
};

const userSseAlertExtraReducer = bulider => {
  bulider.addCase(__userSseAlert.fulfilled, (state, action) => {
    const { userSseAlert } = state;
    userSseAlert.getUserSseAlert = {
      ...userSseAlert.getUserSseAlert,
      content: [...userSseAlert.getUserSseAlert.content].concat(
        action.payload.content
      ),
      lastPage: action.payload.last,
    };
  });
};

const sseAlertListSlice = createSlice({
  name: 'getSseAlert',
  initialState,
  reducers: {
    deleteAdminAlertData: (state, action) => {
      state.adminSseAlert.getAdminSseAlert = {
        ...state.adminSseAlert.getAdminSseAlert,
        content: [...state.adminSseAlert.getAdminSseAlert.content].filter(
          item => item.notification_id !== action.payload
        ),
      };
    },
    deleteUserAlertData: (state, action) => {
      state.userSseAlert.getUserSseAlert = {
        ...state.userSseAlert.getUserSseAlert,
        content: [...state.userSseAlert.getUserSseAlert.content].filter(
          item => item.notification_id !== action.payload
        ),
      };
    },
    deleteAllUerMsg: state => {
      state.userSseAlert.getUserSseAlert = {
        ...state.userSseAlert.getUserSseAlert,
        content: [],
      };
    },

    deleteAllAdminMsg: state => {
      state.adminSseAlert.getAdminSseAlert = {
        ...state.adminSseAlert.getAdminSseAlert,
        content: [],
      };
    },
    //sse
    setAdminSSE: (state, action) => {
      const { sseDatas } = state;
      sseDatas.sseAdminData = [action.payload, ...sseDatas.sseAdminData];
      sseDatas.sseAdminLength = sseDatas.sseAdminData.length;
    },
    setUserSSE: (state, action) => {
      const { sseDatas } = state;
      sseDatas.sseUserData = [action.payload, ...sseDatas.sseUserData];
      sseDatas.sseUserLength = sseDatas.sseUserData.length;
    },
    deleteAllAdminSseMsg: state => {
      const { sseDatas } = state;
      sseDatas.sseAdminData = [];
      sseDatas.sseAdminLength = '';
    },
    deleteAllUerSseMsg: state => {
      const { sseDatas } = state;
      sseDatas.sseUserData = [];
      sseDatas.sseUserLength = '';
    },
    deleteAllAdminSseLength: state => {
      const { sseDatas } = state;
      sseDatas.sseAdminLength = '';
    },
    deleteAllUerSseLength: state => {
      const { sseDatas } = state;
      sseDatas.sseUserLength = '';
    },
    setSSECount: (state, action) => {
      const { sseDatas } = state;
      const parseData = action.payload.reduce((acc, cur) => {
        acc[cur.role.toLowerCase()] = cur.count;
        return acc;
      }, {});

      sseDatas.sseUserLength = parseData.user;
      sseDatas.sseAdminLength = parseData.admin;
    },
    deleteAdminSseData: (state, action) => {
      const { sseDatas } = state;
      sseDatas.sseAdminData = [...sseDatas.sseAdminData].filter(
        item => item.notificationId !== action.payload
      );
      sseDatas.sseAdminLength = sseDatas.sseAdminLength - 1;
    },
    deleteUserSseData: (state, action) => {
      const { sseDatas } = state;
      sseDatas.sseUserData = [...sseDatas.sseUserData].filter(
        item => item.notificationId !== action.payload
      );
      sseDatas.sseUserLength = sseDatas.sseUserLength - 1;
    },
  },
  extraReducers: bulider => {
    adminSseAlertExtraReducer(bulider);
    userSseAlertExtraReducer(bulider);
  },
});

export const {
  deleteAdminAlertData,
  deleteUserAlertData,
  deleteAllUerMsg,
  deleteAllAdminMsg,
  setAdminSSE,
  setUserSSE,
  setSSECount,
  deleteAdminSseData,
  deleteUserSseData,
  deleteAllAdminSseMsg,
  deleteAllUerSseMsg,
  deleteAllAdminSseLength,
  deleteAllUerSseLength,
} = sseAlertListSlice.actions;
export default sseAlertListSlice.reducer;
