import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  deptList: {
    getDept: null,
    isDeptLoading: false,
    isDeptError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __deptList = Redux.asyncThunk('DEPT', () =>
  axios.get(`/api/dept`)
);

const deptListSlice = Redux.slice('getDept', initialState, {}, bulider => {
  Redux.extraReducer(
    bulider,
    __deptList,
    'deptList',
    'isDeptLoading',
    'getDept',
    'isDeptError'
  );
});

export default deptListSlice.reducer;
