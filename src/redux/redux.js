const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const Redux = {
  asyncThunk(name, axiosFn, fulfillFn, rejectFn) {
    return createAsyncThunk(name, async (payload, thunkAPI) => {
      return await axiosFn(payload)
        .then(response => {
          let fulfillData = null;

          fulfillFn && (fulfillData = fulfillFn(response, payload));

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

  extraReducer(
    bulider,
    thunk,
    stateKey,
    loadingKey,
    dataKey,
    errorkey,
    actionFn
  ) {
    bulider.addCase(thunk.pending, (state, _) => {
      state[stateKey][loadingKey] = true;
      state[stateKey][errorkey] = false;
    });
    bulider.addCase(thunk.fulfilled, (state, action) => {
      state[stateKey][loadingKey] = false;
      state[stateKey][errorkey] = false;
      state[stateKey][dataKey] = actionFn
        ? actionFn(state[stateKey][dataKey], action.payload)
        : action.payload;
    });
    bulider.addCase(thunk.rejected, (state, _) => {
      state[stateKey][loadingKey] = false;
      state[stateKey][errorkey] = true;
    });
  },
};

export default Redux;
