import Axios from 'api/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userInfoList: {
    getUserInfo: null,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const userInfoSlice = createAsyncThunk(
  'USER_INFO',
  async (_, thunkAPI) => {
    return await axios
      .get('/api/user/myPage')
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

const userInfoReducer = createSlice({
  name: 'getUserInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfoList.getUserInfo = action.payload;
    },
  },
  extraReducers: bulider => {
    bulider.addCase(userInfoSlice.fulfilled, (state, action) => {
      const { userInfoList } = state;
      userInfoList.getUserInfo = action.payload;
    });
  },
});

export const { setUserInfo } = userInfoReducer.actions;
export default userInfoReducer.reducer;
