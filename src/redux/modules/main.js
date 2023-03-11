import Axios from '../../api/axios';
import Redux from '../redux';

const initialState = {
  getMain: [],
  isLoading: false,
  isError: false,
  error: null,
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __main = Redux.asyncThunk('MAIN', payload => axios.get('/board'));

const getMainSlice = Redux.slice('getMain', initialState, {}, bulider => {
  Redux.extraReducer(bulider, __main, (state, action) => {
    state.getMain = action.payload;
  });
});

export default getMainSlice.reducer;
