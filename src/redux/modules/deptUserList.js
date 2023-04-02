import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  deptUserList: {
    getDeptUser: null,
    isDeptUserLoading: false,
    isDeptUserError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __deptUserList = Redux.asyncThunk('DEPTUSER', payload =>
  axios.get(`/api/user/${payload.deptId}`)
);

const deptUserListSlice = Redux.slice(
  'getDeptUser',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      __deptUserList,
      'deptUserList',
      'isDeptUserLoading',
      'getDeptUser',
      'isDeptUserError'
    );
  }
);

export default deptUserListSlice.reducer;
