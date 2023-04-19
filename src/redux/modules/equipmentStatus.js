import { api } from 'api/axios';
import NUMBER from 'constants/number';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  equipmentStatus: {
    getEquipment: null,
    isEquipmentError: false,
  },
  equipmentDetail: {
    getDetail: null,
    isDetailError: false,
  },
  category: {
    getCategory: null,
    isCategoryError: false,
  },
  categoryData: {
    categoryIdData: '',
    categoryNameData: '전체',
  },
  supplyHistory: {
    history: {
      user: { content: [], lastPage: false },
      repair: { content: [], lastPage: false },
    },
    isUserError: false,
  },
};

export const getEquipmentList = createAsyncThunk(
  'EQUIPMENT',
  async (payload, thunkAPI) => {
    return await api
      .get(
        `/api${payload.path}/supply?keyword=${payload.keyword}&categoryId=${payload.categoryId}&status=${payload.status}&page=${payload.page}&size=${payload.size}`
      )
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

export const getEquipmentDetail = createAsyncThunk(
  'EQUIPMENT_DETAIL',
  async (payload, thunkAPI) => {
    return await api
      .get(
        `/api${payload.path}/supply/${payload.supplyId}?size=${NUMBER.INT.SIX}`
      )
      .then(response => thunkAPI.fulfillWithValue(response.data.data))
      .catch(() => thunkAPI.rejectWithValue());
  }
);

export const getHistory = createAsyncThunk(
  'HISTORY',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(
        `/api/supply/history/${payload.history}/${payload.supplyId}?page=${payload.page}&size=${payload.size}`
      );
      if (payload.history === 'user') {
        return thunkAPI.fulfillWithValue({ user: response.data.data });
      }
      return thunkAPI.fulfillWithValue({ repair: response.data.data });
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getCategoryList = createAsyncThunk(
  'CATEGORY',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/api/category`);
      const parseLargeCategory = largeCategory(response);
      const data = {
        largeCategory: parseLargeCategory,
        category: response.data.data,
      };

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const largeCategory = response => {
  return [{ largeCategory: '전체' }, ...response.data.data]
    .reduce((acc, cur) => {
      const index = acc.findIndex(el => el.largeCategory === cur.largeCategory);
      if (index === -1) {
        acc.push(cur);
      } else {
        acc[index] = cur;
      }
      return acc;
    }, [])
    .map((v, i) => (i === 0 ? { ...v, status: true } : { ...v, status: false }))
    .map(obj => {
      return {
        name: obj.largeCategory,
        status: obj.status,
      };
    });
};

const getEquipmentListExtraReducer = bulider => {
  bulider.addCase(getEquipmentList.fulfilled, (state, action) => {
    const { equipmentStatus } = state;
    equipmentStatus.isEquipmentError = false;
    equipmentStatus.getEquipment = action.payload;
  });
  bulider.addCase(getEquipmentList.rejected, state => {
    const { equipmentStatus } = state;
    equipmentStatus.isEquipmentError = true;
  });
};

const getEquipmentDetailExtraReducer = bulider => {
  bulider.addCase(getEquipmentDetail.fulfilled, (state, action) => {
    const { equipmentDetail } = state;
    equipmentDetail.isDetailError = false;
    equipmentDetail.getDetail = action.payload;
  });
  bulider.addCase(getEquipmentDetail.rejected, state => {
    const { equipmentDetail } = state;
    equipmentDetail.isDetailError = true;
  });
};

const getCategoryListExtraReducer = bulider => {
  bulider.addCase(getCategoryList.fulfilled, (state, action) => {
    const { category } = state;
    category.isCategoryError = false;
    category.getCategory = action.payload;
  });
  bulider.addCase(getCategoryList.rejected, state => {
    const { category } = state;
    category.isCategoryError = true;
  });
};

const getHistoryExtraReducer = bulider => {
  bulider.addCase(getHistory.fulfilled, (state, action) => {
    const { supplyHistory } = state;
    const data = action.payload;
    const historyKey = Object.keys(data)[0];
    const parseResponse = {
      ...supplyHistory.history,
      [historyKey]: {
        content: [...supplyHistory.history[historyKey].content].concat(
          data[historyKey].content
        ),
        lastPage: data[historyKey].last,
      },
    };
    supplyHistory.isUserError = false;
    supplyHistory.history = parseResponse;
  });
  bulider.addCase(getHistory.rejected, state => {
    const { supplyHistory } = state;
    supplyHistory.isUserError = true;
  });
};

const equipmentStatusSlice = createSlice({
  name: 'Equipment',
  initialState,
  reducers: {
    initHistory: (state, _) => {
      state.supplyHistory.history.user = { content: [], lastPage: false };
      state.supplyHistory.history.repair = { content: [], lastPage: false };
    },
    initEquipmentDetail: (state, _) => {
      state.equipmentDetail.getDetail = null;
      state.equipmentDetail.isDetailLoading = false;
      state.equipmentDetail.isDetailError = false;
    },
    setCategoryData: (state, action) => {
      state.categoryData.categoryIdData = action.payload.categoryId;
      state.categoryData.categoryNameData = action.payload.categoryName;
    },
    setSmallCategoryData: (state, action) => {
      const { largeCategory, categoryName } = action.payload;
      state.category = {
        ...state.category,
        getCategory: {
          ...state.category.getCategory,
          category: [
            ...state.category.getCategory.category,
            {
              largeCategory,
              categoryName,
            },
          ],
        },
      };
    },
    editCategoryData: (state, action) => {
      const { largeCategory, categoryName, prevCategory } = action.payload;
      state.category = {
        ...state.category,
        getCategory: {
          ...state.category.getCategory,
          category: [...state.category.getCategory.category].map(category =>
            category.categoryName === prevCategory
              ? { largeCategory: largeCategory, categoryName: categoryName }
              : category
          ),
        },
      };
    },
  },
  extraReducers: bulider => {
    getEquipmentListExtraReducer(bulider);
    getEquipmentDetailExtraReducer(bulider);
    getCategoryListExtraReducer(bulider);
    getHistoryExtraReducer(bulider);
  },
});

export const {
  initHistory,
  initEquipmentDetail,
  setCategoryData,
  setSmallCategoryData,
  editCategoryData,
} = equipmentStatusSlice.actions;
export default equipmentStatusSlice.reducer;
