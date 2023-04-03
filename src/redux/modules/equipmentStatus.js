import Axios from 'api/axios';
import NUMBER from 'constants/number';
import Redux from '../redux';

const initialState = {
  equipmentStatus: {
    getEquipment: null,
    isEquipmentLoading: false,
    isEquipmentError: false,
  },
  equipmentDetail: {
    getDetail: null,
    isDetailLoading: false,
    isDetailError: false,
  },
  category: {
    getCategory: null,
    isCategoryLoading: false,
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
    isUserLoading: false,
    isUserError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const getEquipmentList = Redux.asyncThunk(
  'EQUIPMENT',
  payload =>
    axios.get(
      `/api${payload.path}/supply?keyword=${payload.keyword}&categoryId=${payload.categoryId}&status=${payload.status}&page=${payload.page}&size=${payload.size}`
    ),
  response => response.data.data
);

export const getEquipmentDetail = Redux.asyncThunk(
  'EQUIPMENT_DETAIL',
  payload =>
    axios.get(
      `/api${payload.path}/supply/${payload.supplyId}?size=${NUMBER.INT.SIX}`
    ),
  response => response.data.data
);

export const getCategoryList = Redux.asyncThunk(
  'CATEGORY',
  () => axios.get(`/api/category`),
  response => {
    const parseLargeCategory = largeCategory(response);
    return { largeCategory: parseLargeCategory, category: response.data.data };
  }
);

export const getHistory = Redux.asyncThunk(
  'HISTORY',
  payload =>
    axios.get(
      `/api/supply/history/${payload.history}/${payload.supplyId}?page=${payload.page}&size=${payload.size}`
    ),
  (response, payload) =>
    payload.history === 'user'
      ? { user: response.data.data }
      : { repair: response.data.data }
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

const equipmentStatusSlice = Redux.slice(
  'Equipment',
  initialState,
  {
    initHistory: (state, _) => {
      state.supplyHistory.user = { content: [], lastPage: false };
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
  },
  bulider => {
    Redux.extraReducer(
      bulider,
      getEquipmentList,
      'equipmentStatus',
      'isEquipmentLoading',
      'getEquipment',
      'isEquipmentError'
    );
    Redux.extraReducer(
      bulider,
      getEquipmentDetail,
      'equipmentDetail',
      'isDetailLoading',
      'getDetail',
      'isDetailError'
    );
    Redux.extraReducer(
      bulider,
      getCategoryList,
      'category',
      'isCategoryLoading',
      'getCategory',
      'isCategoryError'
    );
    Redux.extraReducer(
      bulider,
      getHistory,
      'supplyHistory',
      'isUserLoading',
      'history',
      'isUserError',
      (state, payload) => {
        const historyKey = Object.keys(payload)[0];
        return {
          ...state,
          [historyKey]: {
            content: [...state[historyKey].content].concat(
              payload[historyKey].content
            ),
            lastPage: payload[historyKey].last,
          },
        };
      }
    );
  }
);

export const { initHistory, initEquipmentDetail, setCategoryData } =
  equipmentStatusSlice.actions;
export default equipmentStatusSlice.reducer;
