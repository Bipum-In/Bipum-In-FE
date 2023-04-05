import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  adminSseAlert: {
    getAdminSseAlert: { content: [], lastPage: false },
    isAdminSseAlertLoading: false,
    isAdminSseAlertError: false,
  },
  userSseAlert: {
    getUserSseAlert: { content: [], lastPage: false },
    isUserSseAlertLoading: false,
    isUserSseAlertError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __adminSseAlert = Redux.asyncThunk(
  'ADMIN_SSE_ALERT',
  payload =>
    axios.get(
      `/api/admin/main/alarm?page=${payload.page}&size=${payload.size}`
    ),
  response => {
    return response.data.data;
  }
);

export const __userSseAlert = Redux.asyncThunk(
  'USER_SSE_ALERT',
  payload =>
    axios.get(`/api/main/alarm?page=${payload.page}&size=${payload.size}`),
  response => {
    return response.data.data;
  }
);

const sseAlertListSlice = Redux.slice(
  'getSseAlert',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      __adminSseAlert,
      'adminSseAlert',
      'isSseAlertLoading',
      'getAdminSseAlert',
      'isSseAlertError',
      (state, payload) => {
        return {
          content: [...state.content].concat(payload.content),
          lastPage: payload.last,
        };
      }
    );
    Redux.extraReducer(
      bulider,
      __userSseAlert,
      'userSseAlert',
      'isUserSseAlertLoading',
      'getUserSseAlert',
      'isUserSseAlertError',
      (state, payload) => {
        return {
          content: [...state.content].concat(payload.content),
          lastPage: payload.last,
        };
      }
    );
  }
);

export default sseAlertListSlice.reducer;
