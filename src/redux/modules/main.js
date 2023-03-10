import Axios from '../../api/axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  getMain: [],
  isLoading: false,
  isError: false,
  error: null,
};

const axios = new Axios(process.env.REACT_APP_URL);

export const __main = createAsyncThunk('MAIN', async (payload, thunkAPI) => {
  return await axios
    .get(``)
    .then(response => thunkAPI.fulfillWithValue(response.data))
    .catch(() => thunkAPI.rejectWithValue());
});

const getMainSlice = createSlice({
  name: 'getMain',
  initialState,
  reducers: {},
  extraReducers: bulider => {
    bulider.addCase(__main.pending, (state, _) => {
      state.isLoading = true;
      state.isError = false;
    });
    bulider.addCase(__main.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.getMain = action.payload;
    });
    bulider.addCase(__main.rejected, (state, _) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default getMainSlice.reducer;
