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
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const getEquipmentList = Redux.asyncThunk('EQUIPMENT', payload =>
  axios.get(`/api/supply?categoryId=${payload.categoryId}`)
);

export const getCategoryList = Redux.asyncThunk('CATEGORY', () =>
  axios.get(`/api/category`)
);

const equipmentStatusSlice = Redux.slice(
  'getEquipment',
  initialState,
  {},
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

export default equipmentStatusSlice.reducer;
