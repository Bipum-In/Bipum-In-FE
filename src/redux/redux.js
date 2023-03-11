const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const Redux = {
  asyncThunk(name, axiosFn, fulfillFn, rejectFn) {
    return createAsyncThunk(name, async (payload, thunkAPI) => {
      return await axiosFn(payload)
        .then(response => {
          let fulfillData = null;

          fulfillFn && (fulfillData = fulfillFn(response));

          return thunkAPI.fulfillWithValue(
            fulfillData ? fulfillData : response.data
          );
        })
        .catch(error => {
          rejectFn && rejectFn(error);
          return thunkAPI.rejectWithValue();
        });
    });
  },

  slice(name, initialState, reducers, extraReducersFn) {
    return createSlice({
      name,
      initialState,
      reducers,
      extraReducers: bulider => {
        extraReducersFn(bulider);
      },
    });
  },

  extraReducer(bulider, thunk, fulfilledFn) {
    bulider.addCase(thunk.pending, (state, _) => {
      state.isLoading = true;
      state.isError = false;
    });
    bulider.addCase(thunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      fulfilledFn(state, action);
    });
    bulider.addCase(thunk.rejected, (state, _) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
};

export default Redux;
