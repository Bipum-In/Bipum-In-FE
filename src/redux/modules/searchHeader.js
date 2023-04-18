import Axios from 'api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: {
    search: null,
    isSearchError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const getSearch = createAsyncThunk(
  'SEARCH_HEADER',
  async (payload, thunkAPI) => {
    return await axios
      .get(`/api${payload.isAdmin}/main/search?keyword=${payload.keyword}`)
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

const searchHeader = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    initSearchHeader: state => {
      const { searchData } = state;
      searchData.search = null;
      searchData.isSearchError = false;
    },
  },
  extraReducers: bulider => {
    bulider.addCase(getSearch.fulfilled, (state, action) => {
      const { searchData } = state;
      const { payload } = action;
      const searchKey = Object.keys(payload)[0];
      searchData.isDetailError = false;
      searchData.search = { [searchKey]: payload };
    });
    bulider.addCase(getSearch.rejected, state => {
      const { searchData } = state;
      searchData.isDetailError = true;
    });
  },
});

export const { initSearchHeader } = searchHeader.actions;
export default searchHeader.reducer;
