import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  userInfoList: {
    getUserInfo: null,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const userInfoSlice = Redux.asyncThunk(
  'USER_INFO',
  () => axios.get('/api/user/myPage'),
  response => {
    return response.data.data;
  }
);

const userInfoReducer = Redux.slice(
  'getUserInfo',
  initialState,
  {
    setUserInfo: (state, action) => {
      state.userInfoList.getUserInfo = action.payload;
    },
  },
  bulider => {
    Redux.extraReducer(
      bulider,
      userInfoSlice,
      'userInfoList',
      '',
      'getUserInfo',
      ''
    );
  }
);

export const { setUserInfo } = userInfoReducer.actions;
export default userInfoReducer.reducer;
