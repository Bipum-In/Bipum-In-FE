import Axios from 'api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  getPartners: null,
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const getPartnersList = createAsyncThunk(
  'PARTNERS',
  async (payload, thunkAPI) => {
    return await axios
      .get(`/api/partners/admin?page=${payload.page}&size=${payload.size}`)
      .then(response => thunkAPI.fulfillWithValue(response.data.data));
  }
);

const partnersListSlice = createSlice({
  name: 'getPartners',
  initialState,
  reducers: {},
  extraReducers: bulider => {
    bulider.addCase(getPartnersList.fulfilled, (state, action) => {
      state.getPartners = action.payload;
    });
  },
});

export default partnersListSlice.reducer;
