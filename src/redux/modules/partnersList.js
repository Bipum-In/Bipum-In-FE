import { api } from 'api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import QUERY from 'constants/query';

const initialState = {
  getPartners: null,
};

export const getPartnersList = createAsyncThunk(
  'PARTNERS',
  async (payload, thunkAPI) => {
    return await api
      .get(QUERY.END_POINT.PARTNERS.PAGE(payload.page, payload.size))
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
