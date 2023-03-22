import Axios from '../../api/axios';
import Redux from '../redux';

const initialState = {
  equipmentStatus: {
    getEquipment: null,
    isEquipmentLoading: false,
    isEquipmentError: false,
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
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const getEquipmentList = Redux.asyncThunk(
  'EQUIPMENT',
  payload =>
    axios.get(
      `/api/supply?keyword=${payload.keyword}&categoryId=${payload.categoryId}&status=${payload.status}&page=${payload.page}&size=${payload.size}`
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
      getCategoryList,
      'category',
      'isCategoryLoading',
      'getCategory',
      'isCategoryError'
    );
  }
);

export const { setCategoryData } = equipmentStatusSlice.actions;
export default equipmentStatusSlice.reducer;
