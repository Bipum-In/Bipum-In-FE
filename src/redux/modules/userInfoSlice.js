import { api } from 'api/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import QUERY from 'constants/query';

const initialState = {
  userInfoList: {
    getUserInfo: null,
  },
};

export const userInfoSlice = createAsyncThunk(
  'USER_INFO',
  async (_, thunkAPI) => {
    return await api
      .get(QUERY.END_POINT.USER.MY_PAGE)
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
